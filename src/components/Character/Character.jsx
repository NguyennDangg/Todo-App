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

const randomLine = () => mioLines[Math.floor(Math.random() * mioLines.length)];

function MioCharacter({ taskAdded }) {
  const [hovering, setHovering] = useState(false);
  const [line, setLine] = useState(mioLines[0]);

  // cycle random line every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLine(randomLine());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Derived during render — no effect needed. App resets `taskAdded`
  // after 1.5s, which returns Mio to her idle state automatically.
  const expression = taskAdded ? "yaho" : hovering ? "heh" : "idle";
  const displayLine = taskAdded ? "Task added. Good." : line;

  return (
    <div className="mio-wrapper">
      {/* speech bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={displayLine}
          className="mio-bubble"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.4 }}
        >
          {displayLine}
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
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => {
              setHovering(false);
              setLine(randomLine());
            }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MioCharacter;
