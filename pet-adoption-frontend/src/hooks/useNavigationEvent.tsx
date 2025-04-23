"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const useNavigationEvent = (onPathnameChange: () => void) => {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname(); // Get current route

    // Save pathname on component mount into a REF
    const savedPathNameRef = useRef(pathname);

    useEffect(() => {
        // If REF has been changed, do the stuff
        if (savedPathNameRef.current !== pathname) {
            setIsLoading(true);
            onPathnameChange();
            
            // Update REF
            savedPathNameRef.current = pathname;
            setIsLoading(false);
        }
    }, [pathname, onPathnameChange]);
};