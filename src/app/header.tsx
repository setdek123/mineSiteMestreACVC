'use client';

import Link from "next/link";
import { useState } from "react";
import {MdComment, MdContactPage, MdGroup, MdAdminPanelSettings, MdClose, MdNoFood} from 'react-icons/md';

//caminho logo img "/img/Logo.png"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className=" xl:px-20 md:px-20 md:flex bg-green-700 md:bg-transparent md:justify-around  items-center justify-between px-20 flex md:items-center  fixed z-40 w-full">
      <div className="w-20 h-20 mt-2 -ml-13 p-2">
        <img src={"/img/Logo.png"} alt="photo"/>
      </div>
      <div className="md:flex md:flex-col hidden">
        <p className="text-xl font-bold text-white"><strong>Rua Comandante Rubens Silva, 253</strong></p>
        <p className="font-bold text-gray-300">Freguesia, Rio de Janeiro, RJ</p>
      </div>
      <div className="hidden md:flex md:gap-3 md:items-center">
        <Link className="text-white text-xl" href={'/about'}>Mestre</Link>
        <Link className="text-white text-xl" href={'/grounp'}>Turmas</Link>
        <Link className="text-white text-xl" href={'/contact'}>Contatos</Link>
        <Link className="text-white text-xl" href={'/login'}>AMD</Link>
        
      </div>
      <div className="absolute flex flex-col items-center gap-3 mr-7  right-0 top-1 w-full">
        <div className="flex ml-100 items-center duration-500 mt-7 md:hidden  ">
          <MdNoFood size={25} color="white"
          onClick={()=>setIsMenuOpen(!isMenuOpen)}
          />
        </div>

        <div className={isMenuOpen ? "flex gap-3 justify-center items-center md:hidden  ml-14 duration-500 bg-black mt-4.5 opacity-85 w-full" : "hidden "}
          style={{
            transform: 'transition: all 2.5s ease'
          }}
        >
          <Link className="text-white p-7" href={'/about'}>Mestre</Link>
          <Link className="text-white p-7" href={'/grounp'}>Turmas</Link>
          <Link className="text-white p-7" href={'/contact'}>Contatos</Link>
          <Link className="text-white p-7" href={'/login'}>AMD</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
