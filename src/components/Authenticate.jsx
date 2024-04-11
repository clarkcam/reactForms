import { useState } from "react";

export default function Authenticate({token}){

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const API = "https://fsa-jwt-practice.herokuapp.com";

    async function handleClick(){
        
        try{
            const response = await fetch(`${API}/authenticate`,
                {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    }
                });
            const json = await response.json();

            if(json.success){
                setSuccessMessage(json.message);
            }
            
        }
        catch(err){
            setError(err.message);
        }
    }

    return (
    <>
        <h2>Authenticate</h2>
        {successMessage ? <p>{successMessage}</p> : ""}
        { error ? <p>{error}</p> : ""}
        <button onClick={handleClick}>Authenticate Token</button>
    </>
    );
}