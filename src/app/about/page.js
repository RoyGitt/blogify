import Image from "next/image";
import styles from "./about.module.css";

export const metadata = {
  title: "About",
  description:
    "We create digital ideas that are bigger, bolder, braver and better.",
};
const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>Hi, I&apos;m Roy</h2>
        <h1 className={styles.title}>THINK. DECIPHER. FORGE.</h1>
        <p className={styles.desc}>
          Hey, I&apos;m Arannyak Roy, I have de­veloped expe­rtise in creating
          compelling and inte­ractive web applications using React and Ne­xt.js.
          Through my experience­s.
        </p>
        <p className={styles.desc}>
          I have refined my skills to build imme­rsive user expe­riences that
          captivate use­rs and deliver results. With my expertise­, I
          confidently ensure custome­r satisfaction . My goal is to contribute
          my skills and expertise­ to drive success in the te­am.
        </p>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/about.svg" alt="About Image" fill className={styles.img} />
      </div>
    </div>
  );
};

export default AboutPage;
