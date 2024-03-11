import styled from "styled-components";
import { Pc, Mobile } from "./MediaQuery";
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
    return (
        <Container>
            <Link to="/" className="logo">
                <Pc>
                    <img src={fullLogoSvg} style={{ width: "92px" }} alt="Netflix" />
                </Pc>
                <Mobile>
                    <img src={LogoSvg} style={{ height: "20px" }} alt="Netflix" />
                </Mobile>
            </Link>
        </Container>
    );
}

export default Logo;
