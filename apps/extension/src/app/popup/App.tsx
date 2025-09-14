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
import { CTA1 } from "@workspace/ui/workspace-ui/CTA";

function App() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-6 min-w-xl p-4">
			<Tabs defaultValue="account">
				<TabsList>
					<TabsTrigger value="account">Account</TabsTrigger>
					<TabsTrigger value="password">Password</TabsTrigger>
				</TabsList>
				<TabsContent value="account">
					<CTA1 />
				</TabsContent>
				<TabsContent value="password">
					<Card>
						<CardHeader>
							<CardTitle>Password</CardTitle>
							<CardDescription>
								Change your password here. After saving, you&apos;ll be logged
								out.
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-6">
							<div className="grid gap-3">
								<Label htmlFor="tabs-demo-current">Current password</Label>
								<Input id="tabs-demo-current" type="password" />
							</div>
							<div className="grid gap-3">
								<Label htmlFor="tabs-demo-new">New password</Label>
								<Input id="tabs-demo-new" type="password" />
							</div>
						</CardContent>
						<CardFooter>
							<Button>Save password</Button>
						</CardFooter>
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
