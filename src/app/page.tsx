'use client';

import Footer from "./footer";
import Header from "./header";
import Main from "./main";
import Context from "./context/page";
import api from "@/backend/api/api";
import { useEffect } from "react";

// Aos Animation
import 'aos/dist/aos.css';



export default function Home() {

  const InitAccessSite =  () => {
    const AccessS = api.post('/visita');
    if(!AccessS){
      console.log('Erro ao receber acesso do site!');
    }
  }

  useEffect(()=>{
    InitAccessSite();
  }, []);

  return (
    <Context>
      <Header/>
      <Main/>
      <Footer/>
    </Context>
  );
}
