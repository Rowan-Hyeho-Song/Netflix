import { useState, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import { media, getNowBreakPoint } from "./MediaQuery";
import Icon from "@components/Icon";
import MovieCard from "@components/MovieCard";

const visibleItemCnt = {
    xLarge: 6,
    large: 5,
    medium: 4,
    small: 3,
    xSmall: 2,
};

const SliderWrapper = styled.div`
    ${Object.entries(visibleItemCnt).map(([key, value]) => {
        const width = 100 / value;
        return media[key]`
                .slider-item {
                    width: ${width}%;
                }
            `;
    })}

    &.slider-hover-trigger-layer:hover {
        .page-indicator {
            display: block;
        }
        .handle {
            .icon {
                opacity: 1;
            }
        }
    }
    .slider {
        position: relative;
        margin: 0;
        padding: 0 4%;
        touch-action: pan-y;
        z-index: 2;

        .page-indicator {
            display: none;
            position: absolute;
            top: 0;
            right: 4%;
            margin: -2% 0;
            list-style-type: none;
            padding: 0;

            li {
                display: inline-block;
                height: 3px;
                margin-left: 2px;
                width: 12px;
                background-color: #4d4d4d;

                &.active {
                    background-color: #aaaaaa;
                }
            }
        }

        .handle {
            display: flex;
            position: absolute;
            top: 0;
            bottom: 0;
            width: 4%;
            justify-content: center;
            align-items: center;
            background-color: hsla(0, 0%, 8%, 0.5);
            color: #fff;
            opacity: 0;
            z-index: 20;
            font-size: 1.5em;

            &.active {
                cursor: pointer;
                opacity: 1;
                transition: font-size 0.1s;

                &:hover {
                    font-size: 2em;
                }
            }
            &.handle-prev {
                border-bottom-right-radius: 4px;
                border-top-right-radius: 4px;
                left: -0.2vw;
            }
            &.handle-next {
                border-bottom-left-radius: 4px;
                border-top-left-radius: 4px;
                right: -0.2vw;
            }
            .icon {
                opacity: 0;
            }
        }

        .slider-mask {
            overflow-x: visible;

            .slider-content {
                white-space: nowrap;

                .slider-item {
                    display: inline-block;
                    padding: 0 0.2vw;
                    position: relative;
                    vertical-align: top;
                    white-space: normal;
                    z-index: 1;
                }
            }
        }
    }
`;

function PageIndicator({ max, active }) {
    return (
        <ul className="page-indicator">
            {max > 0 &&
                [...Array(max)].map((n, i) => {
                    return <li key={`indicator-item-${i}`} className={active === i ? "active" : ""}></li>;
                })}
        </ul>
    );
}

function Slider({ datas }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [currentList, setCurrentList] = useState([]);
    const [isInfinite, setIsInfinite] = useState(false);

    const total = datas.length;
    const count = visibleItemCnt[getNowBreakPoint()];
    const maxPage = Math.ceil(total / count);
    const itemWidth = 100 / count;
    const sliderRef = useRef();

    // 화면 resize시 캐러셀 정보 초기화
    useEffect(() => {
        const handleResize = debounce(() => {
            setIsInfinite(false);
            setCurrentPage(0);
            setStartIndex(0);
            transformSlider(0, 0);
        }, 200);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // 데이터나 시작 index 변경시 리스트 재정의
    useEffect(() => {
        const items = [];
        let start = !isInfinite ? 0 : startIndex - count - 1;
        if (start < 0) {
            items.push(...datas.slice(startIndex != 0 ? -1 : start));
            start = 0;
        }
        let viewEnd = startIndex + count;
        let end = viewEnd + count + 1;
        items.push(...datas.slice(start, Math.min(end, total)));
        if (end > total) {
            items.push(...datas.slice(0, viewEnd == total ? end - total : 1));
        }
        setCurrentList(items);
    }, [datas, startIndex]);

    useEffect(() => {
        const slider = sliderRef.current;
        if (slider && isInfinite) {
            slider.style.transition = "";
            let trans = 100 + itemWidth;
            // 예상되는 좌측 아이템 갯수만큼만 미리 이동
            if (startIndex < count && startIndex != 0) {
                trans = (count - startIndex - 1) * itemWidth;
            }
            slider.style.transform = `translateX(-${trans}%)`;
        }
    }, [currentList]);

    const getNewIndex = (direction) => {
        const val = count * direction;
        let prevIndex = startIndex;
        let newIndex = prevIndex + val;
        if (newIndex + val > total) {
            newIndex = newIndex == total ? total : total - count;
        } else if (newIndex < 0) {
            newIndex = prevIndex != 0 ? 0 : total - count;
            if (prevIndex == 0) {
                prevIndex = total;
            }
        }

        const move = Math.abs(newIndex - prevIndex);

        return { index: newIndex % total, move: move };
    };
    const transformSlider = (move, direction) => {
        const slider = sliderRef.current;
        // eslint-disable-next-line no-useless-escape
        const trans = isInfinite ? parseFloat(slider.style.transform.replace(/[^-\.0-9]/g, "")) : 0;
        slider.style.transition = `transform 0.54s cubic-bezier(0.5, 0, 0.1, 1) 0s`;
        slider.style.transform = `translateX(${trans + move * itemWidth * -direction}%)`;
    };
    const handleSwipe = (direction) => {
        // 현재 페이지값 변경
        const nextPage = currentPage + direction;
        setCurrentPage(direction > 0 ? nextPage % maxPage : nextPage < 0 ? nextPage + maxPage : nextPage);
        // 바뀔 index와 이동거리 계산
        const { index, move } = getNewIndex(direction);
        // transform 적용
        transformSlider(move, direction);
        // 첫 클릭시 infinite 활성화
        !isInfinite && setIsInfinite(true);

        // 현재 시작 index 변경
        moveToStartIndex(index);
    };

    const moveToStartIndex = (index) => {
        setTimeout(() => {
            setStartIndex(index);
        }, 500);
    };

    return (
        <SliderWrapper className="slider-hover-trigger-layer">
            <div className="slider">
                <PageIndicator max={maxPage} active={currentPage} />
                <div className={`handle handle-prev ${isInfinite ? "active" : ""}`} onClick={() => handleSwipe(-1)}>
                    <Icon className="icon prev-page-button" icon={"ChevronLeft"} asset="fa6" />
                </div>
                <div className="slider-mask">
                    <div className="slider-content" ref={sliderRef}>
                        {currentList.map((data, i) => {
                            const page = Math.floor(i / count);
                            const order = i % count;
                            return (
                                <div key={`slider-item-${data.order}`} className={`slider-item index-${data.order}`}>
                                    <MovieCard $data={data} page={page} order={order}></MovieCard>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="handle handle-next active" onClick={() => handleSwipe(1)}>
                    <Icon className="icon next-page-button" icon={"ChevronRight"} asset="fa6" />
                </div>
            </div>
        </SliderWrapper>
    );
}

export default Slider;
