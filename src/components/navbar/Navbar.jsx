import Link from "next/link";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import { auth } from "@/lib/auth";
import Image from "next/image";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className={styles.container}>
      <Link href="/" className={styles.logo}>
        <div className={styles.imgContainer}>
          <Image src="/logo.gif" fill className={styles.img} />
        </div>
      </Link>
      <div>
        <Links session={session} />
      </div>
    </header>
  );
};

export default Navbar;
