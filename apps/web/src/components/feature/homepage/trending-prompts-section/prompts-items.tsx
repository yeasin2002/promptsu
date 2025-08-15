import { Card, CardContent } from '@workspace/ui/components/card';
import { ArrowUpIcon } from 'lucide-react';

interface Props extends React.ComponentProps<'div'> {
  prompts: { text: string; url: string }[];
}

export const PromptsItems = ({ prompts, ...props }: Props) => {
  return (
    <div
      className="flex animate-scroll-right items-start gap-4 lg:relative lg:right-[200px] lg:gap-[30px]"
      {...props}
    >
      {prompts.map((prompt, index) => (
        <Card
          className="flex-none overflow-hidden rounded-lg border-gray-800 bg-[#0d0d0d] transition-colors duration-300 hover:border-gray-600"
          key={`middle-prompt-${index}`}
        >
          <CardContent className="flex items-start justify-end gap-2.5 px-4 py-4 lg:px-[26px] lg:py-[27px]">
            <div className="mt-[-1.00px] w-fit font-normal font-poppins text-lg leading-[normal] tracking-[0] lg:text-xl">
              <span className="text-white">{prompt.text} </span>
              <span className="text-[#1d72f2]">{prompt.url}</span>
            </div>
            <ArrowUpIcon className="h-6 w-6 flex-shrink-0 text-white lg:h-[31px] lg:w-[31px]" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
