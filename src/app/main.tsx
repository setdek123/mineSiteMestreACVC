'use client';

import { useEffect, useState } from "react";
import Button from "../components/button";
import About from "./about/page";
import Grounp from "./grounp/page";
 
//Aos Animation
import AOS from 'aos';



import { useRouter } from 'next/navigation'

const ListBg = [
  '/img/img-1.jpg',
  '/img/img-2.jpg',
  '/img/img-3.jpg',
  '/img/img-5.jpg'
];



const Main = () => {
  const [changeBg, setChangeBg] = useState<string>(ListBg[0]);

  const router = useRouter()

  const Exchange = () => {
    const Mt = Math.floor(Math.random() * ListBg.length);
    setChangeBg(ListBg[Mt]);
  };

  useEffect(() => {
    // Aos Animation Init

    AOS.init({
      duration: 800,   // duração da animação
      once: false,          // anima TODA vez que rolar
      mirror: false,        // não anima ao voltar
      offset: 120,          // distância para ativar     // anima só uma vez
      easing: 'ease-in-out',
    });

    AOS.refresh();


    const interval = setInterval(() => {
      Exchange();
    }, 5000);
    return () => clearInterval(interval);
  }, []);



  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#081020] overflow-hidden">
        <div
          style={{
            backgroundImage: `linear-gradient(to top, #081020 1% , rgba(0,0,0,0.5)), url(${changeBg})`,
          }}
          className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-700"
        ></div>

       

        <div className="relative flex flex-col mt-15 items-start gap-6 px-6 sm:px-10 md:px-20 lg:px-40 py-35 md:py-32 text-left">
          <h1 data-aos="fade-down" className="text-white text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold max-w-[90%] md:max-w-[70%] leading-tight drop-shadow-lg">
            Venha fazer uma aula experimental!
          </h1>

          <h2 className="text-gray-300 text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-medium drop-shadow-md" data-aos="fade-right" data-aos-delay="500">
            Capoeira muda o mundo!
          </h2>

          <div className="z-10 sm:mt-10 ml-18 mt-20" data-aos="zoom-in">
            <Button   text="Saiba mais" size="p-3 px-6 sm:px-10" onclickt={()=>router.push('/aboutmore')}/>
          </div>
        </div>
      </div>

      <div>
        {/* Page About */}
        <About />
        {/* Page turmas */}
        <Grounp />
      </div>
    </>
  );
};

export default Main;
