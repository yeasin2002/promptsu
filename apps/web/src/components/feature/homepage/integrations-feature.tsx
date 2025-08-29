import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'motion/react';
import Image from 'next/image';
import chatgptIcon from '@/assets/icons/chatgpt-light.svg';
import claudeIcon from '@/assets/icons/claude.svg';
import deepseekIcon from '@/assets/icons/deepseek.svg';
import GeminiIcon from '@/assets/icons/gemini-color.svg';
import lovableIcon from '@/assets/icons/lovable.svg';
import v0Icon from '@/assets/icons/v0.svg';

export function IntegrationsFeature() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="px-6 "
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative mx-auto flex max-w-sm items-center justify-between">
        <div className="space-y-6">
          <IntegrationCard position="left-top">
            <Image alt="claude" src={chatgptIcon} />
          </IntegrationCard>
          <IntegrationCard position="left-middle">
            <Image alt="claude" src={GeminiIcon} />
          </IntegrationCard>
          <IntegrationCard position="left-bottom">
            <Image alt="claude" src={claudeIcon} />
          </IntegrationCard>
        </div>
        <div className="mx-auto my-2 flex w-fit justify-center gap-2">
          <div className="relative z-20 rounded-2xl border p-1">
            <IntegrationCard
              className="size-16 border-black/25 shadow-black-950/10 shadow-xl dark:border-white/25 dark:shadow-white/10"
              isCenter={true}
            >
              <Image alt="claude" src={claudeIcon} />
            </IntegrationCard>
          </div>
        </div>
        <div
          className="absolute inset-1/3 bg-[radial-gradient(var(--dots-color)_1px,transparent_1px)] opacity-50 [--dots-color:black] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:[--dots-color:white]"
          role="presentation"
        />

        <div className="space-y-6">
          <IntegrationCard position="right-top">
            <Image alt="claude" src={deepseekIcon} />
          </IntegrationCard>
          <IntegrationCard position="right-middle">
            <Image alt="claude" src={v0Icon} />
          </IntegrationCard>
          <IntegrationCard position="right-bottom">
            <Image alt="claude" src={lovableIcon} />
          </IntegrationCard>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-lg space-y-6 text-center">
        <h2 className="text-balance font-semibold text-3xl md:text-4xl">
          Integrate with your favorite tools
        </h2>
        <p className="text-muted-foreground">
          Connect seamlessly with popular platforms and services to enhance your
          workflow.
        </p>
      </div>
    </motion.div>
  );
}

const IntegrationCard = ({
  children,
  className,
  position,
  isCenter = false,
}: {
  children: React.ReactNode;
  className?: string;
  position?:
    | 'left-top'
    | 'left-middle'
    | 'left-bottom'
    | 'right-top'
    | 'right-middle'
    | 'right-bottom';
  isCenter?: boolean;
}) => {
  return (
    <div
      className={cn(
        'relative flex size-12 rounded-xl border bg-background dark:bg-transparent',
        className
      )}
    >
      <div
        className={cn(
          'relative z-20 m-auto size-fit *:size-6',
          isCenter && '*:size-8'
        )}
      >
        {children}
      </div>
      {position && !isCenter && (
        <div
          className={cn(
            'absolute z-10 h-px bg-linear-to-r to-muted-foreground/25',
            position === 'left-top' &&
              'top-1/2 left-full w-[130px] origin-left rotate-[25deg]',
            position === 'left-middle' &&
              'top-1/2 left-full w-[120px] origin-left',
            position === 'left-bottom' &&
              'top-1/2 left-full w-[130px] origin-left rotate-[-25deg]',
            position === 'right-top' &&
              'top-1/2 right-full w-[130px] origin-right rotate-[-25deg] bg-linear-to-l',
            position === 'right-middle' &&
              'top-1/2 right-full w-[120px] origin-right bg-linear-to-l',
            position === 'right-bottom' &&
              'top-1/2 right-full w-[130px] origin-right rotate-[25deg] bg-linear-to-l'
          )}
        />
      )}
    </div>
  );
};
