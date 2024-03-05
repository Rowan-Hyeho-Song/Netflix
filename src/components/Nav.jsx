import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { bindScrollEvent } from "@hooks/useScroll";
import styled from "styled-components";
import { getViewMode } from "./MediaQuery";
import { GoTriangleDown } from "react-icons/go";
import { routers } from "@constants/Routers";
import SearchBox from "@components/SearchBox";

import Logo from "@components/Logo";

const Container = styled.div`
    position: sticky;
    top: 0;
    width: 100%;
`;
const Wrapper = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
`;
const MainHeader = styled.div`
    display: flex;
    padding: 0 4%;
    transition: background-color 0.4s;
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.7) 10%, transparent);
    height: ${({ $mode }) => ($mode === "Pc" ? "70px" : "40px")};
    background-color: ${({ $bgColor }) => ($bgColor ? "transparent" : "#0a0a0a")};
`;
const Navigation = styled.ul`
    display: flex;
    margin: 0;
    padding: 0;
    list-style-type: none;

    &.pc-view {
        align-items: center;

        .nav-menu {
            display: none;
        }
        .nav-tab {
            margin-left: 20px;
            transition: color 0.4s;
        }
    }

    &.mobile-view {
        flex-direction: column;

        .nav-tab-wrapper {
            background-color: rgba(0, 0, 0, 0.9);
            flex-direction: column;
            position: absolute;
            left: 0;
            top: 60px;
        }
        .nav-menu {
            flex: none;
            height: 40px;
            box-sizing: content-box;
            padding-bottom: 20px;
        }
        &:not(.active) .nav-tab-wrapper {
            display: none;
        }
        .nav-tab {
            position: relative;
            display: flex;
            flex: none;
            align-items: center;
            justify-content: center;
            min-width: 300px;
            height: 50px;
            transition: background-color 0.4s;

            &:hover {
                background-color: hsla(0, 0%, 100%, 0.05);
            }

            &:first-of-type::before {
                content: "";
                position: absolute;
                top: -15px;
                left: calc(50% - 7px);
                border: 7px solid transparent;
                border-bottom: 10px solid #e5e5e5;
            }
            &:first-of-type::after {
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                border-top: 3px solid #e5e5e5;
            }
        }
    }

    .nav-tab-wrapper {
        display: flex;
        list-style-type: none;
        padding: 0;
    }

    .nav-menu {
        display: flex;
        align-items: center;
        color: #ffffff;
        cursor: pointer;

        .nav-menu-icon {
            margin-left: 4px;
        }
    }

    .nav-tab {
        text-decoration: none;
        color: #e5e5e5;

        &.current {
            cursor: default;
            font-weight: 700;
            color: #ffffff;
        }

        &:not(.current):hover {
            color: #b3b3b3;
        }
    }
`;
const SubNavigation = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;

    &.mobile-view {
        display: none;
    }
`;

function Nav() {
    const device = getViewMode();
    const location = useLocation();
    const [isNavTransparent, setIsNavTransparent] = useState(true);
    const handleScroll = () => {
        setIsNavTransparent(!(window.pageYOffset > 0));
    };
    bindScrollEvent(window, handleScroll);

    const mouseEnterHandle = (e) => {
        if (device === "Mobile") {
            const target = e.currentTarget;
            target.classList.add("active");
        }
    };
    const mouseLeaveHandle = (e) => {
        if (device === "Mobile") {
            const target = e.currentTarget;
            target.classList.remove("active");
        }
    };

    return (
        <Container>
            <Wrapper>
                <MainHeader $mode={device} $bgColor={isNavTransparent}>
                    <Logo />
                    <Navigation
                        className={device === "Pc" ? "pc-view" : "mobile-view"}
                        onMouseEnter={mouseEnterHandle}
                        onMouseLeave={mouseLeaveHandle}
                    >
                        <li className={"nav-menu"}>
                            Menu <GoTriangleDown className="nav-menu-icon" size={20} />
                        </li>
                        <ul className="nav-tab-wrapper">
                            {routers &&
                                routers.map(({ name, path }, i) => {
                                    return (
                                        <Link key={`nav-${i}`} className={`nav-tab ${location.pathname === path ? "current" : ""}`} to={path}>
                                            <li>{name}</li>
                                        </Link>
                                    );
                                })}
                        </ul>
                    </Navigation>
                    <SubNavigation className={device === "Pc" ? "pc-view" : "mobile-view"}>
                        <SearchBox />
                    </SubNavigation>
                </MainHeader>
            </Wrapper>
        </Container>
    );
}

export default Nav;
