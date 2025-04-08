"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

const content = [
  {
    title: "ABOUT ME",
    description:
      " I love big problems that seem  unsolvable, or goals that seem impossible.  My background is AI, Computer Vision, and  Biomedical Imaging. I completed my PhD  and MSc at the University of Birmingham, and graduated top of class for BSc in AI  and Computer Science. I love AI, but I  couldn’t see past the cliff edge of  automation I felt would impact people  in the journey towards it, and  so set up the School of Code to help  people gain the confidence, capability,  and community to help them thrive  in the future. My aim is to push technology forwards to benefit everyone.",
  },
  {
    title: "I BUILD",
    description:
      "I transform complex AI concepts into practical, accessible solutions for organizations of all sizes. With extensive experience spanning both public and private sectors, I specialize in developing custom AI implementations that deliver measurable results. My approach focuses on creating systems that solve real business problems while prioritizing ethical considerations and long-term sustainability. From proof-of-concept to enterprise-wide deployment, I guide teams through the entire AI development journey. \"Chris didn't just build us an AI solution—he built our understanding of what's possible.\" — [Client testimonial placeholder]",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,#06b6d4,#10b981)] text-white rounded-xl overflow-hidden">
        <div className="text-2xl font-bold tracking-tight">Bob the builder</div>
      </div>
    ),
  },
  {
    title: "I TRAIN",
    description:
      "As founder of School of Code, I've helped hundreds of individuals transform their careers through accessible, hands-on technology education. My training programs demystify AI concepts and equip teams with the skills to implement and maintain AI systems independently. Whether you're looking to upskill your development team or help leadership understand AI strategy, I deliver customized training that translates complex concepts into actionable knowledge. \"Chris's training approach bridges the gap between theoretical understanding and practical application—exactly what our team needed.\" — [Training participant placeholder]",

    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,#ec4899,#6366f1)] text-white rounded-xl overflow-hidden">
        <div className="text-2xl font-bold tracking-tight">
          Gotta train em all
        </div>
      </div>
    ),
  },
  {
    title: "I SPEAK ",
    description:
      'I translate the complexities of artificial intelligence into compelling, jargon-free presentations for audiences at all levels of technical understanding. From industry conferences to executive boardrooms, I deliver talks that inspire action and practical understanding. My presentations combine technical depth with real-world context, helping audiences grasp both the possibilities and limitations of current AI technologies while preparing for future developments. "Chris\'s ability to make advanced AI concepts understandable while keeping the audience engaged is remarkable." — [Event organizer placeholder]',

    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,#f97316,#eab308)] text-white rounded-xl overflow-hidden">
        <div className="text-2xl font-bold tracking-tight">Expert Waffler</div>
      </div>
    ),
  },
  {
    title: "I TEACH AI",
    description:
      "Beyond training professionals, I'm passionate about expanding access to AI education across diverse communities. Through School of Code and other initiatives, I've developed innovative teaching methodologies that make AI concepts approachable for learners from all backgrounds. My teaching philosophy centers on practical application, ethical considerations, and building the confidence to experiment with emerging technologies. I believe AI literacy is becoming essential for future careers across all sectors. \"Chris's teaching doesn't just cover how AI works—it inspires students to think critically about how it should work.\" — [Education partner placeholder]",

    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,#f97316,#eab308)] text-white rounded-xl overflow-hidden">
        <h1 className="text-2xl font-bold tracking-tight text-center">
          For money
        </h1>
      </div>
    ),
  },
];

export function StickyScrollRevealDemo({ onCardChange }) {
  return (
    <div className="w-full min-h-screen scrollbar-hide">
      <StickyScroll content={content} onCardChange={onCardChange} />
    </div>
  );
}
