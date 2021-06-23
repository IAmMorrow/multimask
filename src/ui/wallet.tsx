import styled from "styled-components";
import React, { useCallback, useState } from "react";
import { Logo } from "./icons/logo";
import { CurrencySelect } from "./components/CurrencySelect";
import { currencies } from "./currencies";
import { AccountSummary } from "./AccountSummary";

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
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const AccountContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export function Wallet() {
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

    const onCurrencyChange = useCallback((currency) => {
        setSelectedCurrency(currency);
    }, []);

    return (
        <WalletContainer>
            <TopBar>
                <div>
                    <Logo height={36} width={41} />
                </div>
                <CurrencySelect currencies={currencies} onCurrencyChange={onCurrencyChange} selectedCurrency={selectedCurrency} />
            </TopBar>
            <AccountContainer>
            {
                !!selectedCurrency ? (
                    <AccountSummary currency={selectedCurrency} />
                ) : null                    
            }
            </AccountContainer>
        </WalletContainer>
    );
}