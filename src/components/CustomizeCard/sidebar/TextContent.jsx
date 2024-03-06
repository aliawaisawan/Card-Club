import React from "react";
import XIcon from "@duyank/icons/regular/X";
import { isMobile } from "react-device-detect";
import { useEditor } from "@lidojs/editor";
import {
  addABodyText,
  addAHeading,
  addASubheading,
} from "../constants/text-effects";

const TextContent = ({ onClose }) => {
  const { actions } = useEditor();


  const handleAddText = (data) => {
    actions.addLayerTree(data);
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
          Text
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
        style={{ flexDirection: "column", overflowY: "auto", display: "flex" }}
      >
        <div
          style={{
            padding: 16,
            display: "flex",
            gap: 8,
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: 28,
              lineHeight: 1,
              padding: "16px 16px",
              fontWeight: 700,
              background: "#EBECF0",
              borderRadius: 4,
              cursor: "pointer",
            }}
            onClick={() => handleAddText(addAHeading)}
          >
            Add a heading
          </div>
          <div
            style={{
              fontSize: 18,
              lineHeight: 1,
              padding: "16px",
              fontWeight: 700,
              background: "#EBECF0",
              borderRadius: 4,
              cursor: "pointer",
            }}
            onClick={() => handleAddText(addASubheading)}
          >
            Add a subheading
          </div>
          <div
            style={{
              fontSize: 12,
              lineHeight: 1,
              padding: "16px",
              fontWeight: 700,
              background: "#EBECF0",
              borderRadius: 4,
              cursor: "pointer",
            }}
            onClick={() => handleAddText(addABodyText)}
          >
            Add a little bit of body text
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextContent;
