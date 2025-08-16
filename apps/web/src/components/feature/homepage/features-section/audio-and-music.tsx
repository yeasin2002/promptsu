import { Badge } from "@workspace/ui/shadcn/badge";
import { Button } from "@workspace/ui/shadcn/button";
import { Card, CardContent } from "@workspace/ui/shadcn/card";

import generateVideoExample from "@/assets/demo-generate-video-example.png";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { voiceFeatures } from "@/data";

export const AudioAndMusic = () => {
  return (
    <div className="flex w-full max-w-[1309px] flex-col items-center gap-16 lg:gap-[124px]">
      <div className="flex w-full max-w-[794.82px] flex-col items-center gap-5 lg:gap-7">
        <h2 className="section-title">Generate audio and music</h2>

        <p className="section-subtitle">
          Discover endless creativity with PromptVerse. Generate diverse content
          effortlessly using prompts. Stay updated with real-time trends,
          automate tasks, and extract insights from any document or URL. All
          within a sleek, futuristic design. Create more, effortlessly.
        </p>
      </div>

      <Card className="w-full max-w-[1309.04px] rounded-lg border-gray-800 bg-[#0d0d0d] p-6 lg:p-[43.63px]">
        <CardContent className="p-0">
          <div className="flex w-full flex-col gap-6 lg:flex-row lg:gap-[18.18px]">
            <div className="flex flex-1 flex-col justify-between gap-8">
              <div className="flex w-full flex-col gap-6 lg:gap-[29.09px]">
                <h3 className="w-full font-manrope font-medium text-2xl text-white leading-tight tracking-[-0.36px] lg:text-[36.4px] lg:leading-[50.0px]">
                  Enhance Your Projects with Ultra-Realistic AI Voices
                </h3>

                <p className="w-full font-manrope font-medium text-[#ffffff99] text-sm leading-6 tracking-[-0.18px] lg:text-lg lg:leading-[28.8px]">
                  Create engaging voice content with unique AI Voices perfect
                  for your audience.
                  <br />
                  <br />
                  Generate Conversational, Long-form or Short-form Voice Content
                  With Consistent Quality and Performances.
                  <br />
                  <br />
                  Secure and Private Voice Generations with Full Commercial and
                  Copyrights
                </p>
              </div>

              <div className="flex w-full flex-wrap gap-4 lg:gap-[22.18px_18.18px]">
                {voiceFeatures.map((feature, index) => (
                  <Badge
                    className="rounded-[35.45px] border border-white px-4 py-2 transition-colors duration-300 hover:bg-white hover:text-black lg:px-[34px] lg:py-3.5"
                    key={index}
                    variant="outline"
                  >
                    <span className="font-manrope font-medium text-sm text-white leading-[normal] tracking-[-0.18px] hover:text-black lg:text-[18.2px]">
                      {feature}
                    </span>
                  </Badge>
                ))}

                <Button className="h-auto rounded-[55px] bg-white px-6 py-3 transition-colors duration-300 hover:bg-gray-100 lg:px-[34px] lg:py-3.5">
                  <span className="text-center font-medium font-poppins text-black text-sm leading-[normal] tracking-[0] lg:text-base">
                    Generate now
                  </span>
                </Button>
              </div>
            </div>

            <div>
              <HeroVideoDialog
                animationStyle="from-center"
                className="relative h-64 w-full overflow-hidden rounded-lg lg:h-[586.34px] lg:w-[586.34px]"
                thumbnailAlt="Audio Waveform Visualization"
                thumbnailSrc={generateVideoExample.src}
                videoSrc="https://www.youtube.com/embed/tZdk58Bv0DA?si=qRIt4HX2Pn00J0-q"
              />
            </div>

            {/* <div className="w-full lg:w-[586.34px] h-64 lg:h-[586.34px] rounded-lg overflow-hidden relative">
                <Image
                  width={1200}
                  height={1200}
                  src={generateVideoExample}
                  alt="Audio Waveform Visualization"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 rounded-full p-4">
                    <PlayIcon className="w-8 h-8 lg:w-12 lg:h-12" />
                  </Button>
                </div>
              </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
