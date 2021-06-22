import * as React from "react"
import * as ReactDOM from "react-dom"
import styled from "styled-components"
import { Reset } from "styled-reset"

import "../styles/popup.css"
import { Wallet } from "./wallet"

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #131314;
`

class Hello extends React.Component {
    render() {
        return (
            <Container>
                <Reset />
                <Wallet />
            </Container>
        )
    }
}

// --------------

ReactDOM.render(
    <Hello />,
    document.getElementById('root')
)