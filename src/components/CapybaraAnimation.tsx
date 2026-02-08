"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function CapybaraAnimation() {
    const [isSitting, setIsSitting] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        let isActive = true;

        const startAnimation = async () => {
            // Loop indefinitely as long as active
            while (isActive) {
                // Start from off-screen left (200px should be enough with left-0)
                await controls.set({ x: -250 });

                // Walk across the screen in segments
                const segments = 3;
                const totalDuration = 15; // Time to cross screen
                const segmentDuration = totalDuration / segments;
                const screenWidth = window.innerWidth;
                // Total distance = screen width + start offset (250) + end offset (150)
                const segmentDistance = (screenWidth + 400) / segments;

                for (let i = 0; i < segments; i++) {
                    if (!isActive) return;

                    // Walk animation
                    setIsSitting(false);
                    await controls.start({
                        x: -250 + segmentDistance * (i + 1),
                        transition: {
                            duration: segmentDuration,
                            ease: "linear",
                        },
                    });

                    // Random chance to sit, but not after the last segment (off-screen)
                    if (i < segments - 1 && Math.random() > 0.4) {
                        setIsSitting(true);
                        // Wait while sitting (looking at rose)
                        // Use a promise that resolves after timeout but checks active state
                        await new Promise((resolve) => setTimeout(resolve, 3000));
                    }
                }
            }
        };

        startAnimation();

        return () => {
            isActive = false;
            controls.stop();
        };
    }, [controls]);

    return (
        <motion.div
            className="fixed bottom-0 left-0 z-50 pointer-events-none"
            animate={controls}
            initial={{ x: -250 }}
        >
            <div className="relative w-24 h-24 md:w-32 md:h-32">
                <Image
                    src={isSitting ? "/capybara_sit.svg" : "/capybara_walk.svg"}
                    alt="Cute Capybara"
                    fill
                    className="object-contain"
                />
            </div>
        </motion.div>
    );
}
