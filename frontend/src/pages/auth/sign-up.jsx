// import module(s)
import {useState} from "react";
import Link from "next/link";

const signUp = () => {
    const [infoMessage, setInfoMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const trySignUp = async (data) => {
        const response = await fetch(`http://localhost:80/auth/sign-up`, {
            method: "POST",
            mode: "cors",
            body: data,
            headers: {
                "Content-Type": "application/json"
            }
        });

        return await response.json();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const response = await trySignUp(JSON.stringify({
            firstName: formData.get("first_name"),
            lastName: formData.get("last_name"),
            email: formData.get("email"),
            username: formData.get("username"),
            password: formData.get("password")
        }));

        if (response) {
            if (response.success) {
                setInfoMessage(response.message);
                setErrorMessage("");
            }
            else {
                setErrorMessage(response.error);
            }
        }
        else {
            setErrorMessage("something went wrong");
        }
    }

    return (
        <div>
            <div>
                <h3>Sign Up</h3>
            </div>
            {errorMessage && (
                <div>
                    <p style={{color: "red"}}>{errorMessage}</p>
                </div>
            )}
            {infoMessage && (
                <div>
                    <p style={{color: "green"}}>{infoMessage}</p>
                </div>
            )}
            <form onSubmit={handleSubmit} autoComplete="off">
                <div>
                    <label>First Name</label>
                    <input name="first_name" type="text"/>
                </div>
                <div>
                    <label>Last Name</label>
                    <input name="last_name" type="text"/>
                </div>
                <div>
                    <label>Email</label>
                    <input name="email" type="email"/>
                </div>
                <div>
                    <label>Username</label>
                    <input name="username" type="text"/>
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" type="password"/>
                </div>
                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            <div>
                <Link href="/auth/sign-in">
                    <a>Already have an account? Sign In here</a>
                </Link>
            </div>
        </div>
    )
}

export default signUp;