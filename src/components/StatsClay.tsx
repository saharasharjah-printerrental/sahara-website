"use client";

import { motion } from "framer-motion";
import { LayersIcon, PeopleIcon, FavoriteIcon, ComputerIcon } from "@/components/icons/index";
import type { SvgIconComponent } from "@/components/icons";
import CountUp from "./CountUp";

const parseNumericValue = (value: string) => {
  const match = value.match(/^(\d+)(.*)/);
  if (match) {
    return { number: parseInt(match[1]), suffix: match[2] };
  }
  return { number: 0, suffix: value };
};

interface Stat {
  value: string;
  label: string;
  icon?: any;
}

interface StatsClayProps {
  stats?: Stat[];
  title?: string;
  subtitle?: string;
}

const StatsClay = ({
  stats = [
    { value: "13+", label: "Years Active", icon: LayersIcon },
    { value: "1500+", label: "Happy Clients", icon: PeopleIcon },
    { value: "50k+", label: "Parts Fixed", icon: FavoriteIcon },
    { value: "24/7", label: "Support", icon: ComputerIcon },
  ],
  title = "Built for Scale, Designed for Craft",
  subtitle = "The numbers behind Sahara's growing ecosystem of premium office equipment solutions.",
}: StatsClayProps) => {
  const cardBg = "#0f1c2e";
  const innerBg = "#071325";
  const accentColor = "#f5be53";

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  return (
    <div
      className="relative w-full py-20 px-4 overflow-hidden"
      style={{ backgroundColor: innerBg }}
    >
      <motion.div
        className="absolute top-10 right-10 w-2 h-2 rounded-full"
        style={{ backgroundColor: accentColor }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-6xl w-full mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase mb-5"
            style={{
              backgroundColor: cardBg,
              color: accentColor,
              boxShadow: `3px 3px 6px rgba(0,0,0,0.4), -1px -1px 3px rgba(255,255,255,0.05)`,
            }}
          >
            Our Stats
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-[#d3c5b0] max-w-xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const { number, suffix } = parseNumericValue(stat.value);

            return (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  boxShadow: `12px 12px 24px rgba(0,0,0,0.5), -4px -4px 12px rgba(255,255,255,0.03)`,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                className="group rounded-[2rem] flex flex-col items-center justify-center p-8 text-center cursor-default"
                style={{
                  backgroundColor: cardBg,
                  boxShadow: `8px 8px 16px rgba(0,0,0,0.4), -2px -2px 8px rgba(255,255,255,0.03)`,
                }}
              >
                {Icon && (
                  <motion.div
                    className="mb-5 w-14 h-14 rounded-full flex items-center justify-center transition-shadow duration-300"
                    style={{
                      backgroundColor: cardBg,
                      boxShadow: `inset 4px 4px 8px rgba(0,0,0,0.4), inset -2px -2px 6px rgba(255,255,255,0.03)`,
                    }}
                    whileHover={{
                      boxShadow: `inset 4px 4px 8px rgba(0,0,0,0.4), inset -2px -2px 6px rgba(255,255,255,0.03), 0 0 20px ${accentColor}33`,
                    }}
                  >
                    <Icon
                      sx={{ fontSize: 24 }}
                      style={{ color: accentColor }}
                    />
                  </motion.div>
                )}

                <div
                  className="text-4xl md:text-5xl font-bold mb-2"
                  style={{ color: accentColor }}
                >
                  <CountUp to={number} duration={2} separator="," />
                  {suffix}
                </div>

                <div className="text-sm font-medium text-[#8a8a8a]">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsClay;
