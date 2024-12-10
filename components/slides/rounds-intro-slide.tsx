"use client";

import { Card } from "@/components/ui/card";
import { roundIntroMessages } from "@/lib/const/roundsIntro";
import { pR, stringToBlobUrl } from "@/lib/utils";
import { motion } from "framer-motion";
import { CircleDot } from "lucide-react";
import Pill from "../pill";
import { textStyles } from "@/lib/const/slideStyles";
import { grid } from "./assets/grid";

interface RoundsIntroSlideProps {
  address: string;
  roundsCount: number;
  className?: string;
}

export function RoundsIntroSlide({
  address,
  roundsCount,
  className,
}: RoundsIntroSlideProps) {
  const rand1 = pR(address, "RoundsIntroSlide-1", roundIntroMessages.length);
  const rand2 = pR(address, "RoundsIntroSlide-0", roundIntroMessages.length);

  const heading = roundIntroMessages[rand1].heading;
  const subtext = roundIntroMessages[rand2].subtext;

  const textRnd = pR(address, "RoundsIntroSlide-0", textStyles.length);
  const textStyle = textStyles[textRnd];

  const textRnd2 = pR(address, "RoundsIntroSlide-2", textStyles.length);
  const textStyle2 = textStyles[textRnd2];

  return (
    <Card
      className={`${className} flex items-center justify-center p-4 sm:p-6`}
      style={{
        backgroundImage: `url(${stringToBlobUrl(grid)})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-center space-y-8 px-4 max-w-xl">
        <div className="relative h-32">
          <motion.div
            initial={{ scale: 0, y: 50 }}
            animate={{
              scale: 1,
              y: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.5,
            }}
          >
            <CircleDot
              className={`w-20 h-20 mx-auto ${textStyle}`}
              strokeWidth={1}
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0.2 }}
            transition={{
              delay: 0.8,
              duration: 0.5,
            }}
          >
            <CircleDot className={`w-20 h-20 ${textStyle}`} strokeWidth={1} />
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <span className={`text-3xl sm:text-5xl font-bold ${textStyle}`}>
              {roundsCount}
            </span>
            <span className="text-xl sm:text-2xl font-medium ml-2">Rounds</span>
          </motion.div>

          <motion.p
            className="text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            {subtext}
          </motion.p>

          <motion.p
            className={`leading-relaxed ${textStyle2}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.5 }}
          >
            Let&apos;s explore your{" "}
            <Pill
              bgColor={`${textStyle
                .replace("text-", "")
                .replace(/[\[\]']+/g, "")}50`}
            >
              <span className="font-bold">
                Top {roundsCount >= 3 ? 3 : roundsCount}
              </span>
            </Pill>{" "}
            grant rounds!
          </motion.p>
        </div>
      </div>
    </Card>
  );
}
