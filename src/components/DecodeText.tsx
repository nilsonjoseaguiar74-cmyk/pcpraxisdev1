import { useEffect, useState } from "react";

interface DecodeTextProps {
  text: string;
  className?: string;
  decodeTime?: number; // in milliseconds
  displayTime?: number; // in milliseconds
  loop?: boolean;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export const DecodeText = ({ 
  text, 
  className = "", 
  decodeTime = 2000, 
  displayTime = 5000,
  loop = true 
}: DecodeTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isDecoding, setIsDecoding] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let displayTimeout: NodeJS.Timeout;

    const startDecoding = () => {
      setIsDecoding(true);
      let iteration = 0;
      const steps = text.length * 3;
      const stepDuration = decodeTime / steps;
      
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              
              if (index < iteration / 3) {
                return text[index];
              }
              
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= steps) {
          clearInterval(interval);
          setDisplayText(text);
          setIsDecoding(false);
          
          // Show correct text for displayTime, then restart if loop is enabled
          if (loop) {
            displayTimeout = setTimeout(() => {
              startDecoding();
            }, displayTime);
          }
        }

        iteration += 1;
      }, stepDuration);
    };

    // Start first decode after component mounts
    const initialTimeout = setTimeout(startDecoding, 500);

    return () => {
      clearInterval(interval);
      clearTimeout(displayTimeout);
      clearTimeout(initialTimeout);
    };
  }, [text, decodeTime, displayTime, loop]);

  return (
    <span className={`${className} ${isDecoding ? "opacity-80" : "opacity-100"} transition-opacity duration-300`}>
      {displayText}
    </span>
  );
};
