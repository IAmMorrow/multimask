import { Account } from "../types/types";
import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import React from "react";
import { BigText } from "./common";

type NFTViewer = {
    account: Account,
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px;
`;

type NFTItemProps = {
    data: any,
}

const NFTItemContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    margin-bottom: 43px;
`;

const Img = styled.img`
    width: 100%;
    &:hover {
        opacity: 0.8;
    }
    cursor: pointer;
`

const NFTName = styled.div`
    font-size: 14px;
    text-align: center;
`;
const CollectionName = styled.div`
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 2px;
    text-align: center;
`;

function NFTItem({ data }: NFTItemProps) {
    const onClick = useCallback(() => {
        window.open(data.permalink)
    }, [data])
    return (
        <NFTItemContainer>
            <Img src={data.image_original_url} onClick={onClick} />
            <NFTName>
                {data.name}
            </NFTName>
            <CollectionName>
                {data.collection.name}
            </CollectionName>
        </NFTItemContainer>
    );
}

export function NFTViewer({ account }) {
    const [ nfts, setNFTs ] = useState([]);
    const [ isLoading, setLoading ] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20&owner=${account.address}`)
        .then((res) => {
            setNFTs(res.data.assets);
            setLoading(false);
        })
    }, [account])

    console.log({ nfts })

    return (
        <Container>
            {
                isLoading ? (
                    <BigText text="Loading ..." />
                ) : nfts.length ?
                nfts.map(data => <NFTItem data={data} />)
                : <BigText text="This account doesn't own any NFT" />
            }
        </Container>
    )
}