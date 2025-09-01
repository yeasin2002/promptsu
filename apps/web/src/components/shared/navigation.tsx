'use client';

import { useQuery } from '@tanstack/react-query';
import { buttonVariants } from '@workspace/ui/shadcn/button';
import { Command } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { trpc } from '@/utils/trpc';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const privateData = useQuery(trpc.hello.queryOptions());
  console.log('🚀 ~ Navigation ~ privateData:', privateData);
  console.log('🚀 ~ Navigation ~ privateData:', privateData.error);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`-translate-x-1/2 fixed top-3.5 left-1/2 z-50 rounded-full transition-all duration-300 ${
        isScrolled
          ? 'h-14 w-[90%] max-w-2xl scale-95 border border-white/10 bg-[#1B1B1B]/40 backdrop-blur-xl'
          : 'h-14 w-[95%] max-w-3xl bg-[#1B1B1B]'
      }`}
    >
      <div className="mx-auto h-full px-6">
        <nav className="flex h-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Command className="h-5 w-5 text-primary" />
            <span className="font-bold text-base">ConnectChat</span>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-6">
            <Link
              className={buttonVariants({
                size: 'sm',
                className: 'button-gradient 4 px-6',
              })}
              href={'/login'}
            >
              Login
            </Link>
          </div>

          {/* <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="glass">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-[#1B1B1B]">
                <div className="flex flex-col gap-4 mt-8">
                  <Link
                    href={"/meet"}
                    className={buttonVariants({
                      size: "sm",
                      className: "button-gradient",
                    })}
                  >
                    Join meeting
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div> */}
        </nav>
      </div>
    </header>
  );
};
