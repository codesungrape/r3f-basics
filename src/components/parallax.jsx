"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

""
const content = [
    {
      title: "I BUILD",
      description:
"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sapiente quas accusamus velit unde perferendis, veniam laudantium consequatur possimus. Iusto omnis eum labore ea corrupti nulla dolor voluptatem tempore modi!",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,#06b6d4,#10b981)] text-white rounded-xl overflow-hidden">
          <div className="text-2xl font-bold tracking-tight">Bob the builder</div>
        </div>
      ),
    },
    {
      title: "I TRAIN",
      description:
"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sapiente quas accusamus velit unde perferendis, veniam laudantium consequatur possimus. Iusto omnis eum labore ea corrupti nulla dolor voluptatem tempore modi!",

      content: (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,#ec4899,#6366f1)] text-white rounded-xl overflow-hidden">
          <div className="text-2xl font-bold tracking-tight">Gotta train em all</div>

        </div>
      ),
    },
    {
      title: "I SPEAK ",
      description:
"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sapiente quas accusamus velit unde perferendis, veniam laudantium consequatur possimus. Iusto omnis eum labore ea corrupti nulla dolor voluptatem tempore modi!",

      content: (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,#f97316,#eab308)] text-white rounded-xl overflow-hidden">
          <div className="text-2xl font-bold tracking-tight">Expert Waffler</div>
        </div>
      ),
    },
        {
        title: "I TEACH AI",
        description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sapiente quas accusamus velit unde perferendis, veniam laudantium consequatur possimus. Iusto omnis eum labore ea corrupti nulla dolor voluptatem tempore modi!",

        content: (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,#f97316,#eab308)] text-white rounded-xl overflow-hidden">


                <h1 className="text-2xl font-bold tracking-tight text-center">For money</h1>

            </div>
        ),
        },
        {
            title: "ABOUT ME",
            description:
" I love big problems that seem  unsolvable, or goals that seem impossible.  My background is AI, Computer Vision, and  Biomedical Imaging. I completed my PhD  and MSc at the University of Birmingham, and graduated top of class for BSc in AI  and Computer Science. I love AI, but I  couldn’t see past the cliff edge of  automation I felt would impact people  in the journey towards it, and  so set up the School of Code to help  people gain the confidence, capability,  and community to help them thrive  in the future. My aim is to push technology forwards to benefit everyone."
        }

  ];
  
export function StickyScrollRevealDemo({ onCardChange }) {
  return (
    <div className="w-full min-h-screen scrollbar-hide">
      <StickyScroll content={content} onCardChange={onCardChange} />
    </div>
  );
}