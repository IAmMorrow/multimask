import styled from "styled-components";
import React, { useCallback, useState } from "react";
import { Logo } from "./icons/logo";
import { CurrencySelect } from "./components/CurrencySelect";

const TopBar = styled.div`
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    box-sizing: border-box;
`;

const WalletContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const LogoContainer = styled.div`

`

export function Wallet() {
    const [ selectedCurrency, setSelectedCurrency ] = useState(undefined);

    const onCurrencyChange = useCallback((currency) => {
        setSelectedCurrency(selectedCurrency);
    }, []);
    
    return (
        <WalletContainer>
            <TopBar>
                <LogoContainer>
                    <Logo height={36} width={41} />
                </LogoContainer>
                <CurrencySelect currencies={[]} onCurrencyChange={onCurrencyChange} selectedCurrency={selectedCurrency} />
            </TopBar>
        </WalletContainer>
    );
}