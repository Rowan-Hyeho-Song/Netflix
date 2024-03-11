import styled from "styled-components";
import Banner from "@components/Banner";
import Contents from "@components/Contents";
import Footer from "@components/Footer";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
`;

function Layout() {
    return (
        <Container>
            <Banner />
            <Contents />
            <Footer />
        </Container>
    );
}

export default Layout;
