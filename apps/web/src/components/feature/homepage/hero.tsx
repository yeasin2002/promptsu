"use client";

import { TextGenerateEffect } from "@/components/text-generate-effect";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Command } from "lucide-react";
import { motion } from "motion/react";

import videoConference from "@/assets/video-conference-dashboard.png";
import Image from "next/image";
import Link from "next/link";

interface Props extends React.ComponentProps<"div"> {}

export const Hero = ({ ...props }: Props) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative container px-4 pt-40 pb-20"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[#0a0a0a]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-block mb-4 px-4 py-1.5 rounded-full glass"
      >
        <span className="text-sm font-medium">
          <Command className="w-4 h-4 inline-block mr-2" />
          Next-generation video conferencing platform
        </span>
      </motion.div>

      <div className="max-w-4xl relative z-10">
        <h1 className="text-5xl md:text-7xl font-normal mb-4 tracking-tight text-left">
          <span className="text-gray-200">
            <TextGenerateEffect words="Connect & collaborate" />
          </span>
          <br />
          <span className="text-white font-medium">
            <TextGenerateEffect words="anywhere, anytime" />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl text-left"
        >
          Experience crystal-clear video meetings with AI-powered features,
          seamless collaboration tools, and enterprise-grade security.{" "}
          <span className="text-white">Start meeting in seconds.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex  gap-4 items-start"
        >
          <Link href={"/signup"} className={buttonVariants({ size: "lg" })}>
            create new rooms
          </Link>
          <Link
            href={"/rooms"}
            className={buttonVariants({
              size: "lg",
              variant: "outline",
              className: "text-white !rounded-full",
            })}
          >
            Join a room
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative mx-auto max-w-5xl mt-20"
      >
        <div className="glass rounded-xl overflow-hidden">
          <Image
            src={videoConference}
            alt="VideoMeet Platform Interface"
            className="w-full h-auto"
          />
        </div>
      </motion.div>
    </motion.section>
  );
};
