
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { mockDataService, testSupabaseConnection, MockUser } from "@/services/mockDataService";

type AuthContextType = {
  session: Session | null;
  user: User | MockUser | null;
  signOut: () => Promise<void>;
  loading: boolean;
  isUsingMockData: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | MockUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Test if Supabase is available
        const supabaseAvailable = await testSupabaseConnection();
        
        if (supabaseAvailable) {
          // Set up auth state listener for real Supabase
          const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, newSession) => {
              setSession(newSession);
              setUser(newSession?.user ?? null);
              setLoading(false);
            }
          );

          // Check for existing session
          supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            setLoading(false);
          }).catch((error) => {
            console.error('Error getting session:', error);
            // Fallback to mock data
            mockDataService.enableMockData();
            setIsUsingMockData(true);
            setLoading(false);
          });

          return () => {
            subscription.unsubscribe();
          };
        } else {
          // Use mock data service
          mockDataService.enableMockData();
          setIsUsingMockData(true);
          
          // Set up callback to listen for mock user changes
          mockDataService.setUserChangeCallback((mockUser) => {
            setUser(mockUser);
          });
          
          // Check if there's a mock user stored
          const mockUser = mockDataService.getCurrentUser();
          if (mockUser) {
            setUser(mockUser);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        // Fallback to mock data
        mockDataService.enableMockData();
        setIsUsingMockData(true);
        
        // Set up callback to listen for mock user changes
        mockDataService.setUserChangeCallback((mockUser) => {
          setUser(mockUser);
        });
        
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signOut = async () => {
    if (isUsingMockData) {
      await mockDataService.signOut();
    } else {
      await supabase.auth.signOut();
    }
  };

  const value = {
    session,
    user,
    signOut,
    loading,
    isUsingMockData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
