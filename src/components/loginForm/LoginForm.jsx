"use client";

import Link from "next/link";
import styles from "./loginForm.module.css";
import { handleGithubLogin, login } from "@/lib/action";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <>
      <form action={formAction} className={styles.form}>
        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />

        <button>Login</button>
        {state?.error && <p>{state.error}</p>}
      </form>
      <form action={handleGithubLogin} className={styles.githubLogin}>
        <button className={styles.githubBtn}>Login with Github</button>
      </form>
      <Link href="/register">
        Don't have an an account? <b>Sign Up</b>
      </Link>
    </>
  );
};

export default LoginForm;
