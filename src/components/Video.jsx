import React, { useEffect } from "react";

export default function Video() {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://fast.wistia.com/embed/medias/4dw26jr313.jsonp";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://fast.wistia.com/assets/external/E-v1.js";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="flex justify-center w-full my-6">
      {/* ✅ Aspect-ratio box */}
      <div className="relative w-11/12 md:w-4/5 overflow-hidden">
        <div style={{ paddingTop: "56.25%" }} /> {/* ratio keeper */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="wistia_embed wistia_async_4dw26jr313 videoFoam=true autoPlay=true endVideoBehavior=loop"
            style={{ height: "100%", width: "100%" }}
          >
            &nbsp;
          </div>
        </div>
      </div>
    </div>
  );
}
