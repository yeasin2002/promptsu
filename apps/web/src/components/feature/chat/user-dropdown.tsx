import {
  RiFindReplaceLine,
  RiLogoutCircleLine,
  RiPulseLine,
  RiTimer2Line,
  RiUserLine,
} from "@remixicon/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

export default function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-auto p-0 hover:bg-transparent" variant="ghost">
          <Avatar className="size-8">
            <AvatarImage
              alt="Profile image"
              height={32}
              src="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp2/user-02_mlqqqt.png"
              width={32}
            />
            <AvatarFallback>KK</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-w-64 p-2">
        <DropdownMenuLabel className="mb-2 flex min-w-0 flex-col px-1 py-0">
          <span className="mb-0.5 truncate font-medium text-foreground text-sm">
            Mary P.
          </span>
          <span className="truncate font-normal text-muted-foreground text-xs">
            mary@askdigital.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuItem className="gap-3 px-1">
          <RiTimer2Line
            aria-hidden="true"
            className="text-muted-foreground/70"
            size={20}
          />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-3 px-1">
          <RiUserLine
            aria-hidden="true"
            className="text-muted-foreground/70"
            size={20}
          />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-3 px-1">
          <RiPulseLine
            aria-hidden="true"
            className="text-muted-foreground/70"
            size={20}
          />
          <span>Changelog</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-3 px-1">
          <RiFindReplaceLine
            aria-hidden="true"
            className="text-muted-foreground/70"
            size={20}
          />
          <span>History</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-3 px-1">
          <RiLogoutCircleLine
            aria-hidden="true"
            className="text-muted-foreground/70"
            size={20}
          />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
