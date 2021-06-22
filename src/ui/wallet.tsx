import styled from "styled-components";
import React from "react";

const TopBar = styled.div`
    height: 68px;
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const WalletContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export function Wallet() {
    return (
        <WalletContainer>
            <TopBar>

            </TopBar>
        </WalletContainer>
    );
}