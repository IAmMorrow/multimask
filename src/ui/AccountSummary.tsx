import styled from "styled-components";
import React, { useState, useMemo, useCallback, useEffect, Fragment, ReactNode, ReactComponentElement } from "react";
import { Currency, Account } from "../types/types";
import { accounts } from "./accounts";
import { AccountSelect } from "./components/AccountSelect";
import { deserializeAccount } from "../lib/serializers";
import { currencies } from "./currencies";
import { Buy, Exchange, Send, Receive } from "./icons/Buy";

const accounts2 = accounts.map(deserializeAccount);

const getAccountBalance = (account: Account, currency: Currency) => {
    return `${account.balance.dividedBy(10 ** currency.units[0].magnitude).toString()} ${currency.ticker}`
}

const AccountSummaryContainer = styled.div`
    background: rgba(255, 255, 255, 0.1);
    color: #FFFFFF;
    margin: 16px;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 6px;
    box-sizing: border-box;
`;
type AccountSummaryProps = {
    currency: Currency
}

const BalanceValue = styled.div`
    font-size: 28px;
    line-height: 33.6px;
    margin-top: 16px;
`;

const AddressContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 6px 16px;
    margin-top: 24px;
    overflow: hidden;
    white-space: nowrap;
    background: rgba(255, 255, 255, 0.11);
    border-radius: 150px;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);`
 ;

const Address = styled.span`
    font-size: 12px;
    line-height: 15px;
    text-overflow: ellipsis;
    overflow: hidden;
`

type ActionButtonProps = {
    label: string,
    Icon: any,
    url?: string,
}

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 20px;
    font-size: 13px;
`

const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #8A80DB;
    border-radius: 150px;
    color: #000000;
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
    user-select: none;
`

function ActionButton({label, Icon, url}: ActionButtonProps) {
    const onClick = useCallback(() => {
        if (url) {
            window.open(url)
        }
    }, [url])
    return (
        <ButtonContainer>
            <Button onClick={onClick}>
                <Icon height={24} width={24} />
            </Button>
            { label }
        </ButtonContainer>
    );
}

const ActionContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export function AccountSummary({ currency }: AccountSummaryProps) {
    const accountsForCurrency = useMemo(() => accounts2.filter(account => account.currency === currency.id), [currency, accounts]);

    const [selectedAccount, setSelectedAccount] = useState(undefined);

    useEffect(() => {
        setSelectedAccount(accountsForCurrency.length > 0 ? accountsForCurrency[0] : undefined);
    }, [accountsForCurrency]);

    const onAccountChange = useCallback((account) => {
        setSelectedAccount(account);
    }, []);

    return (
        <Fragment>
            <AccountSummaryContainer>
                <AccountSelect accounts={accountsForCurrency} selectedAccount={selectedAccount} onAccountChange={onAccountChange} currency={currency} />
                {
                    selectedAccount ? (
                        <Fragment>
                            <BalanceValue>
                                {getAccountBalance(selectedAccount, currency)}
                            </BalanceValue>
                            <AddressContainer>
                                <Address>
                                    {selectedAccount.address}
                                </Address>
                            </AddressContainer>
                        </Fragment>   
                    ) : null
                }
            </AccountSummaryContainer>
            <ActionContainer>
                <ActionButton label="Buy" Icon={Buy} url="ledgerlive://buy" />
                <ActionButton label="Swap" Icon={Exchange} url="ledgerlive://swap" />
                <ActionButton label="Send" Icon={Send} url="ledgerlive://send" />
                <ActionButton label="Receive" Icon={Receive} url="ledgerlive://receive" />
            </ActionContainer>
        </Fragment>
    );
}
