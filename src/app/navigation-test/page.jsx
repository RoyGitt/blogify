"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const NavigationPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    router.push("/");

    // Does not enters anything to the browsers history stack
    // router.replace("/");

    // router.back();
    // router.forward();
    // router.refresh();
    // router.refresh();
  };

  const q = searchParams.get("q");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Link href="/about">Click Here</Link>
      <p>{pathname}</p>
      <p>{q && q}</p>
      <button onClick={handleClick}>Click here</button>
    </div>
  );
};
export default NavigationPage;
