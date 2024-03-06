import React from "react";
import PlayCircleIcon from "@duyank/icons/regular/PlayCircle";

const HeaderLayout = ({ openPreview }, ref) => {

  return (
    <div
      ref={ref}
      style={{
        background: "#FFFFFF",
        padding: "12px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          color: "#3d8eff",
          fontSize: 36,
        }}
      ></div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#fff",
            lineHeight: 1,
            background: "#F2CFD4",
            padding: "8px 14px",
            borderRadius: 8,
            cursor: "pointer",
          }}
          onClick={openPreview}
        >
          <div style={{ marginRight: 4, fontSize: 20 }}>
            <PlayCircleIcon />
          </div>{" "}
          Preview
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(HeaderLayout);
