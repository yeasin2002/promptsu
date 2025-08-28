import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { CardSpotlight } from "./CardSpotlight";

const PricingTier = ({
  name,
  price,
  description,
  features,
  isPopular,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}) => (
  <CardSpotlight
    className={`h-full ${
      isPopular ? "border-primary" : "border-white/10"
    } border-2`}
  >
    <div className="relative h-full p-6 flex flex-col">
      {isPopular && (
        <span className="text-xs font-medium bg-primary/10 text-primary rounded-full px-3 py-1 w-fit mb-4">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-medium mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{price}</span>
        {price !== "Custom" && <span className="text-gray-400">/month</span>}
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" />
            <span className="text-sm text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="button-gradient w-full">Start Meeting</Button>
    </div>
  </CardSpotlight>
);

export const PricingSection = () => {
  return (
    <section className="container px-4 py-24" id="pricing">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-normal mb-6"
        >
          Choose Your{" "}
          <span className="text-gradient font-medium">Meeting Plan</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-lg text-gray-400"
        >
          Select the perfect meeting plan with advanced video conferencing
          features and AI-powered tools
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <PricingTier
          name="Starter"
          price="$0"
          description="Perfect for small teams getting started"
          features={[
            "Up to 100 participants",
            "40-minute group meetings",
            "HD video & audio",
            "Basic screen sharing",
            "Email support",
          ]}
        />
        <PricingTier
          name="Business"
          price="$149"
          description="Advanced features for growing teams"
          features={[
            "Up to 500 participants",
            "Unlimited meeting duration",
            "AI meeting assistant",
            "Advanced collaboration tools",
            "Priority support",
            "Admin dashboard",
          ]}
          isPopular
        />
        <PricingTier
          name="Enterprise"
          price="Custom"
          description="Enterprise-grade solutions for large organizations"
          features={[
            "Unlimited participants",
            "Custom integrations",
            "Advanced security controls",
            "Dedicated account manager",
            "Custom API access",
            "24/7 priority support",
          ]}
        />
      </div>
    </section>
  );
};
