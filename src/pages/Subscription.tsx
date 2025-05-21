
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { MpesaPaymentModal } from "@/components/payment/MpesaPaymentModal";

const Subscription = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const plans = [
    {
      id: "monthly",
      name: "Premium Monthly",
      price: 999,
      period: "month",
      features: [
        "Unlimited AI plant scans",
        "Priority chat support",
        "Access to all video tutorials",
        "Expert consultation access"
      ],
      recommended: false
    },
    {
      id: "annual",
      name: "Premium Annual",
      price: 9999,
      period: "year",
      features: [
        "All monthly features",
        "2 months free (17% savings)",
        "Exclusive webinars",
        "Downloadable resources"
      ],
      recommended: true,
      savePercent: 17
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: null,
      period: "custom",
      features: [
        "Multi-user accounts",
        "API access",
        "Custom integrations",
        "Dedicated account manager"
      ],
      recommended: false,
      isEnterprise: true
    }
  ];

  const handleSubscribe = (plan: any) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to subscribe to a plan.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (plan.isEnterprise) {
      // For enterprise, redirect to contact form or show different modal
      toast({
        title: "Enterprise Inquiry",
        description: "A sales representative will contact you soon.",
      });
      return;
    }

    // For regular plans, open payment modal
    setSelectedPlan(plan);
    setPaymentModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Upgrade Your Farming Experience</h1>
          <p className="text-lg text-green-700">
            Choose the plan that works best for you and start growing smarter with AI-powered solutions.
          </p>
        </div>

        <Tabs defaultValue="subscription" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="subscription">Subscription Plans</TabsTrigger>
            <TabsTrigger value="comparison">Features Comparison</TabsTrigger>
          </TabsList>
          
          <TabsContent value="subscription">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {plans.map((plan) => (
                <Card key={plan.id} className={`relative overflow-hidden ${plan.recommended ? 'border-green-500 shadow-lg' : ''}`}>
                  {plan.recommended && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                      Best Value
                    </div>
                  )}
                  {plan.savePercent && (
                    <div className="absolute top-0 left-0 bg-amber-500 text-white px-4 py-1 rounded-br-lg text-sm font-medium">
                      Save {plan.savePercent}%
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      {plan.price ? (
                        <div className="mt-2">
                          <span className="text-3xl font-bold text-green-700">KSh {plan.price.toLocaleString()}</span>
                          <span className="text-gray-500">/{plan.period}</span>
                        </div>
                      ) : (
                        <div className="mt-2">
                          <span className="text-3xl font-bold text-green-700">Custom</span>
                          <span className="text-gray-500"> pricing</span>
                        </div>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2 text-lg">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full" 
                      variant={plan.isEnterprise ? "outline" : "default"}
                      onClick={() => handleSubscribe(plan)}
                    >
                      {plan.isEnterprise ? "Contact Sales" : "Subscribe Now"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle>Features Comparison</CardTitle>
                <CardDescription>
                  Detailed comparison of features across different plans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="text-left p-3 border-b-2">Feature</th>
                        <th className="text-center p-3 border-b-2">Free Plan</th>
                        <th className="text-center p-3 border-b-2">Premium Monthly</th>
                        <th className="text-center p-3 border-b-2">Premium Annual</th>
                        <th className="text-center p-3 border-b-2">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border-b">AI Plant Scans</td>
                        <td className="text-center p-3 border-b">5/month</td>
                        <td className="text-center p-3 border-b">Unlimited</td>
                        <td className="text-center p-3 border-b">Unlimited</td>
                        <td className="text-center p-3 border-b">Unlimited</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-b">Disease Library Access</td>
                        <td className="text-center p-3 border-b">Limited</td>
                        <td className="text-center p-3 border-b">Full</td>
                        <td className="text-center p-3 border-b">Full</td>
                        <td className="text-center p-3 border-b">Full</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-b">Video Tutorials</td>
                        <td className="text-center p-3 border-b">Basic</td>
                        <td className="text-center p-3 border-b">All</td>
                        <td className="text-center p-3 border-b">All + Exclusive</td>
                        <td className="text-center p-3 border-b">All + Custom</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-b">Expert Consultations</td>
                        <td className="text-center p-3 border-b">❌</td>
                        <td className="text-center p-3 border-b">✓</td>
                        <td className="text-center p-3 border-b">✓</td>
                        <td className="text-center p-3 border-b">Dedicated</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-b">Support Response</td>
                        <td className="text-center p-3 border-b">48 hours</td>
                        <td className="text-center p-3 border-b">24 hours</td>
                        <td className="text-center p-3 border-b">12 hours</td>
                        <td className="text-center p-3 border-b">4 hours</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-b">Analytics</td>
                        <td className="text-center p-3 border-b">Basic</td>
                        <td className="text-center p-3 border-b">Advanced</td>
                        <td className="text-center p-3 border-b">Advanced</td>
                        <td className="text-center p-3 border-b">Custom</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-b">API Access</td>
                        <td className="text-center p-3 border-b">❌</td>
                        <td className="text-center p-3 border-b">❌</td>
                        <td className="text-center p-3 border-b">Limited</td>
                        <td className="text-center p-3 border-b">Full</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-b">Multi-user Accounts</td>
                        <td className="text-center p-3 border-b">❌</td>
                        <td className="text-center p-3 border-b">❌</td>
                        <td className="text-center p-3 border-b">❌</td>
                        <td className="text-center p-3 border-b">✓</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Still Have Questions?</h2>
          <p className="text-lg text-green-700 mb-8 max-w-2xl mx-auto">
            Our team is ready to help you choose the right plan for your farming needs.
          </p>
          <Button variant="outline" size="lg">Contact Support</Button>
        </div>
      </main>
      
      <Footer />
      
      {paymentModalOpen && selectedPlan && (
        <MpesaPaymentModal 
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          plan={selectedPlan}
        />
      )}
    </div>
  );
};

export default Subscription;
