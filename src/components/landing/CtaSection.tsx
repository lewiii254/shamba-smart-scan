
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

const CtaSection = () => {
  const { user } = useAuth();
  
  return (
    <div className="py-16 bg-gradient-to-r from-green-500 to-green-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Experience the power of AI in agriculture today! 🌿</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of farmers already using our AI technology to detect diseases early and protect their crops. Get started in just seconds! ✨
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-white text-green-600 hover:bg-green-50 text-lg px-8 py-6 rounded-lg transition-all duration-300 shadow-lg"
          >
            <Link to={user ? "/scan" : "/auth"}>
              Try Our AI Scanner Now
              <Zap className="ml-2" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-lg text-lg"
          >
            <Link to="/about">
              Learn About Our Technology
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
