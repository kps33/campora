"use client";

import { motion, type Variants, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type AnimationType =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown";

type ByType = "character" | "word" | "line" | "text";

interface TextAnimateProps extends Omit<HTMLMotionProps<"span">, "children"> {
  children: string;
  type?: AnimationType;
  by?: ByType;
  delay?: number;
  duration?: number;
  className?: string;
  segmentClassName?: string;
  as?: React.ElementType;
}

const animations: Record<AnimationType, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  blurInUp: {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  blurInDown: {
    hidden: { opacity: 0, filter: "blur(10px)", y: -20 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  slideUp: {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  slideDown: {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  slideLeft: {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  slideRight: {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  scaleUp: {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
  scaleDown: {
    hidden: { scale: 1.5, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
};

const staggerTimings: Record<ByType, number> = {
  character: 0.03,
  word: 0.05,
  line: 0.1,
  text: 0.2,
};

export function TextAnimate({
  children,
  type = "fadeInUp",
  by = "word",
  delay = 0,
  duration = 0.3,
  className,
  segmentClassName,
  ...props
}: TextAnimateProps) {
  const segments =
    by === "line"
      ? children.split("\n")
      : by === "word"
        ? children.split(/(\s+)/)
        : by === "character"
          ? children.split("")
          : [children];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerTimings[by],
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("inline-flex flex-wrap", className)}
      {...props}
    >
      {segments.map((segment, i) => (
        <motion.span
          key={`${by}-${i}`}
          variants={animations[type]}
          transition={{ duration }}
          className={cn(
            by === "line" ? "block" : "inline-block",
            segment === " " ? "w-[0.25em]" : "",
            segmentClassName
          )}
        >
          {segment === " " ? "\u00A0" : segment}
        </motion.span>
      ))}
    </motion.span>
  );
}
