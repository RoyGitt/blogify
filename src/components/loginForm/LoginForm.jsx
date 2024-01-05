"use client";

import Link from "next/link";
import styles from "./loginForm.module.css";
import { login } from "@/lib/action";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <form action={formAction} className={styles.form}>
      <input type="email" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />

      <button>Login</button>
      <Link href="/register">
        Do not have an an account? <b>Login</b>
      </Link>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
};

export default LoginForm;
