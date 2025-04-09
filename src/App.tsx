
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import SpecialistChat from "./pages/SpecialistChat";
import DiseaseLibrary from "./pages/DiseaseLibrary";
import { AuthProvider } from "./components/AuthProvider";
import { RequireAuth } from "./components/RequireAuth";

// Create a React component to wrap the application
const App = () => {
  // Create a new QueryClient instance within the component
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/scan" element={
                <RequireAuth>
                  <Index />
                </RequireAuth>
              } />
              <Route path="/history" element={
                <RequireAuth>
                  <Index />
                </RequireAuth>
              } />
              <Route path="/about" element={<Index />} />
              <Route path="/specialist-chat" element={
                <RequireAuth>
                  <SpecialistChat />
                </RequireAuth>
              } />
              <Route path="/disease-library" element={<DiseaseLibrary />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
