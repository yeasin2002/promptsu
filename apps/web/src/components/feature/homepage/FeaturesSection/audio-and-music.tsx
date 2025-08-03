import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import generateVideoExample from '@/assets/demo-generate-video-example.png';
import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
import { voiceFeatures } from '@/data';

export const AudioAndMusic = () => {
  return (
    <div className="flex flex-col items-center gap-16 lg:gap-[124px] w-full max-w-[1309px]">
      <div className="flex flex-col w-full max-w-[794.82px] items-center gap-5 lg:gap-7">
        <h2 className="section-title">Generate audio and music</h2>

        <p className="section-subtitle">
          Discover endless creativity with PromptVerse. Generate diverse content
          effortlessly using prompts. Stay updated with real-time trends,
          automate tasks, and extract insights from any document or URL. All
          within a sleek, futuristic design. Create more, effortlessly.
        </p>
      </div>

      <Card className="w-full max-w-[1309.04px] bg-[#0d0d0d] border-gray-800 rounded-lg p-6 lg:p-[43.63px]">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-[18.18px] w-full">
            <div className="flex-1 flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-6 lg:gap-[29.09px] w-full">
                <h3 className="w-full font-manrope font-medium text-white text-2xl lg:text-[36.4px] tracking-[-0.36px] leading-tight lg:leading-[50.0px]">
                  Enhance Your Projects with Ultra-Realistic AI Voices
                </h3>

                <p className="w-full font-manrope font-medium text-[#ffffff99] text-sm lg:text-lg tracking-[-0.18px] leading-6 lg:leading-[28.8px]">
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

              <div className="flex flex-wrap gap-4 lg:gap-[22.18px_18.18px] w-full">
                {voiceFeatures.map((feature, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="px-4 lg:px-[34px] py-2 lg:py-3.5 rounded-[35.45px] border border-white hover:bg-white hover:text-black transition-colors duration-300"
                  >
                    <span className="font-manrope font-medium text-white hover:text-black text-sm lg:text-[18.2px] tracking-[-0.18px] leading-[normal]">
                      {feature}
                    </span>
                  </Badge>
                ))}

                <Button className="bg-white hover:bg-gray-100 px-6 lg:px-[34px] py-3 lg:py-3.5 rounded-[55px] h-auto transition-colors duration-300">
                  <span className="font-poppins font-medium text-black text-sm lg:text-base text-center tracking-[0] leading-[normal]">
                    Generate now
                  </span>
                </Button>
              </div>
            </div>

            <div>
              <HeroVideoDialog
                className="w-full lg:w-[586.34px] h-64 lg:h-[586.34px] rounded-lg overflow-hidden relative"
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/tZdk58Bv0DA?si=qRIt4HX2Pn00J0-q"
                thumbnailSrc={generateVideoExample.src}
                thumbnailAlt="Audio Waveform Visualization"
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
