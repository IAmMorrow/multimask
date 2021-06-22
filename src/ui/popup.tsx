import * as React from "react"
import * as ReactDOM from "react-dom"
import styled from "styled-components"
import { Reset } from "styled-reset"

import "../styles/popup.css"

const Container = styled.div`
    width: 360px;
    height: 600px;
    background-color: black;
`

class Hello extends React.Component {
    render() {
        return (
            <Container>
                <Reset />
                test
                <h1>{ chrome.i18n.getMessage("l10nHello") }</h1>
            </Container>
        )
    }
}

// --------------

ReactDOM.render(
    <Hello />,
    document.getElementById('root')
)