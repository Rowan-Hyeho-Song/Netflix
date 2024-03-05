import { useState, useMemo, useEffect } from "react";
import { throttle } from "lodash";

function useScroll(ref, returnRatio = false, wait = 100) {
    const [state, setState] = useState({ x: 0, y: 0 });
    const [ratio, setRatio] = useState({ x: 0, y: 0 });

    const handleScroll = useMemo(() => {
        return throttle(() => {
            const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = ref.current;
            const xRatio = scrollLeft / (scrollWidth - clientWidth);
            const yRatio = scrollTop / (scrollHeight - clientHeight);
            setState({ x: scrollLeft, y: scrollTop });
            setRatio({ x: xRatio, y: yRatio });
        }, wait);
    }, [ref, wait]);

    useEffect(() => {
        ref.current.addEventListener("scroll", handleScroll);

        return () => {
            ref.current.removeEventListener("scroll", handleScroll);
        };
    }, [ref, handleScroll]);

    return returnRatio ? ratio : state;
}

function getWindowScroll() {
    const { scrollX, scrollY } = window;
    return { x: scrollX, y: scrollY };
}

function bindScrollEvent(target, handle) {
    useEffect(() => {
        target.addEventListener("scroll", handle);

        return () => {
            target.removeEventListener("scroll", handle);
        };
    }, []);
}

export { useScroll, getWindowScroll, bindScrollEvent };
