import React from "react";

export default function DisabledButtonOnClick( { disabled, text, textOnDisabled }  : { disabled: boolean, text: string, textOnDisabled: string }) {

  return (
    <button 
      disabled={disabled}
      className="btn btn-primary w-full text-lg"
    >
      {disabled?textOnDisabled:text}
    </button>
  );
}
