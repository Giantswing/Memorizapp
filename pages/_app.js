import { useState } from "react";
import { Roboto } from "@next/font/google";
import { Space_Grotesk } from "@next/font/google";

const font_primary = Roboto({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["300", "400", "700"],
});

const font_secondary = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-secondary",
});

import styles from "/styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <main className={`${font_primary.variable} ${font_secondary.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
