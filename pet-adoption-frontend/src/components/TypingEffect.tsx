import { useEffect, useState } from "react";

const TypingEffect = ({ text } : { text: string }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-lg whitespace-pre-wrap border p-4 rounded-md bg-gray-800 text-white w-full max-w-2xl mx-auto">
      {displayText}
    </div>
  );
};

export default TypingEffect;
