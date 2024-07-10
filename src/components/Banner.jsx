import axios from "@api/axios";
import { requests, imagePath } from "@api/requests";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import i18n from "@constants/lang/i18n";
import Button from "@components/Button";

const BannerWrapper = styled.div`
    position: relative;
    z-index: 1;

    .banner-row {
        position: relative;
        left: 0;
        right: 0;
        top: 0;
        margin-bottom: 20px;
        padding-bottom: 40%;
        background-color: #000;
        touch-action: pan-y;

        .banner {
            position: absolute;
            width: 100%;
            height: 56.25vw;
            background-color: #000;
            z-index: 0;

            .banner-motion,
            .full-screen,
            .image-wrapper,
            .static-image,
            .info-wrapper {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
            }
            .image-wrapper {
                .static-image {
                    width: 100%;

                    background-position: 50%;
                    background-size: cover;
                    -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
                    filter: alpha(opacity = 100);

                    opacity: 1;
                    transition: opacity 0.4s cubic-bezier(0.665, 0.235, 0.265, 0.8) 0s;
                }

                .vignette {
                    position: absolute;
                    left: 0;
                    right: 0;
                    z-index: 8;
                }
                .banner-vignette {
                    top: 0;
                    right: 26.09%;
                    bottom: 0;

                    background: linear-gradient(77deg, rgba(0, 0, 0, 0.6), transparent 85%);

                    opacity: 1;
                    transition: opacity 0.5s;
                }
                .bottom-vignette {
                    width: 100%;
                    height: 14.7vw;
                    top: auto;
                    bottom: -1px;

                    background-color: transparent;
                    background-image: linear-gradient(
                        180deg,
                        hsla(0, 0%, 8%, 0) 0,
                        hsla(0, 0%, 8%, 0.15) 15%,
                        hsla(0, 0%, 8%, 0.35) 29%,
                        hsla(0, 0%, 8%, 0.58) 44%,
                        #141414 68%,
                        #141414
                    );
                    background-position: 0 top;
                    background-repeat: repeat-x;
                    background-size: 100% 100%;
                    opacity: 1;
                }
            }
            .bottom-layer {
                z-index: 2;
            }

            .info-wrapper {
                width: 100%;
                height: 100%;

                .info {
                    position: absolute;
                    top: 0;
                    bottom: 35%;
                    left: 4%;
                    display: flex;
                    width: 36%;
                    flex-direction: column;
                    justify-content: flex-end;
                    z-index: 10;

                    .title-and-overview {
                        width: 100%;
                        transition: transform 1.5s cubic-bezier(0.165, 0.84, 0.44, 1);

                        .title-animation {
                            transform-origin: left bottom;
                            transition: transform 1.3s;

                            .banner-title {
                                position: relative;
                                margin-bottom: 1.2vw;
                                min-height: 13.2vw;

                                img {
                                    transform-origin: bottom left;
                                    width: 100%;
                                }
                            }
                        }
                        .overview-animation {
                            transition: transform 1.3s;
                            opacity: 1;

                            .banner-overview {
                                width: 100%;

                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: normal;
                                line-height: 1.5em;
                                height: 4.5em;
                                text-align: left;
                                word-wrap: break-word;
                                display: -webkit-box;
                                -webkit-line-clamp: 3;
                                -webkit-box-orient: vertical;

                                color: #fff;
                                font-size: 1.2vw;
                                font-weight: 400;
                                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
                            }
                        }

                        .button-group {
                            display: flex;
                            margin-top: 1.5vw;
                            white-space: nowrap;

                            .detail-button {
                                background-color: rgba(109, 109, 110, 0.7);
                                color: #ffffff;
                                border-radius: 4px;

                                &:hover {
                                    background-color: rgba(109, 109, 110, 0.4);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

function Banner() {
    const [movie, setMovie] = useState({});
    const [randomNum, setRandomNum] = useState(null);
    const { t } = useTranslation();
    const lang = i18n.language;
    const langAbbr = lang.split("-")[0];

    useEffect(() => {
        fetchData();
    }, [lang]);

    const fetchData = async () => {
        try {
            const req = await axios.get(requests.fetchNowPlaying, { params: { language: lang } });
            const rst = req.data.results;
            let num = randomNum;
            // 언어 변경을 할때 작품이 변경되지 않도록 설정
            if (num == null) {
                num = Math.floor(Math.random() * rst.length);
                setRandomNum(num);
            }
            const id = rst[num].id;

            const { data: targetMovie } = await axios.get(`movie/${id}`, {
                params: {
                    language: lang,
                    include_image_language: `${langAbbr},en`,
                    append_to_response: "videos,images",
                },
            });
            setMovie(targetMovie);
        } catch (err) {
            console.error("[Banner] Axios Error: ", err);
        }
    };

    const getTitleLogo = () => {
        const logos = movie?.images?.logos;

        if (logos?.length > 0) {
            // INFO: 한글 로고 이미지는 불확실한게 많아 영문만 적용
            let filtered = logos.filter(({ iso_639_1: language }) => language === "en");
            // 정확한 이미지를 뽑는 기준이 애매..
            filtered.sort((a, b) => b.aspect_ratio - a.aspect_ratio);

            if (filtered.length > 0) {
                const { file_path } = filtered[0];
                return <img src={`${imagePath}${file_path}`} alt={movie.title} loading="lazy"></img>;
            } else {
                return <div className="text-title">{movie.title}</div>;
            }
        }
    };

    return (
        <BannerWrapper>
            <div className="banner-row">
                <div className="banner">
                    <div className="banner-motion">
                        <div className="full-screen bottom-layer">
                            <div className="image-wrapper">
                                {movie?.backdrop_path != undefined && (
                                    <img className="static-image" src={`${imagePath}${movie?.backdrop_path}`} alt="backdrop" loading="lazy" />
                                )}
                                <div className="vignette banner-vignette"></div>
                                <div className="vignette bottom-vignette"></div>
                            </div>
                        </div>
                    </div>
                    <div className="info-wrapper">
                        <div className="info">
                            <div className="title-and-overview">
                                <div className="title-animation">
                                    <div className="banner-title">{getTitleLogo()}</div>
                                </div>
                                <div className="overview-animation">
                                    <div className="banner-overview">{movie.overview}</div>
                                </div>
                                <div className="button-group">
                                    <Button
                                        className="detail-button"
                                        lIcon="Info"
                                        iAsset="fi"
                                        label={t("btn.details")}
                                        onClick={() => alert("Not working...")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BannerWrapper>
    );
}

export default Banner;
