'use client';

import api from "@/backend/api/api";
import { useEffect, useState } from "react";
import { FaTrash } from 'react-icons/fa';

interface Commit {
  id: number;
  message: string;
}

const Dashboard = () => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [error, setError] = useState<string>("");

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

  const DeleteCommits = async (id: number) => {
    try{
      const respo = await api.delete(`/commits/${id}`);
      if(respo.status === 200){
        console.log('Comentario deletado!');
      }
    }catch(error){
      console.error('Erro ao deletar Comententario.', error);
    }

    setCommits((prev)=> prev.filter(item => item.id !== id));

  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {error && <p className="text-red-600">{error}</p>}

      {commits.length > 0 ? (
        <ul className="space-y-2 " >
          {commits.map((item) => (
            <li
              key={item.id}
              className="bg-gray-100 p-3 shadow-lg hover:shadow-2xl hover:bg-amber-50 cursor-pointer   flex justify-between rounded-md border border-gray-300"
            >
              <p>{item.message}</p>
              <FaTrash size={20} className="" color="red" onClick={()=>DeleteCommits(item.id)}/>
            </li>
          ))}
        </ul>
      ) : <p className="text-2xl items-center justify-center flex mt-20 text-gray-500">Ainda não existem nenhum comentário no site!</p>}
    </div>
  );
};

export default Dashboard;
