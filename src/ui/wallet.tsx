import styled from "styled-components";
import React, { useCallback, useState } from "react";
import { Logo } from "./icons/logo";
import { useEffect } from 'react';
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


let websocket = null;
function createWebSocketConnection(host) {
    if('WebSocket' in window) {
        websocket = new WebSocket(host);

        websocket.onopen = function() {
            console.log("websocket connected");
        };

        websocket.onmessage = function (event) {
            var received_msg = JSON.parse(event.data);
            var notificationOptions = {
                type: "basic",
                title: received_msg.title,
                message: received_msg.message,
                iconUrl: "extension-icon.png"
            }
            chrome.notifications.create("", notificationOptions);
        };

        websocket.onclose = function() {
            alert("==== web socket closed ======");
        };
    }
}

function onConnect() {
    createWebSocketConnection("ws://127.0.0.1:8084");
}


export function Wallet() {
    useEffect(() => {
        console.log("connecting websocket");
        if (!websocket){
            onConnect();
        }
      }, []);
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