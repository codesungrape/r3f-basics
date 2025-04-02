import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

// StickyScroll component
export const StickyScroll = ({
  content,
  contentClassName,
  onCardChange,
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const sectionRefs = useRef([]);
  const containerRef = useRef(null);


  useEffect(() => {
    if (!containerRef.current) return;

    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            if (index !== activeCard) {
              setActiveCard(index);
              if (onCardChange) {
                onCardChange(index);
              }
            }
          }
        });
      },
      { 
        threshold: 0.6,
        root: null 
      }
    );
    
    // Observe all section elementsxa
    sectionRefs.current.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

  }, [content.length, activeCard, onCardChange]);
  
  // Current gradient
  const gradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981) ",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
    "linear-gradient(to bottom right, #3b82f6, #14b8a6)",
  ];
  const currentGradient = gradients[activeCard % gradients.length];
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full flex min-h-screen "
    >
      {/* Content sections */}
      <div className="w-full ">
        {content.map((item, index) => (
          <section 
            key={`content-${index}`}
            ref={el => sectionRefs.current[index] = { current: el }}
            data-index={index}
            className="flex items-center justify-between snap-start snap-always"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: activeCard === index ? 1 : 0.3,
                y: activeCard === index ? 0 : 10
              }}
              transition={{ duration: 0.5 }}
              className="max-w-lg "
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                {item.title}
              </h2>
              <p className="text-xl text-slate-300">
                {item.description}
              </p>
            </motion.div>
          </section>
        ))}
      </div>

    </div>
  );
};