import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index.tsx";
import Alerts from "./pages/Alerts.tsx";
import CallDetection from "./pages/CallDetection.tsx";
import LinkScanner from "./pages/LinkScanner.tsx";
import FakeNews from "./pages/FakeNews.tsx";
import History from "./pages/History.tsx";
import Reports from "./pages/Reports.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/call-detection" element={<CallDetection />} />
          <Route path="/link-scanner" element={<LinkScanner />} />
          <Route path="/fake-news" element={<FakeNews />} />
          <Route path="/history" element={<History />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
