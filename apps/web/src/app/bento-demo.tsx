import { CheckCircle, TrendingUp, Video } from "lucide-react";
import { BentoCard } from "./BentoCard";

export default function BentoDemo() {
  return (
    <main className="min-h-screen p-8 ">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="mb-8 text-center font-bold text-3xl">
          Reusable Bento Cards
        </h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <BentoCard
            description="Real-time metrics with AI-powered insights and predictive analytics"
            hasPersistentHover={true}
            icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
            meta="v2.4.1"
            status="Live"
            tags={["Statistics", "Reports", "AI"]}
            title="Analytics Dashboard"
          />

          <BentoCard
            description="Automated workflow management with priority scheduling"
            icon={<CheckCircle className="h-4 w-4 text-emerald-500" />}
            meta="84 completed"
            status="Updated"
            tags={["Productivity", "Automation"]}
            title="Task Manager"
          />

          <BentoCard
            className="md:col-span-2 lg:col-span-1"
            description="Cloud storage with intelligent content processing"
            icon={<Video className="h-4 w-4 text-purple-500" />}
            meta="12GB used"
            tags={["Storage", "CDN"]}
            title="Media Library"
          />
        </div>
      </div>
    </main>
  );
}
