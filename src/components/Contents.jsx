import styled from "styled-components";
import Row from "@components/Row";
import { RowItems } from "@constants/RowItems";

const RowWrapper = styled.div`
    z-index: 5;
`;

function Contents() {
    return (
        <RowWrapper>
            {RowItems &&
                RowItems.map((item, i) => {
                    return <Row key={`row-${i}`} {...item} />;
                })}
        </RowWrapper>
    );
}

export default Contents;
