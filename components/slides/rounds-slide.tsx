"use client";

import { Card } from "@/components/ui/card";
import { roundMessages } from "@/lib/const/rounds";
import { textStyles } from "@/lib/const/slideStyles";
import { Round } from "@/lib/types";
import { pR, stringToBlobUrl } from "@/lib/utils";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { grid } from "./assets/grid";

interface RoundsSlideProps {
  address: string;
  rounds: Round[];
  className?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const RankBadge = ({ rank }: { rank: number }) => {
  const colors = {
    1: { border: "border-yellow-600", text: "text-yellow-700" },
    2: { border: "border-gray-500", text: "text-gray-700" },
    3: { border: "border-amber-800", text: "text-amber-800" },
  };

  const style = colors[rank as keyof typeof colors];

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: (rank - 1) * 0.2,
      }}
      className="relative hidden sm:flex w-14 h-14 rounded-full items-center justify-center bg-white"
    >
      <div className="absolute w-full h-full rounded-full border-4 border-white"></div>

      <div
        className={`absolute w-12 h-12 rounded-full border-2 ${style.border} flex items-center justify-center bg-white`}
      >
        <Star className={`w-6 h-6 ${style.text}`} strokeWidth={2} />
      </div>

      <div
        className={`mb-0.5 absolute bottom-0.5 text-xs font-bold ${style.text}`}
      >
        {rank}
      </div>
    </motion.div>
  );
};

export function RoundsSlide({ address, rounds, className }: RoundsSlideProps) {
  const rand1 = pR(address, "RoundsSlide-0", roundMessages.length);
  const rand2 = pR(address, "RoundsSlide-1", roundMessages.length);

  const heading = roundMessages[rand1].heading;
  const subtext = roundMessages[rand2].subtext;

  const textRnd = pR(address, "RoundsSlide-0", textStyles.length);
  const textStyle = textStyles[textRnd];

  return (
    <Card
      className={`${className} flex items-center justify-center p-4 sm:p-6`}
      style={{
        backgroundImage: `url(${stringToBlobUrl(grid)})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-xl">
        <motion.div
          className="text-center space-y-2 mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl sm:text-3xl font-bold tracking-tight">
            {heading}
          </h2>
          <p className={`text-sm sm:text-base ${textStyle}`}>{subtext}</p>
        </motion.div>
        <motion.div
          className="grid gap-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {rounds.slice(0, 3).map((round, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white/10 rounded-xl p-3 sm:p-6 transition-colors hover:bg-white/20"
            >
              <div className="flex items-center gap-4">
                <RankBadge rank={index + 1} />
                <div className="flex-1">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="text-base sm:text-lg font-semibold truncate">
                      {round.name.length > (window.innerWidth < 540 ? 30 : 40)
                        ? round.name.slice(
                            0,
                            window.innerWidth < 540 ? 30 : 40,
                          ) + "..."
                        : round.name}
                    </h3>
                    <div className="text-xl hidden sm:block font-bold shrink-0">
                      ${round.totalAmount.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className={`text-sm ${textStyle}`}>
                      {round.projectsCount} projects supported
                    </div>
                    <div className="text-sm sm:hidden font-bold shrink-0">
                      ${round.totalAmount.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Card>
  );
}
