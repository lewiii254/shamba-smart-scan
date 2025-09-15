// Mock data service for when Supabase is unavailable
export interface MockUser {
  id: string;
  email: string;
  username?: string;
  full_name?: string;
  created_at: string;
}

export interface MockScanHistory {
  id: string;
  user_id: string;
  image_url: string;
  diagnosis: string;
  treatment: string;
  confidence: number;
  created_at: string;
}

let isUsingMockData = false;
const mockUsers: MockUser[] = [];
let mockScanHistory: MockScanHistory[] = [];
let currentMockUser: MockUser | null = null;

// User change callback for AuthProvider
let onUserChangeCallback: ((user: MockUser | null) => void) | null = null;

// Initialize with some sample data
const initializeMockData = () => {
  if (mockScanHistory.length === 0) {
    mockScanHistory = [
      {
        id: '1',
        user_id: 'mock-user-1',
        image_url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%234ade80"/><text x="100" y="100" text-anchor="middle" dominant-baseline="central" fill="white" font-size="16">Plant Image</text></svg>',
        diagnosis: 'Tomato Late Blight',
        treatment: 'Apply copper-based fungicide and remove affected leaves',
        confidence: 0.89,
        created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
      {
        id: '2',
        user_id: 'mock-user-1',
        image_url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f59e0b"/><text x="100" y="100" text-anchor="middle" dominant-baseline="central" fill="white" font-size="16">Plant Image</text></svg>',
        diagnosis: 'Powdery Mildew',
        treatment: 'Use neem oil and improve air circulation around plants',
        confidence: 0.76,
        created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      },
      {
        id: '3',
        user_id: 'mock-user-1',
        image_url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23ef4444"/><text x="100" y="100" text-anchor="middle" dominant-baseline="central" fill="white" font-size="16">Plant Image</text></svg>',
        diagnosis: 'Aphid Infestation',
        treatment: 'Spray with insecticidal soap and introduce beneficial insects',
        confidence: 0.95,
        created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      }
    ];
  }
};

const notifyUserChange = (user: MockUser | null) => {
  if (onUserChangeCallback) {
    onUserChangeCallback(user);
  }
};

export const mockDataService = {
  // Check if we should use mock data
  isAvailable: () => !isUsingMockData,
  
  // Enable mock data mode
  enableMockData: () => {
    isUsingMockData = true;
    initializeMockData();
    console.log('🟡 Mock data mode enabled - Supabase unavailable');
  },

  // Set user change callback
  setUserChangeCallback: (callback: (user: MockUser | null) => void) => {
    onUserChangeCallback = callback;
  },

  // Auth functions
  signUp: async (email: string, password: string, username?: string, fullName?: string) => {
    const mockUser: MockUser = {
      id: `mock-user-${Date.now()}`,
      email,
      username,
      full_name: fullName,
      created_at: new Date().toISOString(),
    };
    
    mockUsers.push(mockUser);
    currentMockUser = mockUser;
    notifyUserChange(mockUser);
    
    return { user: mockUser, error: null };
  },

  signIn: async (email: string, password: string) => {
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      currentMockUser = existingUser;
      localStorage.setItem('mockUser', JSON.stringify(existingUser));
      notifyUserChange(existingUser);
      return { user: existingUser, error: null };
    }
    
    // Create a default user for demo
    const mockUser: MockUser = {
      id: 'mock-user-1',
      email,
      username: 'demouser',
      full_name: 'Demo User',
      created_at: new Date().toISOString(),
    };
    
    mockUsers.push(mockUser);
    currentMockUser = mockUser;
    initializeMockData();
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    notifyUserChange(mockUser);
    
    return { user: mockUser, error: null };
  },

  signOut: async () => {
    currentMockUser = null;
    localStorage.removeItem('mockUser');
    notifyUserChange(null);
    return { error: null };
  },

  getCurrentUser: () => {
    // Check localStorage first
    if (!currentMockUser) {
      const stored = localStorage.getItem('mockUser');
      if (stored) {
        try {
          currentMockUser = JSON.parse(stored);
        } catch (error) {
          console.error('Error parsing stored mock user:', error);
        }
      }
    }
    return currentMockUser;
  },

  // Scan history functions
  getScanHistory: async (userId?: string) => {
    initializeMockData();
    const userScans = mockScanHistory.filter(scan => 
      !userId || scan.user_id === userId || scan.user_id === 'mock-user-1'
    );
    return { data: userScans, error: null };
  },

  addScanHistory: async (userId: string, scanData: Omit<MockScanHistory, 'id' | 'user_id' | 'created_at'>) => {
    const newScan: MockScanHistory = {
      id: `mock-scan-${Date.now()}`,
      user_id: userId,
      created_at: new Date().toISOString(),
      ...scanData,
    };
    
    mockScanHistory.unshift(newScan);
    return { data: newScan, error: null };
  },

  clearScanHistory: async (userId: string) => {
    mockScanHistory = mockScanHistory.filter(scan => scan.user_id !== userId);
    return { error: null };
  }
};

// Function to test if Supabase is available
export const testSupabaseConnection = async (): Promise<boolean> => {
  try {
    // Try a simple query to test connection
    const response = await fetch('https://bswtctukvtnigbqmccpg.supabase.co/rest/v1/', {
      method: 'HEAD',
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzd3RjdHVrdnRuaWdicW1jY3BnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNTAwMjYsImV4cCI6MjA1OTYyNjAyNn0.jbE1gxEKNHmOKN1JI9xUlHMcwaGjgGcSRfsAE7TKDd0',
      },
    });
    return response.ok;
  } catch (error) {
    console.log('Supabase connection test failed:', error);
    return false;
  }
};