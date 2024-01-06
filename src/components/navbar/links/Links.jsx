"use client";

import { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navlink/Navlink";
import Image from "next/image";
import { handleLogout } from "@/lib/action";
import { useRouter } from "next/navigation";

const links = [
  {
    title: "Homepage",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];

const Links = ({ session }) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}

        {session?.user.isAdmin && (
          <NavLink item={{ title: "Admin", path: "/admin" }} />
        )}

        {session ? (
          <form action={handleLogout}>
            <button className={styles.logout}>Logout</button>
          </form>
        ) : (
          <button
            className={styles.login}
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </button>
        )}
      </div>
      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} onClickLink={setOpen} />
          ))}
          {session?.user.isAdmin && (
            <NavLink item={{ title: "Admin", path: "/admin" }} />
          )}
        </div>
      )}
    </div>
  );
};

export default Links;
