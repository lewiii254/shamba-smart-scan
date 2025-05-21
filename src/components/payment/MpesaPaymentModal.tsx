
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, AlertCircle, PhoneCall } from "lucide-react";
import { initiateMpesaPayment, checkMpesaPaymentStatus } from "@/services/mpesaService";
import { useAuth } from "@/components/AuthProvider";

interface MpesaPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    id: string;
    name: string;
    price: number;
    period: string;
  };
}

export const MpesaPaymentModal: React.FC<MpesaPaymentModalProps> = ({ isOpen, onClose, plan }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "pending" | "success" | "failed">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(null);
  const [paymentTimer, setPaymentTimer] = useState<number>(120); // 2 minutes countdown

  // Initialize phone number from user metadata if available
  useEffect(() => {
    if (user?.phone) {
      setPhoneNumber(formatPhoneNumber(user.phone));
    } else if (user?.user_metadata?.phone) {
      setPhoneNumber(formatPhoneNumber(user.user_metadata.phone));
    }
  }, [user]);

  // Format phone number to Kenyan format
  const formatPhoneNumber = (phone: string): string => {
    // Remove any non-digit characters
    let digits = phone.replace(/\D/g, '');
    
    // Format as Kenyan number
    if (digits.startsWith('0') && digits.length >= 10) {
      return '254' + digits.substring(1);
    } else if (digits.startsWith('254')) {
      return digits;
    } else if ((digits.startsWith('7') || digits.startsWith('1')) && digits.length >= 9) {
      return '254' + digits;
    }
    
    return digits;
  };

  // Handle phone number input change
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^\d]/g, "");
    setPhoneNumber(formatPhoneNumber(value));
  };

  // Format phone number for display
  const formatDisplayPhoneNumber = (phone: string) => {
    if (phone.startsWith("254") && phone.length >= 12) {
      return `+${phone.substring(0, 3)} ${phone.substring(3, 6)} ${phone.substring(6, 9)} ${phone.substring(9)}`;
    }
    return phone;
  };

  // Check payment status periodically
  useEffect(() => {
    let intervalId: number | null = null;
    let timerIntervalId: number | null = null;
    
    if (paymentStatus === "pending" && checkoutRequestId) {
      // Update payment timer every second
      timerIntervalId = window.setInterval(() => {
        setPaymentTimer((prev) => {
          if (prev <= 1) {
            window.clearInterval(timerIntervalId!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Check payment status every 5 seconds
      intervalId = window.setInterval(async () => {
        try {
          const response = await checkMpesaPaymentStatus(checkoutRequestId);
          
          if (response.success) {
            setPaymentStatus("success");
            window.clearInterval(intervalId!);
            window.clearInterval(timerIntervalId!);
            
            toast({
              title: "Payment Successful!",
              description: "Your subscription has been activated.",
              variant: "default",
            });
            
            // Wait 3 seconds before closing
            setTimeout(() => {
              onClose();
              // Refresh the page to update subscription status
              window.location.reload();
            }, 3000);
          }
        } catch (error) {
          console.error("Error checking payment status:", error);
        }
      }, 5000);
    }
    
    return () => {
      if (intervalId) window.clearInterval(intervalId);
      if (timerIntervalId) window.clearInterval(timerIntervalId);
    };
  }, [paymentStatus, checkoutRequestId, toast, onClose]);

  // Stop checking and show timeout message when timer reaches zero
  useEffect(() => {
    if (paymentTimer === 0 && paymentStatus === "pending") {
      setErrorMessage("Payment confirmation timed out. If you completed the payment, it will be processed shortly. You can close this window.");
    }
  }, [paymentTimer, paymentStatus]);

  // Handle payment submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number (simple validation for Kenyan numbers)
    if (!phoneNumber.startsWith("254") || phoneNumber.length !== 12) {
      setErrorMessage("Please enter a valid Kenyan phone number");
      return;
    }
    
    setIsLoading(true);
    setPaymentStatus("pending");
    setErrorMessage("");
    setPaymentTimer(120); // Reset timer to 2 minutes
    
    try {
      // Call the M-Pesa service to initiate payment
      const response = await initiateMpesaPayment({
        phoneNumber,
        amount: plan.price,
        accountReference: `AI-CROP-${plan.id.toUpperCase()}`,
        transactionDesc: `Subscription to ${plan.name}`
      });
      
      if (response.success && response.checkoutRequestId) {
        setCheckoutRequestId(response.checkoutRequestId);
        toast({
          title: "Payment Initiated!",
          description: "Please check your phone for the M-Pesa prompt.",
        });
      } else {
        setPaymentStatus("failed");
        setErrorMessage(response.message || "Payment initiation failed. Please try again.");
        toast({
          variant: "destructive",
          title: "Payment Failed",
          description: response.message || "There was an error initiating the payment. Please try again.",
        });
      }
    } catch (error) {
      console.error("M-Pesa payment error:", error);
      setPaymentStatus("failed");
      setErrorMessage("An unexpected error occurred. Please try again later.");
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>M-Pesa Payment</DialogTitle>
          <DialogDescription>
            Subscribe to {plan.name} for KSh {plan.price.toLocaleString()}/{plan.period}
          </DialogDescription>
        </DialogHeader>
        
        {paymentStatus === "success" ? (
          <div className="py-6 flex flex-col items-center text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <h3 className="text-xl font-medium">Payment Successful!</h3>
            <p className="text-gray-500">
              Your payment has been confirmed and your subscription is now active.
            </p>
            <Button onClick={onClose} className="mt-4">Close</Button>
          </div>
        ) : paymentStatus === "pending" ? (
          <div className="py-6 flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <PhoneCall className="h-16 w-16 text-amber-500" />
              <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs animate-pulse">
                {paymentTimer > 0 ? Math.floor(paymentTimer / 60) : 0}:{paymentTimer > 0 ? (paymentTimer % 60).toString().padStart(2, '0') : '00'}
              </div>
            </div>
            <h3 className="text-xl font-medium">Check Your Phone</h3>
            <p className="text-gray-500">
              A payment prompt has been sent to <span className="font-semibold">{formatDisplayPhoneNumber(phoneNumber)}</span>. 
              Please enter your M-Pesa PIN to complete the payment.
            </p>
            <div className="bg-amber-50 p-3 rounded-md border border-amber-200 w-full mt-2">
              <p className="text-sm text-amber-800">
                This window will automatically update once your payment is confirmed. Please keep it open.
              </p>
            </div>
            {errorMessage && (
              <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
            )}
            <Button variant="outline" onClick={onClose} className="mt-2">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="phone-number">M-Pesa Phone Number</Label>
                <Input
                  id="phone-number"
                  placeholder="254712345678"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  disabled={isLoading}
                  className="mb-1"
                />
                {phoneNumber && (
                  <p className="text-sm text-gray-500">
                    Sending payment request to: {formatDisplayPhoneNumber(phoneNumber)}
                  </p>
                )}
                {errorMessage && (
                  <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
                )}
              </div>
              
              <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                <h4 className="font-medium text-amber-800 mb-1">Payment Instructions:</h4>
                <ol className="text-sm text-amber-700 space-y-1 pl-5 list-decimal">
                  <li>Enter your M-Pesa registered phone number</li>
                  <li>Click "Pay with M-Pesa" below</li>
                  <li>You'll receive a payment prompt on your phone</li>
                  <li>Enter your M-Pesa PIN to complete payment</li>
                  <li>Your subscription will be activated immediately after successful payment</li>
                </ol>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || !phoneNumber}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                  </>
                ) : (
                  "Pay with M-Pesa"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
