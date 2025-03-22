import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

export default function Layout({
  children,
  title,
  description,
  keywords,
  author,
}) {
  return (
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content={description || "Default description"}
        />
        <meta name="keywords" content={keywords || "HTML, CSS, JavaScript"} />
        <meta name="author" content={author || "John Doe"} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title || "My title"}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
}
