import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpIcon } from 'lucide-react';

interface Props extends React.ComponentProps<'div'> {
  prompts: { text: string; url: string }[];
}

export const PromptsItems = ({ prompts, ...props }: Props) => {
  return (
    <div
      className="flex items-start gap-4 lg:gap-[30px] animate-scroll-right lg:relative lg:right-[200px]"
      {...props}
    >
      {prompts.map((prompt, index) => (
        <Card
          key={`middle-prompt-${index}`}
          className="flex-none bg-[#0d0d0d] border-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition-colors duration-300"
        >
          <CardContent className="flex items-start justify-end gap-2.5 px-4 lg:px-[26px] py-4 lg:py-[27px]">
            <div className="w-fit mt-[-1.00px] font-poppins font-normal text-lg lg:text-xl tracking-[0] leading-[normal]">
              <span className="text-white">{prompt.text} </span>
              <span className="text-[#1d72f2]">{prompt.url}</span>
            </div>
            <ArrowUpIcon className="w-6 h-6 lg:w-[31px] lg:h-[31px] text-white flex-shrink-0" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
