import Alert from "@/Components/Alert";
import { PageLoader } from "@/Components/Loader";
import Scrollbar from "@/Components/Scrollbar";
import "@/styles/globals.css";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [alerts, setAlert] = useState([])
  const [isLogin, setLogin] = useState(false)
  return<>
    <Scrollbar/>
    <PageLoader/>
    <Alert alerts={alerts} />
    <Component {...pageProps} setAlert={setAlert}  />
  </>
}
