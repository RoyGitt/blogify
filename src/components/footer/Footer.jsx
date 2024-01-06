import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Roy | Arannyak</div>
      <div className={styles.text}>
        I won't claim my rights unless someone copyright strike me
      </div>
    </div>
  );
};

export default Footer;
