'use client';

import { FormEvent, useContext, useEffect, useState } from "react";
import Button from "../components/button";
import { FaUserCircle, FaWhatsapp } from "react-icons/fa";
import { AppContext } from "./context/page";
import api from "@/backend/api/api";


import whatsapp from '../../public/img/whatsapp.jpeg';

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext deve ser usado dentro do <Context> provider");
  }
  return context;
};

const Footer = () => {
  const {
    nameVisitor,
    setNameVisitor,
    msgVisitor,
    setMsgVisitor,
    errorMsg,
    setErrorMsg,
    ItemsUsers,
    setItemsUsers
  } = useAppContext();

  
  const InitCommits = async () => {
    try {
      const res = await api.get("/commits");
      if (res.status === 200) {
        setItemsUsers(res.data); 
      }
    } catch (err) {
      console.error("Erro ao buscar commits:", err);
      setErrorMsg("Erro ao carregar comentários do servidor.");
    }
  };

  useEffect(() => {
    InitCommits();
  }, []);

  // 🔹 Enviar comentário para o backend
  const CommitUsers = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (msgVisitor.trim() === "") {
      setErrorMsg("Digite uma mensagem antes de enviar!");
      return;
    }

    try {
      await api.post("/commits", { 
        commit: msgVisitor 
      });

      setMsgVisitor("");
      setErrorMsg("");

      
      await InitCommits();
    } catch (err) {
      console.error("Erro ao enviar commit:", err);
      setErrorMsg("Falha ao enviar o comentário!");
    }
  };

  return (
    <div className="flex min-h-screen flex-col p-10 items-center bg-[#081020] ">
      <h1 className="text-7xl mt-30 font-extrabold text-green-500 text-center mb-10">
        Deixe sua opinião sobre nosso site!
      </h1>

      {/* FORMULÁRIO */}
      <form onSubmit={CommitUsers} className="flex gap-5 mt-20 flex-wrap justify-center mb-10">
        

        <input
          type="text"
          className="bg-amber-50 p-4 rounded-md w-2xl"
          value={msgVisitor}
          onChange={(e) => setMsgVisitor(e.target.value)}
          placeholder="Insira seu comentário..."
        />

        <Button text="Comentar" size="p-3 w-40" onclickt={CommitUsers} />
      </form>

      {/* ERRO */}
      {errorMsg && <p className="text-red-400 text-2xl mb-10">{errorMsg}</p>}

      {/* LISTA DE COMENTÁRIOS */}
      <ul className="flex flex-col gap-6 mr-200 mt-10 w-full max-w-3xl">
        {ItemsUsers.map((item: any) => (
          <li
            key={item.id}
            className="flex items-center gap-5 bg-[#111a2e] p-4 rounded-md shadow-md border border-gray-700"
          >
            <FaUserCircle size={35} color="white" />
            <div className="flex flex-col">
              <p className="text-white font-bold">Visitante</p>
              <span className="text-gray-400">Comentário: {item.message}</span>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <a href="https://api.whatsapp.com/send/?phone=5521964933158&text=Ol%C3%A1%21+Gostaria+de+saber+mais+informa%C3%A7%C3%B5es+sobre+aulas+de+capoeira.&type=phone_number&app_absent=0">
          <FaWhatsapp
            color="green"
            size={90}
            className="fixed bottom-10 right-10  p-3 hover:size-30 cursor-pointer duration-500"
            
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
