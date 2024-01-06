"use client";

import Image from "next/image";
import styles from "./contact.module.css";
// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
import { sendMessage } from "@/lib/action";
import { useFormState } from "react-dom";
import { useEffect } from "react";

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

  const [state, formAction] = useFormState(sendMessage, undefined);

  return (
    <div className={styles.container}>
      {/* {num && a}
      <HydrationNoSSR />
      <p suppressHydrationWarning>{a}</p> */}
      <div className={styles.imgContainer}>
        <Image src="/contact.svg" alt="" fill className={styles.img} />
      </div>
      <div className={styles.formContainer}>
        <form action={formAction} className={styles.form}>
          <input type="text" placeholder="Name" name="name" />
          <input type="text" placeholder="Email Address" name="email" />
          <input
            type="text"
            placeholder="Phone Number (Optional)"
            name="phone"
          />
          <textarea
            name="message"
            cols="30"
            rows="10"
            placeholder="Message"
          ></textarea>
          <button>Send</button>
        </form>
        {state?.error && <p className={styles.success}>{state.error}</p>}
        {state?.success && <p className={styles.success}>{state.success}</p>}
      </div>
    </div>
  );
};

export default ContactPage;
