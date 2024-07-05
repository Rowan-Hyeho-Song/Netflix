import { useState, useRef } from "react";
import styled from "styled-components";
import ModalPortal from "@components/modal/ModalPortal";
import { debounce } from "lodash";
import { imagePath } from "@api/requests";
import { useTranslation } from "react-i18next";
import Icon from "@components/Icon";

const ModalHoverTrigger = styled.div`
    @keyframes scaleUp {
        0% {
            opacity: 0;
            transform: scale(0.5);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    @keyframes scaleDown {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.5);
        }
    }
`;

const ModalWrapper = styled.div`
    display: flex;
    max-width: 450px;
    flex-direction: column;
    position: absolute;
    border-radius: 6px;
    transform-origin: 50% 50%;
    transform: none;
    color: #ffffff;
    background-color: #181818;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    overflow: hidden;
    z-index: 30;
    opacity: 1;
    cursor: pointer;
    animation: scaleUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

    .poster-layer {
        position: relative;
        background-color: #000000;
        width: 100%;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .info-layer {
        display: flex;
        width: 100%;
        height: 100%;

        .modal-info-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 1;
            padding: 1em;

            .info-title-wrapper {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 10px;

                .info-title {
                    font-size: 1.3rem;
                    font-weight: 700;
                }
                .info-vote-average {
                    flex: none;
                    font-size: 1.1rem;
                    color: #46d369;
                }
            }
            .info-genre-wrapper {
                padding-top: 10px;
                display: flex;
                align-items: center;

                .divide-dot {
                    font-size: 1.6rem;
                    color: #646464;
                }
            }
        }
    }
`;

const getPosition = (ref) => {
    const target = ref.current;
    const rect = target?.getBoundingClientRect() || { top: 0, left: 0 };
    const w = target?.clientWidth;
    const h = target?.clientHeight;
    const winWidth = window.innerWidth;
    const w4per = window.innerWidth * 0.04;
    const width = w * 1.6;
    let top = rect.top - (width - h) / 2;
    let left = rect.left - (width - w) / 2;
    if (left + width > winWidth - w4per) {
        left = rect.left - (width - w);
    } else if (left < w4per) {
        left = w4per;
    }
    if (top + width > window.innerHeight) {
        top = rect.top - (width - h);
    }

    return { style: { top: top + window.pageYOffset, left, width, height: width } };
};

function MovieDetailModal({ children, data, image }) {
    const [show, setShow] = useState(false);
    const ref = useRef(null);
    const pos = useRef(null);
    const { t } = useTranslation();

    const handleMouseOver = debounce(() => {
        pos.current = getPosition(ref);
        setShow(true);
    }, 500);
    const handlMouseLeave = () => {
        setShow(false);
        handleMouseOver.cancel();
    };

    const gerneCnt = data?.genre_ids?.length;
    const mapCnt = Math.min(gerneCnt, 3);

    return (
        <ModalHoverTrigger ref={ref} onMouseOver={handleMouseOver} onMouseLeave={handlMouseLeave}>
            {children}
            {show && (
                <ModalPortal>
                    <ModalWrapper style={pos.current.style}>
                        <div className="poster-layer">
                            <img src={`${imagePath}${image}`} />
                        </div>
                        <div className="info-layer">
                            <div className="modal-info-wrapper">
                                <div className="info-title-wrapper">
                                    <div className="info-title">{data.title || data.name}</div>
                                    <div className="info-vote-average">{`${parseInt(data.vote_average * 10)}% ${t("common.vote")}`} </div>
                                </div>
                                <div className="info-genre-wrapper">
                                    {data.genre_ids &&
                                        [...Array(mapCnt)].map((d, i) => {
                                            return (
                                                <>
                                                    <div key={`${data.id}-${i}`} className="gerne-txt">
                                                        {t(`genre.${data.genre_ids[i]}`)}
                                                    </div>
                                                    {i != mapCnt - 1 && (
                                                        <Icon key={`${data.id}-dot-${i}`} className="divide-dot" icon="Dot" asset="lu" />
                                                    )}
                                                </>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </ModalWrapper>
                </ModalPortal>
            )}
        </ModalHoverTrigger>
    );
}

export default MovieDetailModal;
