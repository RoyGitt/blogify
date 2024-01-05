"use client";

import Link from "next/link";
import styles from "./registerForm.module.css";
import { registerUser } from "@/lib/action";
import { useFormState } from "react-dom";

const RegisterForm = () => {
  const [state, formAction] = useFormState(registerUser, undefined);

  return (
    <form action={formAction} className={styles.form}>
      <input type="text" placeholder="username" name="username" />
      <input type="email" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <input
        type="password"
        placeholder="password again"
        name="passwordRepeat"
      />
      <button>Register</button>
      <Link href="/login">
        Have an account? <b>Login</b>
      </Link>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
};

export default RegisterForm;
