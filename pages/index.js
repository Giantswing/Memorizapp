import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import AppHeader from "/components/AppHeader";

import dynamic from "next/dynamic";
const TextEditor = dynamic(() => import("/components/TextEditor"), {
  ssr: false,
});

const RTETextEditor = dynamic(() => import("/components/RTETextEditor"), {
  ssr: false,
});
function Home() {
  const [content, setContent] = useState("");

  return (
    <div className="App">
      <Head>
        <title>Memorizapp</title>
        <meta charset="utf-8" />
      </Head>

      <AppHeader />

      <main className="o-container">
        <h2>Introduce debajo el texto a memorizar:</h2>
        <RTETextEditor setContent={setContent} />
      </main>
    </div>
  );
}

export default Home;
