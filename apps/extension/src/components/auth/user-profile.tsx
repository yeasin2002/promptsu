import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/shadcn/avatar';
import { Badge } from '@workspace/ui/shadcn/badge';
import { Button } from '@workspace/ui/shadcn/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@workspace/ui/shadcn/card';
import { useAuth } from '../../hooks/use-auth';

export const UserProfile = () => {
  const { user, signOut, isLoading } = useAuth();

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback className="text-lg">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-lg">{user.name}</CardTitle>
        <CardDescription className="flex items-center justify-center gap-2">
          {user.email}
          {user.emailVerified && (
            <Badge variant="secondary" className="text-xs">
              Verified
            </Badge>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-muted-foreground">Member since</p>
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-medium text-muted-foreground">Last updated</p>
            <p>{new Date(user.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => window.open('http://localhost:3001/profile', '_blank')}
        >
          Open Web App
        </Button>
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={handleSignOut}
          disabled={isLoading}
        >
          {isLoading ? 'Signing Out...' : 'Sign Out'}
        </Button>
      </CardFooter>
    </Card>
  );
};