import { Frame } from "@lidojs/screen";
import React, { useState, useRef, useEffect } from "react";
import { data } from "./utils/data";
import { getPageSize } from "@lidojs/core";
import { jsPDF } from "jspdf";
import * as htmlToImage from "html-to-image";
import Navigation from "../Navigation";
import Footer from "../Footer";
import { useNavigate, useParams } from "react-router-dom";

function GetPdf() {
  const params = useParams();
  const componentRef = useRef(null);
  const size = getPageSize(data);
  const navigate = useNavigate();

  useEffect(() => {
    const component = componentRef.current;
    if (component) {
      handleDownloadPDF();
    }
  }, []);

  const [pdfData, setPdfData] = useState(null);

  const handleDownloadPDF = () => {
    const component = componentRef.current;
    htmlToImage.toPng(component, { quality: 0.95 }).then((dataUrl) => {
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      const pdfBlob = pdf.output("blob");
      setPdfData(pdfBlob);
      // pdf.save("download.pdf");
    });
  };

  return (
    <>
      <Navigation />
      <div className="container">
        <header className="d-flex w-100 flex-row p-2">
          <nav className="d-flex w-100 flex-wrap justify-content-center justify-content-between align-items-center">
            <span>
              <p className="fs-3 fw-bold mb-0">Customized Card</p>
              <p className="text-sm fw-lighter">Preview your Card</p>
            </span>
            {pdfData && (
              <span>
                <button
                  className="btn btn-block btn-login bg-pink btn-lg text-white"
                  onClick={() => navigate("/checkout/card/" + params.id.toString())}
                >
                  Place Order
                </button>
              </span>
            )}
          </nav>
        </header>
      </div>
      <div ref={componentRef}>
        <div
          style={{
            minWidth: "100vw",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Frame width={size.width} height={size.height} data={data} />
        </div>
      </div>
      {pdfData && (
        <a href={URL.createObjectURL(pdfData)} download="download.pdf">
          Download PDF from State
        </a>
      )}
      <Footer />
    </>
  );
}

export default GetPdf;
