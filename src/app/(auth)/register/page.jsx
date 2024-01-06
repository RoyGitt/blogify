import RegisterForm from "@/components/registerForm/RegisterForm";
import styles from "./register.module.css";

export const metadata = {
  title: "Sign Up",
  description:
    "We create digital ideas that are bigger, bolder, braver and better.",
};

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Sign Up</h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
