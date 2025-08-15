import React, { useEffect, useState } from "react";

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 1000,
        background: "#ea580c",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: 48,
        height: 48,
        fontSize: 24,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        cursor: "pointer",
        transition: "background 0.2s"
      }}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;
