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

/*
function onSend(message: string) {
    if (!websocket) {
        throw new Error("send error: already connected");
    }
    websocket.send(message);
}*/

/*
function createWebSocketConnection(host) {
    if('WebSocket' in window) {
        websocket = new WebSocket(host);

        websocket.onopen = function() {
            console.log("websocket connected");
            onSend("{\"id\": 3,\"jsonrpc\": \"2.0\",\"method\": \"currency.list\",\"params\": {}}");
        };

        websocket.onmessage = function (event) {
            var received_msg = JSON.parse(event.data);
            console.log(received_msg.result);
        };

        websocket.onclose = function() {
            alert("==== web socket closed ======");
        };
    }
}
*/


export function Wallet() {
    const createWebSocketConnection = (host: string)=> {
        if('WebSocket' in window) {
            websocket = new WebSocket(host);    
            websocket.onopen = function() {
                console.log("websocket connected");
                onSend("{\"id\": 3,\"jsonrpc\": \"2.0\",\"method\": \"currency.list\",\"params\": {}}");
            };    
            websocket.onmessage = function (event) {
                var received_msg = JSON.parse(event.data);
                console.log(received_msg.result);
                //setCurrencies(currencies);
                setCurrencies(received_msg.result);
            };    
            websocket.onclose = function() {
                alert("==== web socket closed ======");
            };
        }
    };
    const onSend= (message: string) => {
        websocket.send(message);
    };
    useEffect(() => {
        console.log("connecting websocket");
        if (!websocket){
            createWebSocketConnection("ws://127.0.0.1:8084");
        }
      }, []);
    const [ selectedCurrency, setSelectedCurrency] = useState(undefined);
    const [currencies, setCurrencies] = useState([]);

    const onCurrencyChange = useCallback((currency) => {
        setSelectedCurrency(selectedCurrency);
    }, []);


    return (
        <WalletContainer>
            <TopBar>
                <LogoContainer>
                    <Logo height={36} width={41} />
                </LogoContainer>
                <CurrencySelect currencies={currencies} onCurrencyChange={onCurrencyChange} selectedCurrency={selectedCurrency} />
            </TopBar>
        </WalletContainer>
    );
}