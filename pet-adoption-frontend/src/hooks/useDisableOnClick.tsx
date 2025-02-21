import { useState } from "react";

export function useDisableOnClick() {
  const [disabled, setDisabled] = useState(false);

  const handleClick = (callback: () => void) => {
    if (!disabled) {
      setDisabled(true);
      setTimeout(() => {
      }, 3000);
      setDisabled(false);
      callback();
    }
  };

  return { disabled, handleClick };
}