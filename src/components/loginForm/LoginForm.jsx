import Link from "next/link";
import styles from "./loginForm.module.css";
import { login } from "@/lib/action";

const LoginForm = () => {
  return (
    <form action={login} className={styles.form}>
      <input type="email" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />

      <button>Login</button>
      <Link href="/register">
        Do not have an an account? <b>Login</b>
      </Link>
    </form>
  );
};

export default LoginForm;
