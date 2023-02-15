import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import ScrollToTopButton from "/components/ScrollToTopButton";
import AppHeader from "/components/AppHeader";
import OptionsHeader from "/components/OptionsHeader";

import dynamic from "next/dynamic";

const RTETextEditor = dynamic(() => import("/components/RTETextEditor"), {
  ssr: false,
});
function Home() {
  const [content, setContent] = useState("");
  const [savedContent, setSavedContent] = useState({
    blocks: [
      {
        key: "e6dsf",
        text: "",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  });
  const [deletePercent, setDeletePercent] = useState(45);
  const [updateText, setUpdateText] = useState(false);

  function CallbackUpdateText() {
    setUpdateText(true);
  }

  function UpdateSavedContent() {
    setSavedContent(content);
    console.log("saved content updated");
  }

  function RestoreSavedContent() {
    setContent(savedContent);
    const restoredSavedContent = JSON.parse(JSON.stringify(savedContent));
    setSavedContent(restoredSavedContent);
    setUpdateText(true);
  }

  function ShowSavedContent() {
    console.log(savedContent);
  }

  function ClearContent() {
    //clear blocks
    setContent({ blocks: [], entityMap: {} });
    setUpdateText(true);
  }

  return (
    <div className="App">
      <Head>
        <title>Memorizapp</title>
        <meta charSet="utf-8" />
      </Head>

      <AppHeader
        CallbackUpdateText={CallbackUpdateText}
        content={content}
        setContent={setContent}
        deletePercent={deletePercent}
        setDeletePercent={setDeletePercent}
        saveContentCallback={UpdateSavedContent}
        savedContent={savedContent}
        setSavedContent={setSavedContent}
        restoreSavedContentCallback={RestoreSavedContent}
      />

      <OptionsHeader
        CallbackUpdateText={CallbackUpdateText}
        content={content}
        setContent={setContent}
        deletePercent={deletePercent}
        setDeletePercent={setDeletePercent}
        saveContentCallback={UpdateSavedContent}
        savedContent={savedContent}
        setSavedContent={setSavedContent}
        restoreSavedContentCallback={RestoreSavedContent}
      />

      <main className="o-container">
        <h4 className="input-description">
          Usa la tecla Tabulador (Tab) para moverte y seleccionar los huecos
        </h4>
        <RTETextEditor
          updateText={updateText}
          setUpdateText={setUpdateText}
          setContent={setContent}
          content={content}
        />
      </main>

      <ScrollToTopButton />
    </div>
  );
}

export default Home;
