import XIcon from "@duyank/icons/regular/X";
import { useEventCallback } from "@lidojs/design-core";
import { useEditor } from "@lidojs/editor";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import Masonry from "react-responsive-masonry";
import { useAsync } from "react-use";

const GraphicContent = ({ onClose }) => {
  const qRef = useRef(null);
  const scrollRef = useRef(null);
  const dataRef = useRef(false);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const { actions } = useEditor();

  const loadGraphicList = useEventCallback(async (offset) => {
    dataRef.current = true;
    setIsLoading(true);
    const params = {
      limit: "100",
      offset: offset + "",
      q: keyword,
    };
    const response = await axios.get(
      `/graphics?${new URLSearchParams(params).toString()}`
    );
    if (offset) {
      setImages((prevState) => {
        prevState.push(...response.data);
        return prevState;
      });
    } else {
      setImages(response.data);
    }
    setIsLoading(false);
    if (response.data.length > 0) {
      dataRef.current = false;
    }
  });

  useAsync(async () => {
    await loadGraphicList(0);
  }, [loadGraphicList]);

  const handleLoadMore = useEventCallback(async (e) => {
    const node = e.target;
    if (
      node.scrollHeight - node.scrollTop - 80 <= node.clientHeight &&
      !dataRef.current
    ) {
      await loadGraphicList(images.length);
    }
  });

  useEffect(() => {
    scrollRef.current?.addEventListener("scroll", handleLoadMore);
    return () => {
      scrollRef.current?.removeEventListener("scroll", handleLoadMore);
    };
  }, [handleLoadMore]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    setKeyword(qRef.current?.value || "");
    setTimeout(async () => {
      await loadGraphicList(0);
    });
  };

  const addGraphic = async (item) => {
    const res = await axios.get(
      `/graphics/download?url=${window.encodeURIComponent(item.downloadUrl)}`
    );
    const file = res.data.file;
    const parser = new DOMParser();
    const ele = parser.parseFromString(file, "text/xml").documentElement;
    const viewBox = ele.getAttribute("viewBox")?.split(" ") || [];
    const width =
      viewBox.length === 4 ? +viewBox[2] : +(ele.getAttribute("width") || 100);
    const height =
      viewBox.length === 4 ? +viewBox[3] : +(ele.getAttribute("height") || 100);

    const svgBlob = new Blob([ele.outerHTML], {
      type: "image/svg+xml;charset=utf-8",
    });
    const svgUrl = URL.createObjectURL(svgBlob);
    actions.addSvgLayer(svgUrl, { width, height }, ele);
    if (isMobile) {
      onClose();
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
        overflowY: "auto",
        display: "flex",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          height: 48,
          borderBottom: "1px solid rgba(57,76,96,.15)",
          padding: "0 20px",
        }}
      >
        <p
          style={{
            lineHeight: "48px",
            fontWeight: 600,
            color: "#181C32",
            flexGrow: 1,
          }}
        >
          Stickers
        </p>
        <div
          style={{
            fontSize: 20,
            flexShrink: 0,
            width: 32,
            height: 32,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={onClose}
        >
          <XIcon />
        </div>
      </div>
      <div
        style={{
          flexDirection: "column",
          overflowY: "auto",
          display: "flex",
          flexGrow: 1,
        }}
      >
        <div
          style={{
            borderRadius: 4,
            boxShadow: "0 0 0 1px rgba(43,59,74,.3)",
            margin: 16,
          }}
        >
            <form onSubmit={handleSearch}>
              <input
                ref={qRef}
                className="form-control"
                type={"text"}
                placeholder="Search for stickers"
              />
            </form>
        </div>
        <div
          ref={scrollRef}
          style={{
            flexGrow: 1,
            overflowY: "auto",
            padding: "16px",
            gridGap: 8,
          }}
        >
          <Masonry columnsCount={4} gutter="20px">
            {images.map((item, idx) => (
              <div style={{ cursor: "pointer" }} onClick={() => addGraphic(item)}>
                <img key={item.id} loading="lazy" src={item.thumb} alt={idx} width={50} height={50} />
              </div>
            ))}
          </Masonry>
          {isLoading && <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
};

export default GraphicContent;
