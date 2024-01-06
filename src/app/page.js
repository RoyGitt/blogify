import Image from "next/image";
import styles from "./home.module.css";
import Link from "next/link";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>
          <span>Welcome to</span>
          <span>Blogify</span>
        </h1>
        <p className={styles.desc}>
          I write blogs once a year to keep the internet on its toes, a
          strategic move in the world of literary suspense.
        </p>
        <div className={styles.buttons}>
          <Link href="/about">
            <button className={styles.button}>Learn More</button>
          </Link>
          <Link href="/contact">
            <button className={styles.button}>Contact</button>
          </Link>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/hero.svg" alt="" fill className={styles.heroImg} />
      </div>
    </div>
  );
};

export default Home;
