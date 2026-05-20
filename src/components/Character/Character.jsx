import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Character.scss";

const expressions = {
  idle: "/assets/mio-idle.png",
  heh: "/assets/mio-heh.png",
  yaho: "/assets/mio-yaho.png",
};

const mioLines = [
  "Don't forget to finish your tasks...",
  "You have been staring at the screen for too long.",
  "Add a task. Now.",
  "I'm not here to motivate you. Just do it.",
  "Tick something off already.",
  "...",
  "Are you procrastinating again.",
  "Focus.",
];

function MioCharacter({ taskAdded }) {
  const [expression, setExpression] = useState("idle");
  const [line, setLine] = useState(mioLines[0]);

  // cycle random line every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const random = mioLines[Math.floor(Math.random() * mioLines.length)];
      setLine(random);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // react to task added
  useEffect(() => {
    if (taskAdded) {
      setExpression("yaho");
      setLine("Task added. Good.");
      setTimeout(() => {
        setExpression("idle");
        setLine(mioLines[Math.floor(Math.random() * mioLines.length)]);
      }, 1500);
    }
  }, [taskAdded]);

  return (
    <div className="mio-wrapper">
      {/* speech bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={line}
          className="mio-bubble"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.4 }}
        >
          {line}
        </motion.div>
      </AnimatePresence>

      <div className="mio-float-container">
        <AnimatePresence mode="wait">
          <motion.img
            key={expression}
            src={expressions[expression]}
            alt="Haimiya Mio"
            className="mio-image"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => {
              setExpression("heh");
              setLine("Why are you hovering over me.");
            }}
            onMouseLeave={() => {
              setExpression("idle");
              setLine(mioLines[Math.floor(Math.random() * mioLines.length)]);
            }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MioCharacter;