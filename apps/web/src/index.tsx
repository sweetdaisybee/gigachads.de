import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import { GigaContact, GigaHome, GigaNotFound, GigaSocial, GigaSponsors } from "@views/index.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider  } from "react-helmet-async";
import { GigaCanonical } from "@components/index.js";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <GigaCanonical />
        <Routes>
          <Route path="*" element={<GigaNotFound />}/>
          <Route path="/" element={<GigaHome />} />
          <Route path="/sponsors" element={<GigaSponsors />} />
          <Route path="/social" element={<GigaSocial />} />
          <Route path="/contact" element={<GigaContact />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
