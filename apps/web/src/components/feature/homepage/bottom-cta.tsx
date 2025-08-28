import bgGrid from '@/assets/bg-grid.png';
import { Button } from '@workspace/ui/shadcn/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface Props extends React.ComponentProps<'div'> {}

export const BottomCta = ({ ...props }: Props) => {
  return (
    <section className="container relative px-4 py-20 " {...props}>
      <div
        className="absolute inset-0 overflow-hidden opacity-40"
        style={{
          backgroundImage: `url(${bgGrid.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 rounded-2xl border border-white/10 bg-[#0A0A0A]/80 p-8 text-center backdrop-blur-lg md:p-12"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-4 font-bold text-3xl md:text-4xl">
          Ready to transform your meetings?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          Join thousands of teams who have already revolutionized their
          communication with our platform.
        </p>
        <Button className="button-gradient" size="lg">
          Start for Free
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </section>
  );
};
