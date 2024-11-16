import { PageLoader } from "@/Components/Loader";
import Navabr from "@/Components/Navbar";
import Scrollbar from "@/Components/Scrollbar";
import themeChange from "@/Functions/themeChange";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return<>
    <Scrollbar/>
    <PageLoader/>
    <Navabr title='Chat-Bot' themeChange={themeChange}/>
    <Component {...pageProps} />
  </>
}
