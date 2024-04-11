import { useState } from 'react';

export default function SignUpForm ({setToken}){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signUp, setSignUp] = useState(null);
    const [error, setError] = useState(null);
  
    const API = "https://fsa-jwt-practice.herokuapp.com"

    async function handleSubmit(event){
        event.preventDefault();
        try{
            const response = await fetch(`${API}/signup`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username, password
                })
            });

            const json = await response.json();
            console.log(json);

            setToken(json.token);
            setUsername("");
            setPassword("");
            setSignUp("Successfully Signed Up");


        } catch(error){
            setError(error.message);
            setSignUp(null);
        }

    }
    return (
        <>
            <h2>Sign Up</h2>
            {error ? <p>{error}</p> : ""}

            <form onSubmit={handleSubmit}>
                <label>
                    Username: <input value={username} onChange={(e) => setUsername(e.target.value)} /> 
                </label>
                <label>
                    Password: <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"/> 
                </label>
                <button>Submit</button>
            </form>
            {signUp ? <p>Thank you for signing up</p> : ""}
        </>
    );
}