"use client";

import { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navlink/Navlink";
import Image from "next/image";
import { handleLogout } from "@/lib/action";
import { useRouter } from "next/navigation";
import { MdOutlineMenuOpen } from "react-icons/md";
import { MdClose } from "react-icons/md";

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

      {open ? (
        <MdClose
          onClick={() => setOpen((prev) => !prev)}
          style={{ fontSize: 40 }}
        />
      ) : (
        <MdOutlineMenuOpen
          onClick={() => setOpen((prev) => !prev)}
          style={{ fontSize: 40 }}
          className={styles.menuButton}
        />
      )}

      {true && (
        <div
          className={styles.mobileLinks}
          style={{ transform: open ? "translateX(0%)" : "" }}
        >
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
