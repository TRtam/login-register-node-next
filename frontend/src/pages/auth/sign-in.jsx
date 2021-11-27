// import style(s)
import styles from "../../../styles/modules/sign-in.module.css";

// import module(s)
import { useState } from "react";
import Link from "next/link";

const signIn = () => {
    const [infoMessage, setInfoMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const trySignIn = async (data) => {
        try {
            const response = await fetch(`http://localhost:80/auth/sign-in`, {
                method: "POST",
                mode: "cors",
                body: data,
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            return await response.json();
        }
        catch(error) {
            return false;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const response = await trySignIn(JSON.stringify({
            username: formData.get("username"),
            password: formData.get("password")
        }));

        if (response) {
            if (response.success) {
                localStorage.setItem("token", response.token);
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
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <h3>Sign Up</h3>
                </div>
                {errorMessage && (
                    <div className={styles.message}>
                        <p style={{color: "red"}}>{errorMessage}</p>
                    </div>
                )}
                {infoMessage && (
                    <div className={styles.message}>
                        <p style={{color: "green"}}>{infoMessage}</p>
                    </div>
                )}
                <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
                    <div className={styles.form_item}>
                        <div>
                            <label>Username</label>
                        </div>
                        <input name="username" type="text"/>
                    </div>
                    <div className={styles.form_item}>
                        <div>
                            <label>Password</label>
                        </div>
                        <input name="password" type="password"/>
                    </div>
                    <button className={styles.form_item_submit} type="submit">Sign In</button>
                </form>
                <div className={styles.link}>
                    <Link href="/auth/sign-up">
                        <a>Don't have and account? Sign Up here</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default signIn;