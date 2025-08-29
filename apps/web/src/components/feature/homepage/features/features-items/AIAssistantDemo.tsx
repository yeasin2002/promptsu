import { motion } from 'framer-motion';
import { Brain, CheckCircle, FileText, MessageSquare } from 'lucide-react';

export const AIAssistantDemo = () => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex h-full min-h-[27rem] items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass relative w-full overflow-hidden rounded-xl p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />

        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-primary" />
            <h3 className="font-semibold text-2xl">AI Meeting Assistant</h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span className="font-medium text-sm">Live Transcription</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-medium text-sm">Auto Notes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-medium text-sm">Action Items</span>
              </div>
            </div>

            <div className="glass-hover rounded-lg p-4">
              <p className="text-muted-foreground text-sm">
                "The AI assistant automatically captures key points, generates
                summaries, and identifies action items from your meetings."
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
