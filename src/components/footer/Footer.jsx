import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Roy</div>
      <div className={styles.text}>
        Nostrud elit commodo officia eiusmod aliquip dolor.
      </div>
    </div>
  );
};

export default Footer;
