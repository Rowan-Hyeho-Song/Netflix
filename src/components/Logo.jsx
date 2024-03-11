import styled from "styled-components";
import { Pc, Mobile } from "./MediaQuery";
import { Link } from "react-router-dom";
import NetflixFullLogo from "@assets/Netflix_logo_full.svg";
import NetflixLogo from "@assets/Netflix_logo.svg";

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
                    <img src={NetflixFullLogo} style={{ width: "92px" }} />
                </Pc>
                <Mobile>
                    <img src={NetflixLogo} style={{ height: "20px" }} />
                </Mobile>
            </Link>
        </Container>
    );
}

export default Logo;
