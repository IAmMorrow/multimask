import styled, { useTheme, DefaultTheme } from "styled-components";
import Color from "color";

export const getSelectStyles = (theme: DefaultTheme) => ({
    control: (provided: any) => ({
        ...provided,
        width: 200,
        backgroundColor: "transparent",
        borderRadius: "150px",
    }),
    singleValue: (provided: any) => ({
        ...provided,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontSize: 13,
        color: theme.colors.text,
    }),
    indicatorsContainer: (provided: any) => ({
        ...provided,
        color: "red",
    }),
    menu: (provided: any) => ({
        ...provided,
        backgroundColor: theme.colors.background,
        border: "rgba(255, 255, 255, 0.3) 1px solid"
    }),
    option: (provided: any, { isFocused, isSelected }: { isFocused: boolean, isSelected: boolean }) => ({
        ...provided,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontSize: 13,
        color: isSelected ? "#fff" : theme.colors.text,
        backgroundColor: isSelected
            ? new Color(theme.colors.primary).alpha(isFocused ? 0.8 : 1).string()
            : isFocused
                ? new Color(theme.colors.primary).alpha(0.1).string()
                : "transparent",
    })
});