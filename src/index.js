import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Pages/Loading";
import { ToastContainer } from "react-toastify";
import * as ServiceWorker from "./serviceWorkerRegistration";

const production = false;
const root = createRoot(document.getElementById("root"));

if (process.env.NODE_ENV === "production" || production) {
    console = {
        log: () => false,
        count: () => false,
        warn: () => false,
        error: () => false,
    };
}

root.render(
    <BrowserRouter hashType="hashbang">
        <Suspense fallback={<Loading />}>
            <ToastContainer limit={3} />
            <Router />
        </Suspense>
    </BrowserRouter>
);

ServiceWorker.register();
