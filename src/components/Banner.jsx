import axios from "@api/axios";
import requests from "@api/requests";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import i18n from "@constants/lang/i18n";
import { FiInfo } from "react-icons/fi";

const IMAGE_PATH = "https://image.tmdb.org/t/p/original/";
const BannerWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 56vw;

    .info-area {
        position: absolute;
        left: 4%;
        top: 0;
        bottom: 35%;
        width: 36%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        z-index: 3;

        .title-logo {
            width: 100%;
            > img {
                width: 100%;
            }
        }
        .info-overview {
            color: #ffffff;
            text-shadow: 0px 0px 5px rgba(0, 0, 0, 1);
            overflow: hidden;
            text-overflow: ellipsis;
            margin-top: 20px;
            white-space: normal;
            line-height: 1.5;
            width: 90%;
            height: 4.5em;
            text-align: left;
            word-wrap: break-word;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
        .play-button-group {
            width: 100%;
            margin-top: 20px;

            .dummy-button {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 150px;
                padding: 10px 16px;
                border-radius: 5px;
                background-color: rgba(109, 109, 110, 0.7);
                color: #ffffff;
                cursor: pointer;

                &:hover {
                    background-color: rgba(109, 109, 110, 0.4);
                }

                .btn-icon {
                    margin-right: 10px;
                }
            }
        }
    }
`;

const BackDropImg = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${IMAGE_PATH}/${({ $path }) => $path});
    background-position: top center;
    background-size: cover;

    .backdrop-cover {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
`;

function Banner() {
    const [movie, setMovie] = useState({});
    const [movieList, setMovieList] = useState([]);
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
            setMovieList(movieList);
        } catch (err) {
            console.error("Axios Error: ", err);
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
                return <img src={`${IMAGE_PATH}${file_path}`} alt={movie.title}></img>;
            } else {
                return <div className="text-title">{movie.title}</div>;
            }
        }
    };

    return (
        <BannerWrapper>
            <BackDropImg $path={movie.backdrop_path}>
                <div className="backdrop-cover"></div>
            </BackDropImg>
            <div className="info-area">
                <div className="title-logo">{getTitleLogo()}</div>
                <div className="info-overview">{movie.overview}</div>
                <div className="play-button-group">
                    <div className="dummy-button">
                        <FiInfo className="btn-icon" size={26} />
                        {t("btn.details")}
                    </div>
                </div>
            </div>
        </BannerWrapper>
    );
}

export default Banner;
