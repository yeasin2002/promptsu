import {
  RiBookLine,
  RiCheckLine,
  RiCodeSSlashLine,
  RiLoopRightFill,
} from "@remixicon/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import Image from "next/image";
import { cn } from '@/lib/utils';

type ChatMessageProps = {
  isUser?: boolean;
  children: React.ReactNode;
};

export function ChatMessage({ isUser, children }: ChatMessageProps) {
  return (
    <article
      className={cn(
        'flex items-start gap-4 text-[15px] leading-relaxed',
        isUser && 'justify-end'
      )}
    >
      <Image
        alt={isUser ? 'User profile' : 'Bart logo'}
        className={cn(
          'rounded-full',
          isUser ? 'order-1' : 'border border-black/[0.08] shadow-sm'
        )}
        height={40}
        src={
          isUser
            ? 'https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp2/user-02_mlqqqt.png'
            : 'https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp2/user-01_i5l7tp.png'
        }
        width={40}
      />
      <div
        className={cn(isUser ? 'rounded-xl bg-muted px-4 py-3' : 'space-y-4')}
      >
        <div className="flex flex-col gap-3">
          <p className="sr-only">{isUser ? 'You' : 'Bart'} said:</p>
          {children}
        </div>
        {!isUser && <MessageActions />}
      </div>
    </article>
  );
}

type ActionButtonProps = {
  icon: React.ReactNode;
  label: string;
};

function ActionButton({ icon, label }: ActionButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className="relative flex size-8 items-center justify-center text-muted-foreground/80 outline-offset-2 transition-colors before:absolute before:inset-y-1.5 before:left-0 before:w-px before:bg-border first:before:hidden first-of-type:rounded-s-lg last-of-type:rounded-e-lg hover:text-foreground focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-ring/70"
          type="button"
        >
          {icon}
          <span className="sr-only">{label}</span>
        </button>
      </TooltipTrigger>
      <TooltipContent className="dark px-2 py-1 text-xs" side="bottom">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function MessageActions() {
  return (
    <div className="-space-x-px relative inline-flex rounded-md border border-black/[0.08] bg-white shadow-sm">
      <TooltipProvider delayDuration={0}>
        <ActionButton icon={<RiCodeSSlashLine size={16} />} label="Show code" />
        <ActionButton icon={<RiBookLine size={16} />} label="Bookmark" />
        <ActionButton icon={<RiLoopRightFill size={16} />} label="Refresh" />
        <ActionButton icon={<RiCheckLine size={16} />} label="Approve" />
      </TooltipProvider>
    </div>
  );
}
