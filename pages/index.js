import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import ScrollToTopButton from "/components/ScrollToTopButton";
import AppHeader from "/components/AppHeader";
import OptionsHeader from "/components/OptionsHeader";
import HiddenWordsDisplay from "/components/HiddenWordsDisplay";

import HidePercentInput from "/components/HidePercentInput";
import HideButton from "/components/HideButton";
import InputCheckbox from "/components/InputCheckbox";
import SaveContentButton from "/components/SaveContentButton";
import RestoreContentButton from "/components/RestoreContentButton";
import CompareButton from "/components/CompareButton";
import DropdownMenu from "/components/DropdownMenu";

import PopUpMessage from "/components/PopUpMessage";

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

  const [hiddenContent, setHiddenContent] = useState({
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
  const [popUpMessageContent, setPopUpMessageContent] = useState({
    text: "",
    type: "positive",
    forceUpdate: 0,
  });
  const [showHiddenContent, setShowHiddenContent] = useState(false);

  const [hideOptions, setHideOptions] = useState([
    {
      title: "hideFirstAndLast",
      description: "No ocultar la primera y última palabra de cada párrafo",
      value: true,
    },
    {
      title: "hideShortWords",
      description: "Ocultar palabras cortas (tres letras o menos)",
      value: false,
    },
  ]);

  function CallbackUpdateText() {
    setUpdateText(true);
  }

  function UpdateSavedContent() {
    if (content !== savedContent) {
      setPopUpMessageContent({
        text: "Contenido guardado",
        type: "positive",
        forceUpdate: popUpMessageContent.forceUpdate + 1,
      });
    } else {
      setPopUpMessageContent({
        text: "El contenido es el mismo que el guardado",
        type: "warning",
        forceUpdate: popUpMessageContent.forceUpdate + 1,
      });
    }

    if (
      content != "" &&
      content.blocks.length != 0 &&
      content.blocks[0].text != ""
    ) {
      //check text to see if there are underscores
      var thereAreGaps = false;

      for (let i = 0; i < content.blocks.length; i++) {
        const underscoreRegex = / /g;
        const underscoreMatch = content.blocks[i].text.match(underscoreRegex);
        if (underscoreMatch != null) {
          thereAreGaps = true;
        }
      }

      if (!thereAreGaps) {
        for (let i = 0; i < content.blocks.length; i++) {
          //draft js, remove inline styles only if the style is called UNDERSCORES
          content.blocks[i].inlineStyleRanges = content.blocks[
            i
          ].inlineStyleRanges.filter((style) => style.style != "UNDERSCORES");
        }

        setHiddenContent({ blocks: [], entityMap: {} });
        setSavedContent(content);
        CallbackUpdateText();
      } else {
        setPopUpMessageContent({
          text: "El texto contiene espacios sin rellenar, restaura o rellénalos primero",
          type: "negative",
          forceUpdate: popUpMessageContent.forceUpdate + 1,
        });
      }
    } else {
      setPopUpMessageContent({
        text: "No hay contenido para guardar",
        type: "negative",
        forceUpdate: popUpMessageContent.forceUpdate + 1,
      });
    }

    console.log(popUpMessageContent);
  }

  function RemoveUnderscoreStyle() {
    //GO THROUGH THE CONTENT AND REMOVE UNDERSCORES INLINE STYLING
    var contentWithoutUnderscores = JSON.parse(JSON.stringify(content));

    contentWithoutUnderscores.inlineStyleRanges = [];
  }

  function RestoreSavedContent() {
    setContent(savedContent);
    const restoredSavedContent = JSON.parse(JSON.stringify(savedContent));
    setSavedContent(restoredSavedContent);
    setUpdateText(true);

    if (showHiddenContent) {
      setShowHiddenContent(!showHiddenContent);
    }

    setHiddenContent({ blocks: [], entityMap: {} });

    setPopUpMessageContent({
      text: "Contenido restaurado",
      type: "positive",
      forceUpdate: popUpMessageContent.forceUpdate + 1,
    });
  }

  function ClearContent() {
    //clear blocks
    setContent({ blocks: [], entityMap: {} });
    setUpdateText(true);
  }

  function CompareContent() {
    //toggle show hidden words

    if (
      hiddenContent.blocks.length != 0 &&
      hiddenContent.blocks[0].text != ""
    ) {
      setShowHiddenContent(!showHiddenContent);
    } else {
      setPopUpMessageContent({
        text: "No hay palabras ocultas para mostrar",
        type: "negative",
        forceUpdate: popUpMessageContent.forceUpdate + 1,
      });
    }
  }

  function OptionsHeader() {
    return (
      <div className="c-options o-container o-container--fluid">
        <div className="o-container">
          <HidePercentInput {...{ deletePercent, setDeletePercent }} />
          <HideButton
            {...{
              CallbackUpdateText,
              content,
              setContent,
              deletePercent,
              savedContent,
              setSavedContent,
              setHiddenContent,
              hideOptions,
            }}
          />
          <DropdownMenu title="Opciones">
            <InputCheckbox
              title="hideFirstAndLast"
              hideOptions={hideOptions}
              setHideOptions={setHideOptions}
            />
            <InputCheckbox
              title="hideShortWords"
              hideOptions={hideOptions}
              setHideOptions={setHideOptions}
            />
          </DropdownMenu>

          <span className="u-barely-visible">|</span>
          <SaveContentButton {...{ UpdateSavedContent }} />
          <RestoreContentButton {...{ RestoreSavedContent }} />
          <CompareButton
            {...{ showHiddenContent, hiddenContent, CompareContent }}
          />
        </div>
      </div>
    );
  }

  useEffect(() => {
    const allspans = document.querySelectorAll("span");
    allspans.forEach((span) => {
      span.classList.remove("c-hidden-word");
    });

    setTimeout(() => {
      const spans = document.querySelectorAll("span[data-tooltip]");
      spans.forEach((span) => {
        if (showHiddenContent) {
          span.classList.add("c-hidden-word");
        }
      });
    }, 100);
  }, [showHiddenContent, hiddenContent, content]);

  return (
    <div className="App">
      <Head>
        <title>Memorizapp</title>
        <meta charSet="utf-8" />
      </Head>

      <AppHeader />

      {OptionsHeader()}

      <main className="o-container">
        <h4 className="input-description">
          Usa la tecla <span className="c-key-display">Tab</span> para moverte y
          seleccionar los huecos ( ___ )
        </h4>
        <RTETextEditor
          updateText={updateText}
          setUpdateText={setUpdateText}
          setContent={setContent}
          content={content}
          savedContent={savedContent}
          showHiddenContent={showHiddenContent}
          hiddenContent={hiddenContent}
        />
      </main>

      <ScrollToTopButton />

      <PopUpMessage {...{ popUpMessageContent }} />
    </div>
  );
}

export default Home;
