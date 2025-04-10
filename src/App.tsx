
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import SpecialistChat from "./pages/SpecialistChat";
import DiseaseLibrary from "./pages/DiseaseLibrary";
import CommunityForum from "./pages/CommunityForum";
import VideoLibrary from "./pages/VideoLibrary";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./components/AuthProvider";
import { RequireAuth } from "./components/RequireAuth";

// Page transition wrapper
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className="page-transition">
      {children}
    </div>
  );
};

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
                <PageTransition>
                  <RequireAuth>
                    <Index />
                  </RequireAuth>
                </PageTransition>
              } />
              <Route path="/history" element={
                <PageTransition>
                  <RequireAuth>
                    <Index />
                  </RequireAuth>
                </PageTransition>
              } />
              <Route path="/about" element={
                <PageTransition>
                  <Index />
                </PageTransition>
              } />
              <Route path="/specialist-chat" element={
                <PageTransition>
                  <RequireAuth>
                    <SpecialistChat />
                  </RequireAuth>
                </PageTransition>
              } />
              <Route path="/disease-library" element={
                <PageTransition>
                  <DiseaseLibrary />
                </PageTransition>
              } />
              <Route path="/community-forum" element={
                <PageTransition>
                  <CommunityForum />
                </PageTransition>
              } />
              <Route path="/video-library" element={
                <PageTransition>
                  <VideoLibrary />
                </PageTransition>
              } />
              <Route path="/profile" element={
                <PageTransition>
                  <RequireAuth>
                    <ProfilePage />
                  </RequireAuth>
                </PageTransition>
              } />
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
