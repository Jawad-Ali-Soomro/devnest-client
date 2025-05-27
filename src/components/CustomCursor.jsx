// CustomCursor.jsx
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState("default");

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const updateCursorType = (e) => {
      const tag = e.target.tagName.toLowerCase();
      if (e.target.getAttribute("data-cursor") === "move") {
        setCursorType("move");
      } else if (tag === "button" || e.target.classList.contains("cursor-pointer")) {
        setCursorType("pointer");
      } else if (tag === "input" || tag === "textarea" || e.target.classList.contains("cursor-text")) {
        setCursorType("text");
      } else {
        setCursorType("default");
      }
    };
    window.addEventListener("mouseover", updateCursorType);
    return () => window.removeEventListener("mouseover", updateCursorType);
  }, []);

  const getCursorStyle = () => {
    switch (cursorType) {
      case "pointer":
        return {
          backgroundColor: "transparent",
          border: "1px solid #80808090",
          
        };
      case "text":
        return {
          width: 1,
          height: 24,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        };
      case "move":
        return {
          backgroundColor: "rgba(255,255,255,1)",
          borderRadius: "4px",
          transform: "translate(-50%, -50%) rotate(45deg)",
          width: 23,
          height: 23,
        };
      default:
        return {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        };
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        width: 100,
        height: 100,
        borderRadius: "50%",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        transition: "all 0.3s linear",
        ...getCursorStyle(),
      }}
    />
  );
}
