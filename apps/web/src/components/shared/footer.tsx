import { Button } from '@workspace/ui/shadcn/button';
import { Github, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-20 w-full py-12">
      <div className="container px-4">
        <div className="glass glass-hover rounded-xl p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">ConnectChat</h3>
              <p className="text-muted-foreground text-sm">
                Empowering traders with advanced crypto trading solutions.
              </p>
              <div className="flex space-x-4">
                <Button size="icon" variant="ghost">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Trading</h4>
              <ul className="space-y-2">
                <li>
                  <a className="text-muted-foreground text-sm transition-colors hover:text-primary" href="#features">
                    Markets
                  </a>
                </li>
                <li>
                  <a className="text-muted-foreground text-sm transition-colors hover:text-primary" href="#pricing">
                    Trading Fees
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a className="text-muted-foreground text-sm transition-colors hover:text-primary" href="#">
                    Trading Guide
                  </a>
                </li>
                <li>
                  <a className="text-muted-foreground text-sm transition-colors hover:text-primary" href="#">
                    Market Analysis
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a className="text-muted-foreground text-sm transition-colors hover:text-primary" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="text-muted-foreground text-sm transition-colors hover:text-primary" href="#">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-white/10 border-t pt-8">
            <p className="text-center text-muted-foreground text-sm">
              © {new Date().getFullYear()} Rezaul Arif. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
