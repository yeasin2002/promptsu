'use client';

import { RiGoogleFill } from '@remixicon/react';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SocialAuth = () => {
  return (
    <div>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button className="w-full" variant="outline">
          <Github />
          <span className="sr-only">Login with GitHub</span>
        </Button>
        <Button className="w-full" variant="outline">
          <RiGoogleFill />
          <span className="sr-only">Login with Google</span>
        </Button>
      </div>
    </div>
  );
};

export default SocialAuth;
