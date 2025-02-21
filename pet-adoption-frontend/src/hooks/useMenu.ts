import { useState } from "react";

export function useMenu() {
    const [menuOpen, setMenuOpen] = useState(false);

    return {
        menuOpen,
        setMenuOpen
    };
}