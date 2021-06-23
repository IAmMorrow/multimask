import React from "react";
import styled from "styled-components";

const Container = styled.div`
    font-size: 14px;
    text-align: center;
    width: 100%;
    margin: 16px;
    box-sizing: border-box;
    margin-top: 24px;
`;

export function BigText({ text }: { text: string }) {
    return (
        <Container>
            {text}
        </Container>
    );
} 