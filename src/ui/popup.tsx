import * as React from "react"
import * as ReactDOM from "react-dom"
import styled from "styled-components"
import { Reset } from "styled-reset"

import "../styles/popup.css"
import { Wallet } from "./wallet"
import Lottie from "react-lottie";
import * as animationData from './icons/data.json'
 
const Container = styled.div`
    width: 100%;
    height: 100%;
`


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
class Hello extends React.Component<{}, { loading: boolean }> {

    constructor(props) {
        super(props);
        this.state = {
          loading: true,
        };
      }


      componentDidMount() {
          setTimeout(() => {
            this.setState({
              loading: false,
            });
          }, 5000)
        }

    render() {
        if (this.state.loading){
            return (
            <div>
                <Lottie 
                    options={defaultOptions}
                    height={600}
                    width={360}
                />
            </div>
            )
        }
        return (
            <Container>
                <Reset />
                <Wallet />
            </Container>
        )
    }
}

ReactDOM.render(
    <Hello />,
    document.getElementById('root')
)