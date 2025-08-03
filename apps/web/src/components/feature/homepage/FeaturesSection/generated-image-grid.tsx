import Image from 'next/image';

import generatedImgExample1 from '@/assets/genretated-img-example-1.png';
import generatedImgExample2 from '@/assets/genretated-img-example-2.png';
import generatedImgExample3 from '@/assets/genretated-img-example-3.png';
import generatedImgExample4 from '@/assets/genretated-img-example-4.png';
import generatedImgExample5 from '@/assets/genretated-img-example-5.png';

export const GeneratedImageGrid = () => {
  return (
    <div className="flex w-full max-w-[1309px] flex-col items-center gap-16 lg:gap-[124px]">
      <div className="flex w-full max-w-[833px] flex-col items-center gap-5 lg:gap-7">
        <h2 className="section-title">Images like never seen before</h2>

        <p className="section-subtitle">
          Discover endless creativity with PromptVerse. Generate diverse content
          effortlessly using prompts. Stay updated with real-time trends,
          automate tasks, and extract insights from any document or URL. All
          within a sleek, futuristic design. Create more, effortlessly.
        </p>
      </div>

      <div className="mx-auto w-full max-w-7xl rounded-lg bg-zinc-900 p-8 ">
        <div className="grid h-[500px] grid-cols-3 gap-4">
          {/* Large image on the left spanning 2 rows */}
          <div className="row-span-2 overflow-hidden rounded-lg bg-black">
            <Image
              src={generatedImgExample1}
              alt="Generated example 1"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Top right image */}
          <div className="overflow-hidden rounded-lg bg-black">
            <Image
              src={generatedImgExample2}
              alt="Generated example 2"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Top far right image */}
          <div className="overflow-hidden rounded-lg bg-black">
            <Image
              src={generatedImgExample3}
              alt="Generated example 3"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Bottom right image */}
          <div className="overflow-hidden rounded-lg bg-black">
            <Image
              src={generatedImgExample4}
              alt="Generated example 4"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Bottom far right image */}
          <div className="overflow-hidden rounded-lg bg-black">
            <Image
              src={generatedImgExample5}
              alt="Generated example 5"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
