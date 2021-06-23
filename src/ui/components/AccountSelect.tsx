import Select, { components, OptionTypeBase } from "react-select";
import React, { useMemo, useCallback } from "react";
import styled, { useTheme, DefaultTheme } from "styled-components";
import Color from "color";
import { Account, Currency } from "../../types/types";
import { defaultTheme } from "../../styles/theme";
import { getSelectStyles } from "./selectTheme";

const IconContainer = styled.div`
    margin-right: 0.4em;
    flex-shrink: 0;
`

const AccountDot = styled.div`
    background-color: ${props => props.color};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
`;

const AccountDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-grow: 1;
`

const AccountName = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
`

const AccountAddress = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: 0.5;
`

const AccountIcon = () => (
    <IconContainer>
        <img src="/icons/ethereum.svg" width={24} height={24} />
    </IconContainer>
);

const AccountOption: typeof components.Option = ({ children, data, ...rest }) => (
    <components.Option data={data} {...rest}>
        <AccountDot color={data.data.color} />
        <AccountDetails>
            <AccountName>{children}</AccountName>
            <AccountAddress>{data.value}</AccountAddress>
        </AccountDetails>
    </components.Option>
);

const AccountSummary: typeof components.SingleValue = ({ children, data, ...rest }) =>
    <components.SingleValue {...rest}>
        <AccountDot color={data.data.color} />
        <AccountName>{children}</AccountName>
    </components.SingleValue>

type AccountSelectorProps = {
    accounts: Account[],
    onAccountChange: (account: Account | undefined) => void,
    selectedAccount: Account | undefined,
    currency: Currency,
};

function fromAccountToOption(account: Account, currency: Currency): OptionTypeBase {
    return {
        label: account.name,
        value: account.address,
        data: {
            balance: account.balance,
            color: currency.color,
        },
    }
}

export function AccountSelect({ accounts, onAccountChange, selectedAccount, currency }: AccountSelectorProps) {
    const theme = defaultTheme;
    const options = useMemo(() => accounts.map(account => fromAccountToOption(account, currency)), [accounts]);
    const value = useMemo(() => selectedAccount ? fromAccountToOption(selectedAccount, currency) : undefined, [selectedAccount]);

    const styles = useMemo(() => getSelectStyles(theme), [theme]);

    const handleOnChange = useCallback((option: OptionTypeBase | null) => {
        const newSelectedAccount = option ? accounts.find(account => account.address === option.value) : undefined;
        onAccountChange(newSelectedAccount);
    }, [accounts, onAccountChange])

    return (
        <div>
            <Select
                instanceId="account"
                options={options}
                styles={styles}
                components={{ SingleValue: AccountSummary, Option: AccountOption}}
                onChange={handleOnChange}
                value={value}
                isSearchable={false}
            />
        </div>
    )
}
