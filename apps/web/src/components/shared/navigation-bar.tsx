import { cn } from '@workspace/ui/lib/utils';
import { Button, buttonVariants } from '@workspace/ui/shadcn/button';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { Logo } from './logo';

interface Props extends React.ComponentProps<'nav'> {}

const navMenuLeft = ['About', 'Technologies', 'Products', 'Discover'];
const navMenuRight = ['Team', 'Pricing', 'Buy Premium'];

export const NavigationBar = async ({ ...props }: Props) => {
  const session = await authClient.getSession();

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 flex w-full flex-col items-start border-[#ffffff33] border-b bg-black/80 py-2 backdrop-blur-md"
      {...props}
    >
      <div className="w-full px-4 py-2 lg:px-[306px] lg:py-4">
        <nav className="flex w-full items-center justify-between">
          {/* Left menu items - hidden on mobile */}
          <div className="hidden h-[41px] items-center gap-6 lg:flex">
            {navMenuLeft.map((item, index) => (
              <Button
                className="h-auto cursor-pointer p-0 font-normal font-poppins text-sm text-white transition-colors duration-300 hover:text-gray-300"
                key={`nav-left-${index}`}
                variant="link"
              >
                {item}
              </Button>
            ))}
          </div>

          <Logo />

          {/* Right menu items */}
          <div className="flex h-[41px] items-center gap-2 lg:gap-6">
            {/* Hide some menu items on mobile */}
            <div className="hidden items-center gap-4 md:flex lg:gap-6">
              {navMenuRight.slice(0, 2).map((item, index) => (
                <Button
                  className="h-auto p-0 font-normal font-poppins text-sm text-white transition-colors duration-300 hover:text-gray-300"
                  key={`nav-right-${index}`}
                  variant="link"
                >
                  {item}
                </Button>
              ))}
            </div>
            <Link
              className={cn(
                buttonVariants(),
                'h-auto rounded-[55px] bg-white px-4 py-2 text-black transition-colors duration-300 hover:bg-gray-100 lg:px-[34px] lg:py-3.5'
              )}
              href={session?.data ? '/prompts' : '/login'}
            >
              <span className="font-medium font-poppins text-xs lg:text-base">
                Get Started
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
