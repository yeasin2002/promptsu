import bgGrid from "@/assets/bg-grid.png";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface Props extends React.ComponentProps<"div"> {}

export const BottomCta = ({ ...props }: Props) => {
  return (
    <section className="container px-4 py-20 relative ">
      <div
        className="absolute inset-0 opacity-40 overflow-hidden"
        style={{
          backgroundImage: `url(${bgGrid.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#0A0A0A]/80 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 text-center relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to transform your meetings?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of teams who have already revolutionized their
          communication with our platform.
        </p>
        <Button size="lg" className="button-gradient">
          Start for Free
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </motion.div>
    </section>
  );
};
