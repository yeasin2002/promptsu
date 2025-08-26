import { BentoCard } from "@workspace/ui/custom/BentoCard";
import { TrendingUp } from "lucide-react";
// import { RoleCard } from "@/components/cards/prompts-cards";
import { SearchInput } from "@/components/ui/search-input";
import { promptList } from "@/data/prompt-list";

function App() {
	return (
		<div className="min-w-2xl p-8 min-h-screen">
			<h1 className="text-3xl font-bold mb-6">Prompt verse</h1>

			<SearchInput />

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
				{promptList.map((_card) => (
					<BentoCard
						description="Real-time metrics with AI-powered insights and predictive analytics"
						hasPersistentHover={true}
						icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
						meta="v2.4.1"
						status="Live"
						tags={["Statistics", "Reports", "AI"]}
						title="Analytics Dashboard"
					/>
				))}
			</div>
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
