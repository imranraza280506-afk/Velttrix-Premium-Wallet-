/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [hoverType, setHoverType] = useState<"default" | "hover" | "drag">("default");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth out coordinate tracking
  const springConfig = { damping: 25, stiffness: 250 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Dynamic hover listeners for links, buttons, and custom triggers
    const updateCursorStyle = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const clickable = target.closest("button, a, [role='button'], input, select");
      const is3DStage = target.closest("#wallet-3d-canvas");

      if (is3DStage) {
        setHoverType("drag");
      } else if (clickable) {
        setHoverType("hover");
      } else {
        setHoverType("default");
      }
    };

    window.addEventListener("mouseover", updateCursorStyle);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", updateCursorStyle);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-bronze-400 pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hoverType === "hover" ? 48 : hoverType === "drag" ? 64 : 32,
          height: hoverType === "hover" ? 48 : hoverType === "drag" ? 64 : 32,
          backgroundColor:
            hoverType === "hover"
              ? "rgba(197, 155, 123, 0.2)"
              : hoverType === "drag"
                ? "rgba(197, 155, 123, 0.1)"
                : "rgba(0,0,0,0)",
          borderColor: hoverType === "drag" ? "#edd7c4" : "#c59b7b",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      >
        {hoverType === "drag" && (
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] text-bronze-200 tracking-wider font-semibold uppercase animate-pulse">
            Drag
          </span>
        )}
      </motion.div>

      {/* Inner solid dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-bronze-400 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hoverType === "hover" ? 0.3 : hoverType === "drag" ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      />
    </>
  );
}
