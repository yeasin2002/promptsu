'use client';

import { Card, CardContent } from "@workspace/ui/components/card";
import Image from "next/image";
import { cn } from '@/lib/utils';

export default function SignInPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background p-6 md:p-10 ">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className={cn('flex flex-col gap-6')}>
          <Card className="overflow-hidden">
            <CardContent className="grid p-0 md:grid-cols-2">
              {children}
              <div className="relative hidden bg-background md:block">
                <Image
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                  fill
                  src="https://images.unsplash.com/photo-1750930341486-c573d31b9b0a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-muted-foreground text-xs [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our{' '}
            <a href="/">Terms of Service</a> and <a href="/">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
