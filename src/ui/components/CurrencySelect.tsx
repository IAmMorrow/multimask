import Select, { components, OptionTypeBase } from "react-select";
import React, { useMemo, useCallback } from "react";
import styled, { useTheme, DefaultTheme } from "styled-components";
import Color from "color";
import { Currency } from "../../types/types";
import { defaultTheme } from "../../styles/theme";
import { getSelectStyles } from "./selectTheme";

const IconContainer = styled.div`
    margin-right: 0.4em;
    flex-shrink: 0;
`

const CurrencyDot = styled.div`
    background-color: ${props => props.color};
    width: 8px;
    height: 8px;
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
    color: #ffffff;
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
        <CurrencyDot color={data.data.color} />
        <AccountDetails>
            <AccountName>{children}</AccountName>
        </AccountDetails>
    </components.Option>
);

const AccountSummary: typeof components.SingleValue = ({ children, data,...rest }) =>
    <components.SingleValue {...rest}>
        <CurrencyDot color={data.data.color} />
        <AccountName>{children}</AccountName>
    </components.SingleValue>


type CurrencySelectorProps = {
    currencies: Currency[],
    onCurrencyChange: (currency: Currency | undefined) => void,
    selectedCurrency: Currency | undefined,
};

function fromCurrencyToOption(currency: Currency): OptionTypeBase {
    return {
        label: currency.name,
        value: currency.id,
        data: {
            color: currency.color,
        },
    }
}

export function CurrencySelect({ currencies, onCurrencyChange, selectedCurrency }: CurrencySelectorProps) {
    const theme = defaultTheme;
    const options = useMemo(() => currencies.map(currency => fromCurrencyToOption(currency)), [currencies]);
    const value = useMemo(() => selectedCurrency ? fromCurrencyToOption(selectedCurrency) : undefined, [selectedCurrency]);

    const styles = useMemo(() => getSelectStyles(theme), [theme]);

    const handleOnChange = useCallback((option: OptionTypeBase | null) => {
        const newSelectedCurrency = option ? currencies.find(currency => currency.id === option.value) : undefined;
        onCurrencyChange(newSelectedCurrency);
    }, [currencies, onCurrencyChange])

    return (
        <div>
        <Select
            instanceId="currency"
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
