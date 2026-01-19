import {useEffect, useState} from "react";
import {api } from "./lib/api.ts";

export default function App(){
    const[msg,setMsg] = useState<string>("cargando...")

    useEffect(() => {
        api.get("/health")
            .then(() => setMsg("Conectado a /health"))
            .catch((e)=>"no conecta" + (e?.message ?? "error"))
    }, []);


return(
    <div style={{ padding: 24}}>
        <h1>BetVault Frontend </h1>
        <p>{msg}</p>
    </div>
    );
}