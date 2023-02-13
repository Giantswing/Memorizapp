import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Header from "/components/AppHeader";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  return (
    <div className="App">
      <Head>
        <title>Memorizapp</title>
      </Head>

      <Header />

      <main className="o-container">
        <h1>Memorizapp5</h1>
        <p>Memorizapp3</p>
      </main>
    </div>
  );
}

export default Home;
