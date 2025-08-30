import { Button } from "@workspace/ui/shadcn/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@workspace/ui/shadcn/card";
import { Input } from "@workspace/ui/shadcn/input";
import { Label } from "@workspace/ui/shadcn/label";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@workspace/ui/shadcn/tabs";
import { useState } from "react";
import { useAuth } from "../../hooks/use-auth";

function App() {
	const { authState, isLoading, login, register, logout, isAuthenticated } =
		useAuth();
	const [loginForm, setLoginForm] = useState({ email: "", password: "" });
	const [registerForm, setRegisterForm] = useState({
		email: "",
		password: "",
		name: "",
	});
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsSubmitting(true);

		try {
			const result = await login(loginForm.email, loginForm.password);
			if (!result.success) {
				setError(result.error || "Login failed");
			}
		} catch (error) {
			setError("An unexpected error occurred");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsSubmitting(true);

		try {
			const result = await register(
				registerForm.email,
				registerForm.password,
				registerForm.name,
			);
			if (!result.success) {
				setError(result.error || "Registration failed");
			}
		} catch (error) {
			setError("An unexpected error occurred");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleLogout = async () => {
		setIsSubmitting(true);
		try {
			await logout();
		} catch (error) {
			setError("Logout failed");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isLoading) {
		return (
			<div className="flex w-full max-w-sm flex-col gap-6 min-w-xl p-4">
				<div className="flex items-center justify-center p-8">
					<div className="text-sm text-muted-foreground">Loading...</div>
				</div>
			</div>
		);
	}

	if (isAuthenticated) {
		return (
			<div className="flex w-full max-w-sm flex-col gap-6 min-w-xl p-4">
				<Card>
					<CardHeader>
						<CardTitle>Welcome back!</CardTitle>
						<CardDescription>
							You are signed in as {authState.user?.email}
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4">
						<div className="grid gap-2">
							<Label>Name</Label>
							<div className="text-sm">
								{authState.user?.name || "Not provided"}
							</div>
						</div>
						<div className="grid gap-2">
							<Label>Email</Label>
							<div className="text-sm">{authState.user?.email}</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button
							onClick={handleLogout}
							disabled={isSubmitting}
							variant="outline"
							className="w-full"
						>
							{isSubmitting ? "Signing out..." : "Sign out"}
						</Button>
					</CardFooter>
				</Card>
			</div>
		);
	}

	return (
		<div className="flex w-full max-w-sm flex-col gap-6 min-w-xl p-4">
			{error && (
				<div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
					{error}
				</div>
			)}

			<Tabs defaultValue="login">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="login">Sign In</TabsTrigger>
					<TabsTrigger value="register">Sign Up</TabsTrigger>
				</TabsList>

				<TabsContent value="login">
					<Card>
						<form onSubmit={handleLogin}>
							<CardHeader>
								<CardTitle>Sign In</CardTitle>
								<CardDescription>
									Enter your credentials to access your account.
								</CardDescription>
							</CardHeader>
							<CardContent className="grid gap-4">
								<div className="grid gap-2">
									<Label htmlFor="login-email">Email</Label>
									<Input
										id="login-email"
										type="email"
										value={loginForm.email}
										onChange={(e) =>
											setLoginForm((prev) => ({
												...prev,
												email: e.target.value,
											}))
										}
										required
										disabled={isSubmitting}
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="login-password">Password</Label>
									<Input
										id="login-password"
										type="password"
										value={loginForm.password}
										onChange={(e) =>
											setLoginForm((prev) => ({
												...prev,
												password: e.target.value,
											}))
										}
										required
										disabled={isSubmitting}
									/>
								</div>
							</CardContent>
							<CardFooter>
								<Button
									type="submit"
									className="w-full"
									disabled={isSubmitting}
								>
									{isSubmitting ? "Signing in..." : "Sign In"}
								</Button>
							</CardFooter>
						</form>
					</Card>
				</TabsContent>

				<TabsContent value="register">
					<Card>
						<form onSubmit={handleRegister}>
							<CardHeader>
								<CardTitle>Sign Up</CardTitle>
								<CardDescription>
									Create a new account to get started.
								</CardDescription>
							</CardHeader>
							<CardContent className="grid gap-4">
								<div className="grid gap-2">
									<Label htmlFor="register-name">Name (optional)</Label>
									<Input
										id="register-name"
										type="text"
										value={registerForm.name}
										onChange={(e) =>
											setRegisterForm((prev) => ({
												...prev,
												name: e.target.value,
											}))
										}
										disabled={isSubmitting}
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="register-email">Email</Label>
									<Input
										id="register-email"
										type="email"
										value={registerForm.email}
										onChange={(e) =>
											setRegisterForm((prev) => ({
												...prev,
												email: e.target.value,
											}))
										}
										required
										disabled={isSubmitting}
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="register-password">Password</Label>
									<Input
										id="register-password"
										type="password"
										value={registerForm.password}
										onChange={(e) =>
											setRegisterForm((prev) => ({
												...prev,
												password: e.target.value,
											}))
										}
										required
										disabled={isSubmitting}
									/>
								</div>
							</CardContent>
							<CardFooter>
								<Button
									type="submit"
									className="w-full"
									disabled={isSubmitting}
								>
									{isSubmitting ? "Creating account..." : "Sign Up"}
								</Button>
							</CardFooter>
						</form>
					</Card>
				</TabsContent>
			</Tabs>
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
