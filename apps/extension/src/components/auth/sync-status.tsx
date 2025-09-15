import { Badge } from '@workspace/ui/shadcn/badge';
import { Button } from '@workspace/ui/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/shadcn/card';
import { useEffect, useState } from 'react';
import { AuthSync } from '../../lib/auth-sync';

export const SyncStatus = () => {
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // Set initial sync time
    setLastSync(new Date());
  }, []);

  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      await AuthSync.syncAuthState();
      setLastSync(new Date());
    } catch (error) {
      console.error('Manual sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-sm flex items-center justify-between">
          Sync Status
          <Badge variant="secondary" className="text-xs">
            Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-xs text-muted-foreground">
          <p>Last sync: {lastSync ? lastSync.toLocaleTimeString() : 'Never'}</p>
          <p className="mt-1">Auto-sync every 5 minutes</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleManualSync}
          disabled={isSyncing}
        >
          {isSyncing ? 'Syncing...' : 'Manual Sync'}
        </Button>
      </CardContent>
    </Card>
  );
};