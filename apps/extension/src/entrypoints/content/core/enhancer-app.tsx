import { LoadingSpinner } from "@/components/enhancers";
import { useCallback, useState } from "react";

export const EnhancerApp = () => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleEnhance = useCallback(async () => {
    if (isEnhancing) return;

    try {
      setIsEnhancing(true);
      console.log("🚀 Enhancement started");

      // Simulate enhancement process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("✅ Enhancement completed");
    } catch (error) {
      console.error("❌ Enhancement failed:", error);
    } finally {
      setIsEnhancing(false);
    }
  }, [isEnhancing]);

  return (
    <>
      {isEnhancing ? (
        <LoadingSpinner />
      ) : (
        <button
          type="button"
          onClick={handleEnhance}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          disabled={isEnhancing}
          className="flex items-center justify-center w-9 h-9 ml-1 rounded-full border border-white/10 bg-transparent text-current transition-all duration-200 hover:bg-white/10 hover:opacity-80 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          title={isEnhancing ? "Enhancing..." : "Enhance Prompt"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 1024 1024"
            className={`transition-transform duration-200 ${
              isEnhancing
                ? "animate-pulse"
                : isHovered
                ? "scale-110"
                : "scale-100"
            }`}
            style={{
              animation: isEnhancing
                ? "pulse 1s ease-in-out infinite"
                : undefined,
            }}
          >
            <title>{isEnhancing ? "Enhancing..." : "Enhance"}</title>
            <path
              fill="currentColor"
              d="M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7M378.2 732.5l60.3-241H281.1l189.6-327.4h224.6L487 427.4h211z"
            />
          </svg>
        </button>
      )}
    </>
  );
};
