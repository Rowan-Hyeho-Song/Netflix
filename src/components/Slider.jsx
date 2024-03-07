import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import MovieCard from "@components/MovieCard";
import { media, getNowBreakPoint } from "./MediaQuery";

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

    .slider {
        position: relative;
        margin: 0;
        padding: 0 4%;
        touch-action: pan-y;
        z-index: 2;

        .handle {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 4%;
            display: flex;
            justify-content: center;
            text-align: center;
            background-color: hsla(0, 0%, 8%, 0.5);
            color: #fff;
            z-index: 20;

            &.active {
                cursor: pointer;
            }
            &.handle-prev {
                border-bottom-right-radius: 4px;
                border-top-right-radius: 4px;
                left: -2px;
            }
            &.handle-next {
                border-bottom-left-radius: 4px;
                border-top-left-radius: 4px;
                right: 0;
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

function Slider({ datas }) {
    const total = datas.length;
    const count = visibleItemCnt[getNowBreakPoint()];

    // 내가 속한 page   >   Math.floor(i / count)
    // page에서 내 위치 >   i % count
    // 총 페이지 수     >   Math.ceil(total / count)
    return (
        <SliderWrapper className="slider-hover-trigger-layer">
            <div className="slider">
                <div className="handle handle-prev"></div>
                <div className="slider-mask">
                    <div className="slider-content">
                        {datas &&
                            datas.map((data, i) => {
                                return (
                                    <div key={`slider-item-${i}`} className="slider-item">
                                        <MovieCard $data={data} page={Math.floor(i / count)} order={i % count}></MovieCard>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className="handle handle-next"></div>
            </div>
        </SliderWrapper>
    );
}

export default Slider;
