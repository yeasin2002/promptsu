'use client';

import { RiGoogleFill } from '@remixicon/react';
import { Button } from "@workspace/ui/components/button";
import { Github } from 'lucide-react';
import { toast } from "sonner";
import { authClient } from '@/lib/auth-client';

const SocialAuth = () => {
  const handleSocialAuth = async (provider: 'google' | 'github') => {
    try {
      await authClient.signIn.social({ provider, callbackURL: "/prompts" });
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  return (
    <div>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button
          className="w-full cursor-pointer"
          onClick={() => handleSocialAuth('github')}
          variant="outline"
        >
          <Github />
          <span className="sr-only">Login with GitHub</span>
        </Button>
        <Button
          className="w-full cursor-pointer"
          onClick={() => handleSocialAuth('google')}
          variant="outline"
        >
          <RiGoogleFill />
          <span className="sr-only">Login with Google</span>
        </Button>
      </div>
    </div>
  );
};

export default SocialAuth;
