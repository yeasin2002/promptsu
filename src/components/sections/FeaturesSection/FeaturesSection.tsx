import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlayIcon, WandIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export const FeaturesSection = () => {
  const featureCards = [
    {
      title: "Write mails and replies",
      description:
        "Generate professional emails and responses with AI assistance. Create compelling content that engages your audience and drives results.",
    },
    {
      title: "Read pdf and attachments",
      description:
        "Extract insights and information from documents, PDFs, and attachments. Process complex data with intelligent analysis.",
    },
    {
      title: "Scans Images",
      description:
        "Analyze and extract text, objects, and insights from images. Transform visual content into actionable information.",
    },
    {
      title: "Write codes & programs",
      description:
        "Generate clean, efficient code in multiple programming languages. Build applications with AI-powered development assistance.",
    },
    {
      title: "Research",
      description:
        "Conduct comprehensive research on any topic. Gather, analyze, and synthesize information from multiple sources.",
    },
    {
      title: "Automation",
      description:
        "Automate repetitive tasks and workflows. Streamline your processes with intelligent automation solutions.",
    },
  ];

  const voiceFeatures = [
    "Train voice models",
    "Text-to-speech",
    "AI voice generation",
    "AI music production",
    "AI Composition",
  ];

  return (
    <section className="flex flex-col items-center w-full gap-16 lg:gap-[244px] py-8 lg:py-16 px-4 lg:px-0">
      {/* Trending Prompts Section */}
      <div className="flex flex-col items-center gap-16 lg:gap-[124px] w-full max-w-[1309px]">
        <div className="flex flex-col w-full max-w-[833px] items-center gap-5 lg:gap-7">
          <h2 className="section-title">See Trending Prompts</h2>

          <p className="section-subtitle">
            Discover endless creativity with PromptVerse. Generate diverse
            content effortlessly using prompts. Stay updated with real-time
            trends, automate tasks, and extract insights from any document or
            URL. All within a sleek, futuristic design. Create more,
            effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-7">
            <Button
              variant="outline"
              className="gap-2 border-[1.4px] border-solid border-white px-6 lg:px-[34px] py-3 lg:py-3.5 rounded-[55px] h-auto hover:bg-white hover:text-black transition-colors duration-300"
            >
              <span className="font-poppins font-medium text-white hover:text-black text-sm lg:text-base text-center tracking-[0] leading-[normal]">
                Start Generating
              </span>
              <WandIcon className="w-5 h-5 lg:w-6 lg:h-6" />
            </Button>

            <Button className="bg-white hover:bg-gray-100 px-6 lg:px-[34px] py-3 lg:py-3.5 rounded-[55px] h-auto transition-colors duration-300">
              <span className="font-poppins font-medium text-black text-sm lg:text-base text-center tracking-[0] leading-[normal]">
                Download
              </span>
            </Button>
          </div>
        </div>

        <div className="w-full max-w-[1309px]">
          <Image
            width={1200}
            height={1200}
            className="w-full h-auto rounded-lg"
            alt="AI Dashboard Interface"
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop&crop=center"
          />
        </div>
      </div>

      {/* Images Section */}
      <div className="flex flex-col items-center gap-16 lg:gap-[124px] w-full max-w-[1309px]">
        <div className="flex flex-col w-full max-w-[833px] items-center gap-5 lg:gap-7">
          <h2 className="section-title">Images like never seen before</h2>

          <p className="section-subtitle">
            Discover endless creativity with PromptVerse. Generate diverse
            content effortlessly using prompts. Stay updated with real-time
            trends, automate tasks, and extract insights from any document or
            URL. All within a sleek, futuristic design. Create more,
            effortlessly.
          </p>
        </div>

        <Card className="w-full max-w-[1308.78px] bg-[#0d0d0d] border-gray-800 rounded-lg p-6 lg:p-[43.63px]">
          <CardContent className="p-0">
            <div className="flex flex-col w-full">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-[18.18px] w-full">
                <div className="flex-1 rounded-lg overflow-hidden relative">
                  <AspectRatio ratio={16 / 9} className="w-full">
                    <Image
                      width={1200}
                      height={1200}
                      src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center"
                      alt="AI Generated Art"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center">
                      <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30">
                        <span className="text-sm">Generate Similar</span>
                        <WandIcon className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </AspectRatio>
                </div>

                <div className="flex-1 flex flex-col gap-4 lg:gap-[18.18px]">
                  <div className="flex gap-4 lg:gap-[18.18px] w-full">
                    <AspectRatio
                      ratio={1 / 1}
                      className="w-1/2 rounded-lg overflow-hidden"
                    >
                      <Image
                        width={1200}
                        height={1200}
                        src="https://images.unsplash.com/photo-1686191128892-3b4e0e4b8b3b?w=400&h=400&fit=crop&crop=center"
                        alt="AI Art 1"
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    <AspectRatio
                      ratio={1 / 1}
                      className="w-1/2 rounded-lg overflow-hidden"
                    >
                      <Image
                        width={1200}
                        height={1200}
                        src="https://images.unsplash.com/photo-1686191128892-3b4e0e4b8b3b?w=400&h=400&fit=crop&crop=center"
                        alt="AI Art 2"
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                  <div className="flex gap-4 lg:gap-[18.18px] w-full">
                    <AspectRatio
                      ratio={1 / 1}
                      className="w-1/2 rounded-lg overflow-hidden"
                    >
                      <Image
                        width={1200}
                        height={1200}
                        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop&crop=center"
                        alt="AI Art 3"
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    <AspectRatio
                      ratio={1 / 1}
                      className="w-1/2 rounded-lg overflow-hidden"
                    >
                      <Image
                        width={1200}
                        height={1200}
                        src="https://images.unsplash.com/photo-1686191128892-3b4e0e4b8b3b?w=400&h=400&fit=crop&crop=center"
                        alt="AI Art 4"
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audio and Music Section */}
      <div className="flex flex-col items-center gap-16 lg:gap-[124px] w-full max-w-[1309px]">
        <div className="flex flex-col w-full max-w-[794.82px] items-center gap-5 lg:gap-7">
          <h2 className="section-title">Generate audio and music</h2>

          <p className="section-subtitle">
            Discover endless creativity with PromptVerse. Generate diverse
            content effortlessly using prompts. Stay updated with real-time
            trends, automate tasks, and extract insights from any document or
            URL. All within a sleek, futuristic design. Create more,
            effortlessly.
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
                    Generate Conversational, Long-form or Short-form Voice
                    Content With Consistent Quality and Performances.
                    <br />
                    <br />
                    Secure and Private Voice Generations with Full Commercial
                    and Copyrights
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

              <div className="w-full lg:w-[586.34px] h-64 lg:h-[586.34px] rounded-lg overflow-hidden relative">
                <Image
                  width={1200}
                  height={1200}
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop&crop=center"
                  alt="Audio Waveform Visualization"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 rounded-full p-4">
                    <PlayIcon className="w-8 h-8 lg:w-12 lg:h-12" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* More Features Section */}
      <div className="flex flex-col w-full max-w-[1309px] items-center justify-center gap-8 lg:gap-7">
        <div className="flex w-full">
          <h2 className="flex-1 font-manrope font-medium text-3xl lg:text-[64px] tracking-[-1.16px] leading-tight lg:leading-[64px]">
            <span className="text-[#ffffff80] tracking-[-0.75px] leading-tight lg:leading-[86.4px]">
              More features
            </span>
            <span className="text-white tracking-[-0.75px] leading-tight lg:leading-[86.4px] block">
              Promptverse AI{" "}
            </span>
            <span className="text-[#ffffff80] tracking-[-0.75px] leading-tight lg:leading-[86.4px]">
              offers to an individual{" "}
            </span>
          </h2>
        </div>

        <div className="w-full border-t border-[#e0e0e0] pt-8 lg:pt-[61px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[60px] w-full max-w-[1309px]">
            {featureCards.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 lg:gap-[15px] w-full"
              >
                <h3 className="font-manrope font-semibold text-white text-lg lg:text-xl tracking-[-0.80px] leading-7 lg:leading-8">
                  {feature.title}
                </h3>
                <p className="font-manrope font-medium text-[#828282] text-sm lg:text-base tracking-[-0.80px] leading-6 lg:leading-[28.8px]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <Card className="w-full max-w-[1308px] min-h-[300px] lg:h-[474px] bg-[#0d0d0d] border-gray-800 rounded-lg lg:rounded-[19px] overflow-hidden">
        <CardContent className="flex items-center justify-center h-full p-6 lg:p-0 relative">
          {/* Background decorations */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>

          {/* Floating elements */}
          <div className="absolute top-4 right-4 w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-60"></div>
          <div className="absolute bottom-8 left-8 w-6 h-6 lg:w-10 lg:h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-40"></div>
          <div className="absolute top-1/3 left-4 w-4 h-4 lg:w-6 lg:h-6 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-50"></div>

          <div className="flex flex-col items-center gap-8 lg:gap-[58px] z-10 text-center">
            <h2 className="w-full max-w-[984.72px] font-manrope font-semibold text-white text-2xl lg:text-5xl text-center tracking-[-0.48px] leading-tight lg:leading-[74px]">
              Promptverse has no limitation. <br />
              Get Started in a journey with promptverse.
            </h2>

            <Button className="bg-white hover:bg-gray-100 px-6 lg:px-[34px] py-3 lg:py-3.5 rounded-[55px] h-auto transition-colors duration-300">
              <span className="font-poppins font-medium text-black text-sm lg:text-base text-center tracking-[0] leading-[normal]">
                Create an Account
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
