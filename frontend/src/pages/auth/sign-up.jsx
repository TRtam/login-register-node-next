// import style(s)
import styles from "../../../styles/modules/sign-up.module.css";

// import module(s)
import {useState} from "react";
import Link from "next/link";

const signUp = () => {
    const [infoMessage, setInfoMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const trySignUp = async (data) => {
        try {
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
        catch(error) {
            return false;
        }
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
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <p>Sign Up</p>
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
                <form onSubmit={handleSubmit} autoComplete="off" aria-autocomplete="none" className={styles.form}>
                    <div className={styles.form_item}>
                        <div>
                            <label>First Name</label>
                        </div>
                        <input name="first_name" type="text"/>
                    </div>
                    <div className={styles.form_item}>
                        <div>
                            <label>Last Name</label>
                        </div>
                        <input name="last_name" type="text"/>
                    </div>
                    <div className={styles.form_item}>
                        <div>
                            <label>Email</label>
                        </div>
                        <input name="email" type="email"/>
                    </div>
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
                    <button className={styles.form_item_submit} type="submit">Sign Up</button>
                </form>
                <div className={styles.link}>
                    <Link href="/auth/sign-in">
                        <a>Already have an account? Sign In here</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default signUp;