import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Editor, PageControl } from "@lidojs/editor";
import HeaderLayout from "./HeaderLayout";
import PreviewModal from "./PreviewModal";
import Sidebar from "./Sidebar";
import AppLayerSettings from "./AppLayerSettings";
import EditorContent from "./EditorContent";

function Main() {
  const leftSidebarRef = useRef(null);
  const [openPreview, setOpenPreview] = useState(false);

  const getFonts = useCallback((query) => {
    const buildParams = (data) => {
      const params = new URLSearchParams();

      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.append(key, value);
        }
      });
      return params;
    };
    return axios.get(`/fonts?${buildParams(query)}`).then((res) => res.data);
  }, []);

  const [viewPortHeight, setViewPortHeight] = useState();

  useEffect(() => {
    const windowHeight = () => {
      setViewPortHeight(window.innerHeight);
    };
    window.addEventListener("resize", windowHeight);
    windowHeight();
    return () => {
      window.removeEventListener("resize", windowHeight);
    };
  }, []);

  return (
    <Editor
      config={{
        assetPath: "./assets",
        frame: {
          defaultImage: {
            url: `./assets/images/frame-placeholder.png`,
            width: 1200,
            height: 800,
          },
        },
      }}
      getFonts={getFonts}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          height: "100vh",
          maxHeight: viewPortHeight ? `${viewPortHeight}px` : "auto",
        }}
      >
        <HeaderLayout openPreview={() => setOpenPreview(true)} />
        {openPreview && <PreviewModal onClose={() => setOpenPreview(false)} />}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flex: "auto",
            overflow: "auto",
            background: "#EBECF0",
            "@media (max-width: 900px)": {
              flexDirection: "column-reverse",
            },
          }}
        >
          <div
            ref={leftSidebarRef}
            style={{
              display: "flex",
              background: "white",
            }}
          >
            <Sidebar />
          </div>
          <div
            style={{
              flexGrow: 1,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
            }}
          >
            <AppLayerSettings />
            <div
              style={{
                flexGrow: 1,
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <EditorContent />
            </div>
            <div
              style={{
                height: 40,
                background: "#fff",
                borderTop: "1px solid rgba(57,76,96,.15)",
                display: "grid",
                alignItems: "center",
                flexShrink: 0,
                "@media (max-width: 900px)": {
                  display: "none",
                },
              }}
            >
              <PageControl />
            </div>
          </div>
        </div>
      </div>
    </Editor>
  );
}

export default Main;
