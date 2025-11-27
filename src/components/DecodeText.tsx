import { useEffect, useState } from "react";

interface DecodeTextProps {
  text: string;
  className?: string;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export const DecodeText = ({ text, className = "" }: DecodeTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isDecoding, setIsDecoding] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let iteration = 0;

    const startDecoding = () => {
      setIsDecoding(true);
      
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              
              if (index < iteration) {
                return text[index];
              }
              
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsDecoding(false);
        }

        iteration += 1 / 3;
      }, 30);
    };

    // Start decoding after component mounts
    const timeout = setTimeout(startDecoding, 500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text]);

  return <span className={className}>{displayText}</span>;
};
