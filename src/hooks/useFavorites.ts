import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const useFavorites = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const addFavorite = useMutation({
    mutationFn: async (listingId: string) => {
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase
        .from("favorites")
        .insert({ user_id: user.id, listing_id: listingId });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success("Added to favorites!");
    },
    onError: () => toast.error("Failed to add favorite."),
  });

  const removeFavorite = useMutation({
    mutationFn: async (listingId: string) => {
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("listing_id", listingId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success("Removed from favorites.");
    },
    onError: () => toast.error("Failed to remove favorite."),
  });

  const isFavorite = (listingId: string) =>
    favorites.some((f: any) => f.listing_id === listingId);

  const toggleFavorite = (listingId: string) => {
    if (!user) {
      toast.error("Please sign in to save favorites.");
      return;
    }
    if (isFavorite(listingId)) {
      removeFavorite.mutate(listingId);
    } else {
      addFavorite.mutate(listingId);
    }
  };

  return { favorites, isLoading, isFavorite, toggleFavorite };
};
