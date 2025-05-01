import Alert from "@/Components/Alert";
import { PageLoader } from "@/Components/Loader";
import Scrollbar from "@/Components/Scrollbar";
import "@/styles/globals.css";
import AppContextProvider from "@/Contexts/AppContext";


export default function App({ Component, pageProps }) {

  return<>
    <AppContextProvider>
      <Scrollbar/>
      <PageLoader/>
      <Alert/>
      <Component {...pageProps} />
    </AppContextProvider>
  </>
}
