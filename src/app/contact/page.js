"use client";

import Image from "next/image";
import styles from "./contact.module.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// const HydrationNoSSR = dynamic(
//   () => import("@/components/hydrationTest/HydrationTest"),
//   {
//     ssr: false,
//   }
// );

// const a = Math.random();

const ContactPage = () => {
  // const [num, setNum] = useState(false);

  // useEffect(() => {
  //   if (num === false) {
  //     setNum(true);
  //   }
  // }, []);

  return (
    <div className={styles.container}>
      {/* {num && a}
      <HydrationNoSSR />
      <p suppressHydrationWarning>{a}</p> */}
      <div className={styles.imgContainer}>
        <Image src="/contact.png" alt="" fill className={styles.img} />
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <input type="text" placeholder="Name and Surname" />
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="Phone Number (Optional)" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Message"
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
