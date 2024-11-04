import React from "react";
import { motion } from "framer-motion";

const Marquee = ({ speed, from, to }) => {
  return (
    <div className="flex">
      <motion.div
        initial={{ x: from }}
        animate={{ x: to }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {"book your favourite movies, shows and concerts."
          .split(" ")
          .map((word, idx) => {
            return (
              <span
                key={idx}
                className="text-9xl mr-8 uppercase font-extrabold tracking-tight"
              >
                {word}
              </span>
            );
          })}
      </motion.div>

      <motion.div
        initial={{ x: from }}
        animate={{ x: to }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {"book your favourite movies, shows and concerts."
          .split(" ")
          .map((word, idx) => {
            return (
              <span
                key={idx}
                className="text-9xl mr-8 uppercase font-extrabold tracking-tight"
              >
                {word}
              </span>
            );
          })}
      </motion.div>
    </div>
  );
};

export default Marquee;
