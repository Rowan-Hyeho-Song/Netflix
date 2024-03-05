import React from "react";
import { useMediaQuery } from "react-responsive";

export const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({
        query: "(max-width:768px)",
    });
    return <>{isMobile && children}</>;
};

export const Pc = ({ children }) => {
    const isPc = useMediaQuery({
        query: "(min-width:769px)",
    });
    return <>{isPc && children}</>;
};

export const getViewMode = () => {
    const isMobile = useMediaQuery({
        query: "(max-width:768px)",
    });
    const isPc = useMediaQuery({
        query: "(min-width:769px)",
    });

    let currentViewMode = "Pc";
    if (isMobile) {
        currentViewMode = "Mobile";
    } else if (isPc) {
        currentViewMode = "Pc";
    }

    return currentViewMode;
};
