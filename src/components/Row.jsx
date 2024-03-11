import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "@api/axios";
import i18n from "@constants/lang/i18n";
import { useTranslation } from "react-i18next";
import Slider from "@components/Slider";

const Container = styled.div`
    position: relative;
    margin: 3vw 0;
    padding: 0;
    transition: transform 0.54s cubic-bezier(0.5, 0, 0.1, 1) 0s;

    .row-header {
        line-height: 1.3;
        margin: 0;
        font-weight: 500;
        color: #e5e5e5;
        font-size: 1.4vw;
        margin: 0 4% 0.5em;
        min-width: 6em;
        text-decoration: none;
    }

    .row-container {
        position: relative;
        transition: transform 0.54s cubic-bezier(0.5, 0, 0.1, 1) 0s;
        z-index: 0;
    }
`;

function Row({ title, request }) {
    const [list, setList] = useState([]);
    const { t } = useTranslation();
    const lang = i18n.language;

    useEffect(() => {
        fetchData();
    }, [lang]);

    const fetchData = async () => {
        try {
            const req = await axios.get(request, {
                params: {
                    language: lang,
                },
            });
            const rst = req.data.results;
            setList(rst.map((d, i) => ({ ...d, order: i })));
        } catch (err) {
            console.error("[Row] Axios Error: ", err);
        }
    };

    return (
        <Container>
            <h2 className="row-header">
                <div className="row-header-title">{t(title)}</div>
            </h2>
            <div className="row-container">
                <Slider datas={list}></Slider>
            </div>
        </Container>
    );
}

export default Row;
