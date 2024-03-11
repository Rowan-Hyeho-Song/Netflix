import styled from "styled-components";
import i18n from "@constants/lang/i18n";
import { useTranslation } from "react-i18next";
import supportLang from "@constants/lang/support.lang";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    height: 100%;

    &:not(.active) {
        .lang-dropdown-menu {
            display: none;
        }
    }

    .current-lang {
        padding: 0 6px;
        margin-left: 10px;
        display: flex;
        cursor: pointer;

        .cur-lang-icon {
            width: 26px;
            height: 26px;
        }
    }

    .lang-dropdown-menu {
        position: absolute;
        top: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-width: 200px;
        background-color: rgba(0, 0, 0, 0.9);
        color: #e5e5e5;

        &::before {
            content: "";
            position: absolute;
            top: -15px;
            right: 12px;
            border: 7px solid transparent;
            border-bottom: 10px solid #e5e5e5;
        }
        &::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            border-top: 3px solid #e5e5e5;
        }

        .lang-item {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 50px;

            transition: background-color 0.4s;

            &:hover {
                background-color: hsla(0, 0%, 100%, 0.05);
            }

            &.current {
                cursor: default;
                font-weight: 700;
                color: #ffffff;
            }
            z-index: 2;
        }
    }
`;

function LanguageBox() {
    const curLang = i18n.language;
    const { t } = useTranslation();
    const currentMenu = () => {
        const find = supportLang.find(({ key }) => key === curLang);
        return <img className="cur-lang-icon" src={find.icon} alt={find.key} />;
    };
    const toggleState = (e) => {
        const target = e.currentTarget;
        target.classList.toggle("active");
    };
    const changeLanguage = (e) => {
        const { key } = e.target.dataset;
        if (curLang !== key) {
            i18n.changeLanguage(key);
        }
    };

    return (
        <Container onMouseEnter={toggleState} onMouseLeave={toggleState}>
            <div className="current-lang">{currentMenu()}</div>
            <div className="lang-dropdown-menu" onClick={changeLanguage}>
                {supportLang &&
                    supportLang.map(({ key }, i) => {
                        return (
                            <div key={`lang-item-${i}`} className={`lang-item ${curLang === key ? "current" : ""}`} data-key={key}>
                                {t(`language.${key}`)}
                            </div>
                        );
                    })}
            </div>
        </Container>
    );
}

export default LanguageBox;
