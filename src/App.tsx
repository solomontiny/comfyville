import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatBot from "@/components/ChatBot";
import Index from "./pages/Index";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
import About from "./pages/About";
import MissionVision from "./pages/MissionVision";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PropertySalesRentals from "./pages/services/PropertySalesRentals";
import ShortTermApartments from "./pages/services/ShortTermApartments";
import PropertyManagement from "./pages/services/PropertyManagement";
import LandInvestment from "./pages/services/LandInvestment";
import LuxuryInterior from "./pages/services/LuxuryInterior";
import InvestorGuidance from "./pages/services/InvestorGuidance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listings/:id" element={<ListingDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/mission-vision" element={<MissionVision />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services/property-sales-rentals" element={<PropertySalesRentals />} />
            <Route path="/services/short-term-apartments" element={<ShortTermApartments />} />
            <Route path="/services/property-management" element={<PropertyManagement />} />
            <Route path="/services/land-investment" element={<LandInvestment />} />
            <Route path="/services/luxury-interior" element={<LuxuryInterior />} />
            <Route path="/services/investor-guidance" element={<InvestorGuidance />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <WhatsAppButton />
          <ChatBot />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
