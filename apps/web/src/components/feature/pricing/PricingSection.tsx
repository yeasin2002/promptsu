import { Button } from '@workspace/ui/shadcn/button';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { CardSpotlight } from './CardSpotlight';

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
      isPopular ? 'border-primary' : 'border-white/10'
    } border-2`}
  >
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
      <Button className="button-gradient w-full">Start Meeting</Button>
    </div>
  </CardSpotlight>
);

export const PricingSection = () => {
  return (
    <section className="container px-4 py-24" id="pricing">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 font-normal text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Choose Your{' '}
          <span className="font-medium text-gradient">Meeting Plan</span>
        </motion.h2>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-400 text-lg"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Select the perfect meeting plan with advanced video conferencing
          features and AI-powered tools
        </motion.p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        <PricingTier
          description="Perfect for small teams getting started"
          features={[
            'Up to 100 participants',
            '40-minute group meetings',
            'HD video & audio',
            'Basic screen sharing',
            'Email support',
          ]}
          name="Starter"
          price="$0"
        />
        <PricingTier
          description="Advanced features for growing teams"
          features={[
            'Up to 500 participants',
            'Unlimited meeting duration',
            'AI meeting assistant',
            'Advanced collaboration tools',
            'Priority support',
            'Admin dashboard',
          ]}
          isPopular
          name="Business"
          price="$149"
        />
        <PricingTier
          description="Enterprise-grade solutions for large organizations"
          features={[
            'Unlimited participants',
            'Custom integrations',
            'Advanced security controls',
            'Dedicated account manager',
            'Custom API access',
            '24/7 priority support',
          ]}
          name="Enterprise"
          price="Custom"
        />
      </div>
    </section>
  );
};
