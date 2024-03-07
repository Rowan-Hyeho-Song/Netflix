import React from "react";
import { css } from "styled-components";
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

const breakpoints = {
    xSmall: { max: 499 },
    small: { max: 799, min: 500 },
    medium: { max: 1099, min: 800 },
    large: { max: 1399, min: 1100 },
    xLarge: { min: 1400 },
};
const breakpointsEntries = Object.entries(breakpoints);
const querys = breakpointsEntries.reduce((acc, [key, value]) => {
    return {
        ...acc,
        [key]: Object.entries(value)
            .map(([k, v]) => `(${k}-width: ${v}px)`)
            .join(" and "),
    };
}, {});

export const media = Object.entries(querys).reduce((acc, [key, value]) => {
    return {
        ...acc,
        [key]: (first, ...interpolations) => css`
            @media screen and ${value} {
                ${css(first, ...interpolations)}
            }
        `,
    };
}, {});

// TODO: 왜 반복문안에서 useMediaQuery를 실행면 오류가 발생하지? 꼭 찾아보기
export const getNowBreakPoint = () => {
    const isXS = useMediaQuery({ query: querys.xSmall });
    const isS = useMediaQuery({ query: querys.small });
    const isM = useMediaQuery({ query: querys.medium });
    const isL = useMediaQuery({ query: querys.large });

    if (isXS) {
        return "xSmall";
    } else if (isS) {
        return "small";
    } else if (isM) {
        return "medium";
    } else if (isL) {
        return "large";
    }
    return "xLarge";
};
