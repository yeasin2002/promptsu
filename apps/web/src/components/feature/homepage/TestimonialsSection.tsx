'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@workspace/ui/shadcn/avatar';
import { Card } from '@workspace/ui/shadcn/card';
import { motion } from 'motion/react';

const testimonials = [
  {
    name: 'Michael Chen',
    role: 'VP of Engineering, Microsoft',
    image: 'https://avatars.githubusercontent.com/u/1234567?v=4',
    content:
      'VideoMeet has revolutionized our remote collaboration. The AI-powered meeting notes and seamless integration have boosted our team productivity by 40%.',
  },
  {
    name: 'Sarah Johnson',
    role: 'Head of Remote Work, Spotify',
    image: 'https://avatars.githubusercontent.com/u/2345678?v=4',
    content:
      'The crystal-clear video quality and advanced collaboration tools have made our distributed team feel more connected than ever. A game-changer for modern work.',
  },
  {
    name: 'David Wilson',
    role: 'CTO, TechStart Inc',
    image: 'https://avatars.githubusercontent.com/u/3456789?v=4',
    content:
      'The enterprise-grade security and reliability we needed. VideoMeet handles our sensitive client meetings with confidence and never lets us down.',
  },
  {
    name: 'Emily Zhang',
    role: 'Product Manager, Google',
    image: 'https://avatars.githubusercontent.com/u/4567890?v=4',
    content:
      "The AI meeting assistant is incredible - it automatically extracts action items and creates perfect meeting summaries. It's like having a personal assistant for every meeting.",
  },
  {
    name: 'James Rodriguez',
    role: 'Head of Security, Meta',
    image: 'https://avatars.githubusercontent.com/u/5678901?v=4',
    content:
      "VideoMeet's end-to-end encryption and security controls exceed our strict standards. We trust it with our most confidential discussions.",
  },
  {
    name: 'Lisa Thompson',
    role: 'Operations Director, Netflix',
    image: 'https://avatars.githubusercontent.com/u/6789012?v=4',
    content:
      'The scalability is outstanding - from 5-person scrums to 500-person all-hands, VideoMeet delivers flawless performance every time.',
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="overflow-hidden py-20 ">
      <div className="container px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="mb-4 font-normal text-5xl">Trusted by</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of people who rely on us
          </p>
        </motion.div>

        <div className="relative flex flex-col antialiased">
          <div className="relative flex overflow-hidden py-4">
            <div className="flex min-w-full shrink-0 animate-marquee items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  className="/40 w-[400px] shrink-0 border-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/10"
                  key={`${index}-1`}
                >
                  <div className="mb-6 flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white/90">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-white/60">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
            <div className="flex min-w-full shrink-0 animate-marquee items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  className="/40 w-[400px] shrink-0 border-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/10"
                  key={`${index}-2`}
                >
                  <div className="mb-6 flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white/90">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-white/60">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
