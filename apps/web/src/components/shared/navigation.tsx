'use client';

import { cn } from '@workspace/ui/lib/utils';
import { Command } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authClient } from '@/lib/auth-client';

export const Navigation = () => {
  const { data, isPending } = authClient.useSession();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignout = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.log('🚀 ~ handleSignout ~ error:', error);
      toast.error((error as Error).message || 'Something went wrong');
    }
  };
  return (
    <header
      className={`-translate-x-1/2 fixed top-3.5 left-1/2 z-50 rounded-4xl transition-all duration-300 ${
        isScrolled
          ? 'h-14 w-[90%] max-w-6xl scale-95 border border-white/10 bg-[#1B1B1B]/40 backdrop-blur-xl'
          : 'h-14 w-[95%] max-w-7xl bg-[#1B1B1B]'
      }`}
    >
      <div className="mx-auto h-full px-6">
        <nav className="flex h-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Command className="h-5 w-5 text-primary" />
            <span className="font-bold text-base">Promptsu</span>
          </div>

          {/* Desktop Navigation */}
          <div
            className={cn('flex items-center gap-6', {
              hidden: isPending,
            })}
          >
            {data ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer outline-none">
                  {data?.user?.image ? (
                    <Image alt="" height={40} src={data?.user?.image} width={40} />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {data?.user?.name?.split(' ')[0]}
                    </div>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={'/profile'}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={'/prompts'}>Prompts</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleSignout}>
                    logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                className={buttonVariants({
                  size: 'sm',
                  className: 'button-gradient 4 px-6',
                })}
                href={'/login'}
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
