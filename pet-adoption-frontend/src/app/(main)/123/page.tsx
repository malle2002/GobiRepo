"use client"

export default function atat() {

    async function clickaction() {
        const data = await fetch("/api/123");
        const json = await data.json();
        console.log(json);
    }
    return (<div><button onClick={clickaction}>asd</button></div>);
}