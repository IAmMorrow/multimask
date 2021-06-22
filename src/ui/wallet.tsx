import styled from "styled-components";
import React from "react";
import { Logo } from "./icons/logo";

const TopBar = styled.div`
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const WalletContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const LogoContainer = styled.div`
    padding: 16px;
`

export function Wallet() {
    return (
        <WalletContainer>
            <TopBar>
                <LogoContainer>
                    <Logo height={36} width={41} />
                </LogoContainer>
            </TopBar>
        </WalletContainer>
    );
}