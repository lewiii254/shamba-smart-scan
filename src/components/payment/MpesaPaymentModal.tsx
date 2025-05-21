
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2 } from "lucide-react";
import { initiateMpesaPayment } from "@/services/mpesaService";

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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "pending" | "success" | "failed">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and format properly for Kenya
    const value = e.target.value.replace(/[^\d]/g, "");
    
    // Format as Kenyan number if it starts with 0 or 7
    let formatted = value;
    if (value.startsWith("0") && value.length > 1) {
      formatted = "254" + value.substring(1);
    } else if (value.startsWith("7") || value.startsWith("1")) {
      formatted = "254" + value;
    }
    
    setPhoneNumber(formatted);
  };

  const formatDisplayPhoneNumber = (phone: string) => {
    if (phone.startsWith("254") && phone.length >= 12) {
      return `+${phone.substring(0, 3)} ${phone.substring(3, 6)} ${phone.substring(6, 9)} ${phone.substring(9)}`;
    }
    return phone;
  };

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
    
    try {
      // Call the M-Pesa service to initiate payment
      const response = await initiateMpesaPayment({
        phoneNumber,
        amount: plan.price,
        accountReference: `AI-CROP-${plan.id.toUpperCase()}`,
        transactionDesc: `Subscription to ${plan.name}`
      });
      
      if (response.success) {
        setPaymentStatus("success");
        toast({
          title: "Payment Initiated!",
          description: "Please check your phone to complete the M-Pesa payment.",
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
            <h3 className="text-xl font-medium">Payment Initiated!</h3>
            <p className="text-gray-500">
              A payment request has been sent to your phone number. Please check your phone and enter your M-Pesa PIN to complete the transaction.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              The page will update automatically once the payment is confirmed.
            </p>
            <Button onClick={onClose} className="mt-4">Close</Button>
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
