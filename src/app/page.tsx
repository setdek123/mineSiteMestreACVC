import Footer from "./footer";
import Header from "./header";
import Main from "./main";
import Context from "./context/page";


export default function Home() {
  return (
    <Context>
      <Header/>
      <Main/>
      <Footer/>
    </Context>
  );
}
