'use client';

// api
import api from "@/backend/api/api";
// ------------------------------------------

import { useEffect, useState } from "react";
import { FaTrash } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { useRouter } from "next/navigation";

interface Commit {
  id: number;
  message: string;
}

interface Stac {
  id: number;
  data: string;
  total: number;
  dia: string;
  mes: string;
  ano: string;
  hora: string;
}

const Dashboard = () => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [statiscs, setStatistics] = useState<Stac[]>([]);
  const [error, setError] = useState<string>("");

  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    if (!storedToken) {
      router.push('/');
    }
  }, [router]);

  
  useEffect(() => {
    if (!token) return;

    const fetchCommits = async () => {
      try {
        const res = await api.get("/commits", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCommits(res.data);
      } catch (err) {
        console.error("Erro ao buscar commits:", err);
        setError("Falha ao carregar commits do banco de dados.");
      }
    };

    fetchCommits();
  }, [token]);


  useEffect(() => {
    if (!token) return;

    const fetchStatistics = async () => {
      try {
        const res = await api.get("/visitas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStatistics(res.data);
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
      }
    };

    fetchStatistics();
  }, [token]);

  
  const DeleteCommits = async (id: number) => {
    try {
      const respo = await api.delete(`/commits/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (respo.status === 200) {
        setCommits(prev => prev.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Erro ao deletar comentário.', error);
    }
  };

  
  const LogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const totalVisitas = statiscs.reduce((acc, item)=>acc + item.total, 0);



  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-4xl font-extrabold mb-6 text-gray-700">
          Painel do Administrador
        </h1>
        <MdLogout
          onClick={LogOut}
          className="md:w-15 md:h-15 w-10 h-10 -mt-5 text-gray-600 cursor-pointer"
        />
      </div>

      <div className="border border-gray-300 w-full h-200 mt-80 md:mt-0 flex gap-10">
        {error && <p className="text-red-600">{error}</p>}

        <div>
          <div className="flex items-center justify-center mt-5 mb-5">
            <p className="text-xl font-bold text-gray-600">
              Comentários do Site
            </p>
          </div>

          {commits.length > 0 ? (
            <ul className="space-y-2 border  border-gray-300 p-2 h-183 w-77">
              {commits.map(item => (
                <li
                  key={item.id}
                  className="bg-gray-100 p-3 shadow-lg hover:shadow-2xl hover:bg-amber-50 cursor-pointer flex justify-between rounded-md border border-gray-300"
                >
                  <p>{item.message}</p>
                  <FaTrash
                    size={20}
                    color="red"
                    onClick={() => DeleteCommits(item.id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-2xl flex justify-center mt-20 text-gray-500">
              Ainda não há comentários no site!
            </p>
          )}
        </div>

        <div className="md:flex md:flex-row absolute -mt-65 md:items-center md:gap-20 flex flex-col gap-15 justify-center md:ml-130 md:mt-60">
          <div>
            <span className="md:text-6xl font-extrabold text-3xl">Total de visitas</span>
          </div>
          
          <div>
            <p className={ totalVisitas >= 100 ? "text-8xl font-extrabold text-green-500" : totalVisitas <= 10 ? "text-red-500" : "text-8xl font-extrabold"}>{totalVisitas}</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
