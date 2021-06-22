import React from "react";

export function Logo({ width, height }: { width: number, height: number }) {
    return (
        <svg width={width} height={height} viewBox="0 0 41 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0V10.2222H2.27273V2.26667H15.5972V0H0ZM0 36H15.5972V33.7333H2.27273V25.7778H0V36Z" fill="white"/>
            <path d="M14.8946 25.7778H17.0559L16.9222 12.7556H17.2342L19.0835 21.2667H21.9356L23.785 12.7556H24.0969L23.9632 25.7778H26.1246V10.2222H22.6041L20.6655 18.7333H20.3536L18.4151 10.2222H14.8946V25.7778Z" fill="white"/>
            <path d="M41 10.2222V0H25.4028V2.26667H38.7273V10.2222H41ZM25.4028 36H41V25.7778H38.7273V33.7333H25.4028V36Z" fill="white"/>
        </svg>
    )
}
