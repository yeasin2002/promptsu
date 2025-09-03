'use client';

import { Button } from '@workspace/ui/shadcn/button';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { CardSpotlight } from './card-spotlight';

export const PricingSection = () => {
  return (
    <section className="container px-4 py-24" id="pricing">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 font-normal text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Choose Your <span className="font-medium text-gradient">Plan</span>
        </motion.h2>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-400 text-lg"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Every stage of your prompt journey, supported by a plan that matches your needs
        </motion.p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        <PricingTier
          description="Basic features for you"
          features={[
            'Limited prompt enhancement',
            '40-minute group meetings',
            'Basic version history (last 5 changes)',
            'Community templates access',
          ]}
          name="Starter"
          price="$0"
        />
        <PricingTier
          description="Advanced features for you"
          features={[
            'Everything in free version, plus:',
            'unlimited prompt enhancement',
            'Priority email support',
            'Save prompt in the cloud',
          ]}
          name="pro"
          price="$5"
        />
      </div>
    </section>
  );
};

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
  <CardSpotlight className={`h-full ${isPopular ? 'border-primary' : 'border-white/10'} border-2`}>
    <div className="relative flex h-full flex-col p-6">
      {isPopular && (
        <span className="mb-4 w-fit rounded-full bg-primary/10 px-3 py-1 font-medium text-primary text-xs">
          Most Popular
        </span>
      )}
      <h3 className="mb-2 font-medium text-xl">{name}</h3>
      <div className="mb-4">
        <span className="font-bold text-4xl">{price}</span>
        {price !== 'Custom' && <span className="text-gray-400">/month</span>}
      </div>
      <p className="mb-6 text-gray-400">{description}</p>
      <ul className="mb-8 flex-grow space-y-3">
        {features.map((feature, index) => (
          <li className="flex items-center gap-2" key={index}>
            <Check className="h-5 w-5 text-primary" />
            <span className="text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="button-gradient w-full"> Get Started </Button>
    </div>
  </CardSpotlight>
);

// <PricingTier
//   description="Enterprise-grade solutions for large organizations"
//   features={[
//     'Unlimited participants',
//     'Custom integrations',
//     'Advanced security controls',
//     'Dedicated account manager',
//     'Custom API access',
//     '24/7 priority support',
//   ]}
//   name="Enterprise"
//   price="Custom"
// />;
