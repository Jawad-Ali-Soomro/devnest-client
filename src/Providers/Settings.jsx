import { CloudMoon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { TbContrast2 } from "react-icons/tb";
import { CgArrowsShrinkH } from "react-icons/cg";
import { GrPowerReset } from "react-icons/gr";
import { LuFullscreen } from "react-icons/lu";

const ThemeSettings = ({ isOpen }) => {
  const [isDark, setIsDark] = useState(false);
  const [isContrast, setIsContrast] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [colorSpan, setColor] = useState("#ec133f");
  const [selectedFont, setFont] = useState("font-signika");

  useEffect(() => {
    const fonts = ["font-nunito", "font-signika", "font-dm", "font-space"];
    fonts.forEach((f) => document.body.classList.remove(f));
    document.body.classList.add(selectedFont);
  }, [selectedFont]);

  useEffect(() => {
  const spans = document.getElementsByTagName("span");
  const buttons = document.getElementsByTagName("button");
  [...spans].forEach(span => {
    span.style.color = colorSpan;
  });
   [...buttons].forEach(button => {
    button.style.background = colorSpan;
  });
}, [colorSpan]);


  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
      document.body.classList.remove("contrast");
      setIsContrast(false);
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    if (isContrast) {
      document.body.classList.add("contrast");
      document.body.classList.remove("dark");
      setIsDark(false);
    } else {
      document.body.classList.remove("contrast");
    }
  }, [isContrast]);

  const colorOptions = [
    { name: "#ec133f", bg: "bg-[#ec133f]/10", src: "/text-green.svg" },
    { name: "blue", bg: "bg-blue-100", src: "/text-blue.svg" },
    { name: "orange", bg: "bg-orange-100", src: "/text-orange.svg" },
    { name: "purple", bg: "bg-purple-100", src: "/text-purple.svg" },
    { name: "gold", bg: "bg-[gold]/10", src: "/text-gold.svg" },
    { name: "red", bg: "bg-red-100", src: "/text-red.svg" },
  ];

  const fontOptions = [
    { name: "Nunito Sans", class: "font-nunito" },
    { name: "Signika Negative", class: "font-signika" },
    { name: "DM Sans", class: "font-dm" },
    { name: "Space Grotesk", class: "font-space" },
  ];

  const getTextColor = (color) => {
    switch (color) {
      case "lightred":
        return "text-[#ec133f]";
      case "blue":
        return "text-blue-600";
      case "orange":
        return "text-orange-600";
      case "purple":
        return "text-purple-600";
      case "gold":
        return "text-yellow-600";
      case "red":
        return "text-red-600";
      default:
        return "text-[#ec133f]";
    }
  };

  return (
    <div
      className="w-[400px] h-[100vh] fixed flex-col left-0 top-0 shadow-md transition-transform flex duration-300 pt-10 justify-start items-center bg-white dark:bg-[#121212]"
      style={{ transform: isOpen ? "translateX(0)" : "translateX(-400px)" }}
    >
      <div className="w-[90%] flex items-end justify-end gap-2">
        <div className="w-[50px] h-[50px] flex items-center justify-center border rounded-full">
          <GrPowerReset />
        </div>
        <div className="w-[50px] h-[50px] flex items-center justify-center border rounded-full">
          <LuFullscreen />
        </div>
      </div>
      <div
        className="flex w-[90%] items-center justify-between gap-3 mt-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`w-[49%] h-[120px] rounded-[20px] border flex gap-3 items-start justify-center flex-col px-5 cursor-pointer 
            ${
              isDark
                ? "bg-gray-200 dark:bg-[#1e1e1e]"
                : "hover:bg-gray-100 dark:hover:bg-[#222]"
            }`}
        >
          <div className="flex justify-between items-center w-full">
            <CloudMoon size={25} />
            <Switch checked={isDark} onCheckedChange={setIsDark} />
          </div>
          <p className="font-bold pt-2 text-sm">Dark Mode</p>
        </div>

        <div
          className={`w-[49%] h-[120px] rounded-[20px] border flex gap-3 items-start justify-center flex-col px-5 cursor-pointer 
            ${
              isContrast
                ? "bg-gray-100 dark:bg-[#1e1e1e]"
                : "hover:bg-gray-100 dark:hover:bg-[#222]"
            }`}
        >
          <div className="flex justify-between items-center w-full">
            <TbContrast2 size={25} />
            <Switch checked={isContrast} onCheckedChange={setIsContrast} />
          </div>
          <p className="font-bold pt-2 text-sm">Contrast Mode</p>
        </div>
      </div>

      <div
        className="flex w-[90%] items-center justify-between mt-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`w-[100%] h-[120px] rounded-[20px] border flex gap-3 items-start justify-center flex-col px-5 cursor-pointer 
            ${
              isCompact
                ? "bg-gray-100 dark:bg-[#1e1e1e]"
                : "hover:bg-gray-100 dark:hover:bg-[#222]"
            }`}
        >
          <div className="flex justify-between items-center w-full">
            <CgArrowsShrinkH size={25} />
            <Switch checked={isCompact} onCheckedChange={setIsCompact} />
          </div>
          <p className="font-bold pt-2 text-sm">Compact Mode</p>
        </div>
      </div>

      <div
        className="flex w-[90%] flex-wrap items-center justify-between mt-2 gap-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        {colorOptions.map((color) => (
          <div
            key={color.name}
            onClick={() => setColor(color.name)}
            className={`w-[32%] h-[80px] rounded-[20px] border flex gap-3 items-center justify-center flex-col px-5 cursor-pointer 
              ${
                colorSpan === color.name
                  ? `${color.bg} dark:bg-[#1e1e1e]`
                  : `hover:${color.bg} dark:hover:bg-[#222]`
              }`}
          >
            <img src={color.src} alt={color.name} />
          </div>
        ))}
      </div>

      <div className="w-[90%] mt-5" onClick={(e) => e.stopPropagation()}>
        {/* <p className="font-semibold text-sm mb-3">Family</p> */}
        <div className="grid grid-cols-2 gap-3">
          {fontOptions.map((font) => (
            <div
              key={font.name}
              onClick={() => setFont(font.class)}
              className={`rounded-xl border px-3 py-4 cursor-pointer flex items-center justify-center flex-col transition-all 
                ${
                  selectedFont === font.class
                    ? `ring-1 ${getTextColor(colorSpan)} ring-opacity-60`
                    : ""
                }`}
            >
              <p
                className={`${font.class} text-lg font-bold ${getTextColor(
                  colorSpan
                )}`}
              >
                Aa
              </p>
              <p className={`text-xs font-bold mt-1 ${font.class}`}>{font.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
