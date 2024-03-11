import { useState, useEffect, memo } from "react";
import styled from "styled-components";
import axios from "@api/axios";
import i18n from "@constants/lang/i18n";
import { imagePath } from "@api/requests";

const Container = styled.div`
    .card-contents {
        cursor: pointer;

        .box-art {
            position: relative;
            width: 100%;
            height: 0;
            overflow: hidden;
            padding: 28.125% 0;
            background-color: #545454;
            border-radius: 0.3rem;

            img {
                position: absolute;
                top: 0;
                width: 100%;
            }
        }
    }
`;

function MovieCard({ $data, page, order }) {
    const { backdrop_path: backdrop, poster_path: poster } = $data;
    const [image, setImage] = useState();
    const lang = i18n.language;
    const langAbbr = lang.split("-")[0];

    useEffect(() => {
        fetchData();
    }, [lang, $data]);

    // 이미지가 없는 경우도 있어서 해당 상황일 경우 - 기본 백드롭/포스터를 사용하도록 적용
    const fetchData = async () => {
        try {
            const { data } = await axios.get(`movie/${$data.id}/images`, {
                params: {
                    language: lang,
                    include_image_language: `${langAbbr},en`,
                },
            });
            const { backdrops } = data;
            setImage(backdrops[0].file_path || backdrop || poster);
        } catch (err) {
            // console.error(`[MovieCard:${page}:${order}] Axios Error: `, err);
            setImage(backdrop || poster);
        }
    };

    return (
        <Container className={`movie-card-${page}-${order}`}>
            <div className="card-contents">
                <div className="box-art">
                    <img src={`${imagePath}${image}`} />
                </div>
            </div>
        </Container>
    );
}

export default memo(MovieCard);
