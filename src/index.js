import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import reportWebVitals from "./utils/reportWebVitals";
import PageNavigation from "./components/navigation/PageNavigation";
import { ContextProvider } from "./context/ContextProvider";
import Layout from "./template/Layout";
import "./css/App.css";

ReactDOM.render(
  <React.StrictMode>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossOrigin="anonymous"
    />
    <main>
      <Router>
        <ContextProvider>
          <Layout>
            <PageNavigation />
          </Layout>
        </ContextProvider>
      </Router>
    </main>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
