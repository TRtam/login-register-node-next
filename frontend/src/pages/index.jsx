// import module(s)
import {useState, useEffect} from "react";

const Index = () => {
    const [username, setUsername] = useState("");

    useEffect(async () => {
        const response = await fetch("http://localhost:80/", {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        });

        const data = await response.json();

        if(data && data.username) {
            setUsername(data.username);
        }
    }, []);

    return <h1>Welcome, {username || "Guest"}!</h1>
}

export default Index;