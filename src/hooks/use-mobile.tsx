
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Set initial value
    const checkIfMobile = () => {
      return window.innerWidth < MOBILE_BREAKPOINT;
    };
    
    setIsMobile(checkIfMobile());
    
    // Add event listener for resize
    const handleResize = () => {
      setIsMobile(checkIfMobile());
    };
    
    // Debounce resize handler for better performance
    let timeoutId: number | undefined;
    const debouncedHandleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(handleResize, 100);
    };
    
    window.addEventListener("resize", debouncedHandleResize);
    
    // Clean up
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  // Return false as fallback when undefined (during SSR)
  return !!isMobile;
}
