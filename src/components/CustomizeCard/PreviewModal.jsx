import React, { useRef, useState } from "react";
import XIcon from "@duyank/icons/regular/X";
import { Preview } from "@lidojs/editor";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
import { Link, useParams } from "react-router-dom";

const PreviewModal = ({ onClose }) => {
  const componentRef = useRef(null);
  const params = useParams();

  const [pdfData, setPdfData] = useState(null);

  const handleDownloadPDF = async () => {
    const component = componentRef.current;
    if (component) {
      await htmlToImage.toPng(component, { quality: 0.95 }).then((dataUrl) => {
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        const pdfBlob = pdf.output("blob");
        setPdfData(pdfBlob);
        pdf.save("download.pdf");
      });
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1040,
        background: "rgba(13,18,22,.95)",
      }}
    >
      <div ref={componentRef}>
        <Preview />
      </div>
      <div
        style={{
          background: "#F0CDD4",
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          right: 24,
          top: 23,
          borderRadius: "50%",
          fontSize: 20,
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={onClose}
      >
        <XIcon />
      </div>
      <Link to={`/checkout/card/${params.id}`}>
        <div
          style={{
            background: "#F0CDD4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            right: 80,
            top: 24,
            color: "#fff",
          }}
          className="btn"
        >
          Checkout
        </div>
      </Link>
    </div>
  );
};

export default PreviewModal;
