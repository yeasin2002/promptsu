import { AuthForm } from '../../components/auth/auth-form';
import { SyncStatus } from '../../components/auth/sync-status';
import { UserProfile } from '../../components/auth/user-profile';
import { useAuth } from '../../hooks/use-auth';

function App() {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className="flex w-full max-w-sm flex-col items-center justify-center p-8">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
				<p className="mt-4 text-sm text-muted-foreground">Loading...</p>
			</div>
		);
	}

	return (
		<div className="flex w-full max-w-sm flex-col gap-4 min-w-xl p-4">
			{isAuthenticated ? <UserProfile /> : <AuthForm />}
			<SyncStatus />
		</div>
	);
}

export default App;

// <RoleCard
// 	key={card.description}
// 	title={card.title}
// 	description={card.description}
// 	author={card.author}
// />
