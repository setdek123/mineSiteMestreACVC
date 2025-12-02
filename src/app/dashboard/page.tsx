'use client';

//api
import api from "@/backend/api/api";
// ------------------------------------------

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaTrash } from 'react-icons/fa';


interface Commit {
  id: number;
  message: string;
}

interface Stac {
  id: number,
  data: string,
  total: number,
  dia: string,
  mes: string,
  ano: string,
  hora: string,
  statiscs: string[]
  setStatistics: Dispatch<SetStateAction<Stac[]>>
  
};



const Dashboard = () => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [error, setError] = useState<string>("");

  const [statiscs, setStatistics] = useState<Stac[]>([]);

  // variaveis dos meses

  const [janeiro, setJaneiro] = useState<number>(1);
  const [fevereiro, setFevereiro] = useState<number>(2);
  const [marco, setMarco] = useState<number>(3);
  const [maio, setMaio] = useState<number>(4);
  const [junho, setJunho] = useState<number>(5);
  const [julho, setJulho] = useState<number>(6);
  const [agosto, setAgosto] = useState<number>(7);
  const [setembro, setSetembro] = useState<number>(8);
  const [outubro, setOutubro] = useState<number>(9);
  const [novembro, setNovenbro] = useState<number>(10);
  const [dezembro, setDezembro] = useState<number>(11);
 

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/commits");
        setCommits(res.data);
      } catch (err) {
        console.error("Erro ao buscar commits:", err);
        setError("Falha ao carregar commits do banco de dados.");
      }
    };

    fetchData();
  }, []);


  // Pegando Statiticas do site;

  

  useEffect(() => {
    const ResStatisticas = async () => {
      const res = await api.get('visitas');
      if(!res) return console.log('Error na requisição!');
  
      setStatistics(res.data);
      console.log(res.data[0].mes);
      
      
    };

    ResStatisticas();

  }, []);



  const DeleteCommits = async (id: number) => {
    try {
      const respo = await api.delete(`/commits/${id}`);
      if (respo.status === 200) {
        console.log('Comentario deletado!');
      }
    } catch (error) {
      console.error('Erro ao deletar Comententario.', error);
    }

    setCommits((prev) => prev.filter(item => item.id !== id));

  }


  

 


  return (
    <div className="p-10">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-700">Painel do Administrador</h1>
      
      <div className="border border-gray-300 w-ful h-200 flex  gap-10 ">
        {error && <p className="text-red-600">{error}</p>}
        <div>
          <div className="flex items-center justify-center mt-5 mb-5">
            <p className="text-xl font-bold text-gray-600">Comentários do Site</p>
          </div>

          {commits.length > 0 ? (
            <ul className="space-y-2 border border-gray-300 p-2 h-183 w-100" >
              {commits.map((item) => (
                <li
                  key={item.id}
                  className="bg-gray-100 p-3 shadow-lg hover:shadow-2xl hover:bg-amber-50 cursor-pointer   flex justify-between rounded-md border border-gray-300"
                >
                  <p>{item.message}</p>
                  <FaTrash size={20} className="" color="red" onClick={() => DeleteCommits(item.id)} />
                </li>
              ))}
            </ul>
          ) : <p className="text-2xl items-center justify-center flex mt-20 text-gray-500">Ainda não Há comentários no site!</p>}
        </div>
        
          <div className="flex absolute items-center justify-center ml-130 mt-60">
              {statiscs.map((item)=>(
                <div key={item.id} className="border border-gray-300 p-1 px-10">
                  <p className="text-6xl font-bold text-gray-600">Total de visitas: <span className="font-extrabold text-8xl">{item.total}</span></p>
                </div>
              ))}
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
