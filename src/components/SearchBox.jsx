import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { GoSearch, GoX } from "react-icons/go";

const Container = styled.div`
    display: flex;
    align-items: center;

    .search-input {
        background-color: transparent;
        outline: none;
        padding: 0;
        margin: 0;
        width: 0px;
        border: 0;
        color: #ffffff;

        transition: width 0.4s;
    }
    .icon {
        box-sizing: content-box;
        color: #ffffff;
        padding: 0 6px;
    }
    .search {
        cursor: pointer;
    }
    .clear {
        display: none;
    }

    &.active {
        background-color: rgba(0, 0, 0, 0.75);
        border: 1px solid hsla(0, 0%, 100%, 0.85);

        .search {
            cursor: default;
        }
        .clear {
            display: inline-block;
            cursor: pointer;
        }

        .search-input {
            height: 34px;
            width: 214px;
            padding: 7px;

            &::placeholder {
                color: #b3b3b3;
            }
        }
        .search-input:placeholder-shown + .clear {
            visibility: hidden;
        }
    }
`;

function SearchBox() {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const toggleState = () => {
        setOpen((prevState) => !prevState);
    };
    const openBox = () => {
        toggleState();
        document.getElementById("searchInput").focus();
    };
    const clearBox = () => {
        document.getElementById("searchInput").value = null;
    };
    const closeBox = () => {
        toggleState();
    };
    return (
        <Container className={open && "active"}>
            <GoSearch className={`icon search`} size="26" onClick={openBox} />
            <input
                id="searchInput"
                className={`search-input`}
                type="text"
                placeholder={t("search.placeholder")}
                autoComplete="off"
                onBlur={closeBox}
            />
            <GoX className={`icon clear`} size="26" onClick={clearBox} />
        </Container>
    );
}

export default SearchBox;
