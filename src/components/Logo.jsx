import styled from "styled-components";
import { getViewMode } from "./MediaQuery";
import { Link } from "react-router-dom";
import fullLogoSvg from "@assets/netflix_full_logo.svg";
import LogoSvg from "@assets/netflix_logo.svg";

const Container = styled.div`
    display: flex;
    align-items: center;
    height: 100%;

    .logo {
        font-size: 0;
        margin-right: 25px;
    }
`;
function Logo() {
    const vm = getViewMode();
    const logos = {
        Pc: {
            icon: fullLogoSvg,
            style: { width: "92px" },
        },
        Mobile: {
            icon: LogoSvg,
            style: { height: "20px" },
        },
    };

    const d = logos[vm];
    return (
        <Container>
            <Link to="/" className="logo">
                <img src={d.icon} style={d.style} alt="Netflix" />
            </Link>
        </Container>
    );
}

export default Logo;
