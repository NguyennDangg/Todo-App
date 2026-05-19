import "./Footer.scss";
import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="footer-line"></div>

      <div className="footer-content">
        <p className="footer-copy">
          © 2026 <span>NGUYEN HAI DANG</span>
        </p>
        <p className="footer-built">BUILT WITH REACT & MIO ENERGY</p>
      </div>

      <motion.div
        className="footer-credits"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <span>CREDITS</span>
        <div className="credits-list">
          <a
            href="https://x.com/sumutemu_"
            target="_blank"
            rel="noopener noreferrer"
          >
            ART BY @sumutemu_ — Haimiya Senpai is Scary and Cute
          </a>
        </div>
      </motion.div>
    </motion.footer>
  );
}

export default Footer;
