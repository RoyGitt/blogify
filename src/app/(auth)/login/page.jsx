import styles from "./login.module.css";
import LoginForm from "@/components/loginForm/LoginForm";

export const metadata = {
  title: "Sign In",
  description:
    "We create digital ideas that are bigger, bolder, braver and better.",
};

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Sign In</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
