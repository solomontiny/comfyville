import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatBot from "@/components/ChatBot";
import ScrollToTop from "@/components/ScrollToTop";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
import About from "./pages/About";
import MissionVision from "./pages/MissionVision";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import PropertySalesRentals from "./pages/services/PropertySalesRentals";
import ShortTermApartments from "./pages/services/ShortTermApartments";
import PropertyManagement from "./pages/services/PropertyManagement";
import LandInvestment from "./pages/services/LandInvestment";
import LuxuryInterior from "./pages/services/LuxuryInterior";
import InvestorGuidance from "./pages/services/InvestorGuidance";
import JoinTeam from "./pages/JoinTeam";
import OurTeam from "./pages/OurTeam";
import AdminDashboard from "./pages/AdminDashboard";
import Store from "./pages/Store";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/listings" element={<PageTransition><Listings /></PageTransition>} />
        <Route path="/listings/:id" element={<PageTransition><ListingDetail /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/mission-vision" element={<PageTransition><MissionVision /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/services/property-sales-rentals" element={<PageTransition><PropertySalesRentals /></PageTransition>} />
        <Route path="/services/short-term-apartments" element={<PageTransition><ShortTermApartments /></PageTransition>} />
        <Route path="/services/property-management" element={<PageTransition><PropertyManagement /></PageTransition>} />
        <Route path="/services/land-investment" element={<PageTransition><LandInvestment /></PageTransition>} />
        <Route path="/services/luxury-interior" element={<PageTransition><LuxuryInterior /></PageTransition>} />
        <Route path="/services/investor-guidance" element={<PageTransition><InvestorGuidance /></PageTransition>} />
        <Route path="/join-team" element={<PageTransition><JoinTeam /></PageTransition>} />
        <Route path="/our-team" element={<PageTransition><OurTeam /></PageTransition>} />
        <Route path="/store" element={<PageTransition><Store /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HashRouter>
      <ScrollToTop />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <WhatsAppButton />
      <ChatBot />
    </HashRouter>
  </QueryClientProvider>
);

export default App;