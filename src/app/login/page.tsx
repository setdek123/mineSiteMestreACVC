'use client';

import api from '@/backend/api/api';
import { FormEvent, useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

import { useRouter } from 'next/navigation'


const Login = () => {
    const [login, setLogin] = useState<string>('');
    const [passw, setPassw] = useState<string>('');
    const [msgError, setMsgError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter()

    const HandlerSubimit = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        
       

        try{
            const response = await api.post('/login',{
                email: login,
                passw: passw
            });
            
            if(response.status === 200){
                console.log('Usuário Logado com sucesso!');
                router.push('/dashboard')
                setLoading(true);
                
            }

        }catch(err){
            setMsgError('Error ao Fazer solicitação ao servidor.');
            console.log('error na requisição', err);
        }

    }


    return (
        <div className="flex min-h-screen flex-col bg-amber-50 items-center justify-center">
            <div className='flex pb-30'>
                <h1 className='font-extrabold text-5xl text-gray-700'>Access ADMIN</h1>
            </div>
            <form onSubmit={HandlerSubimit} className="flex flex-col gap-5 border border-gray-200 bg-white shadow-2xl w-100 h-100 items-center justify-center ">
                <div className='flex gap-5 items-center'>
                    <FaUser size={20} color='gray'/>
                    <input type="text" 
                        placeholder="Login"
                        className="p-3 border border-gray-400"
                        value={login}
                        onChange={(e)=>setLogin(e.target.value)}
                    />
                </div>
                <div className="flex gap-5 items-center">
                    <FaLock size={20} color='gray'/>
                    <input type="password" 
                        placeholder="Password..."
                        className="p-3 border border-gray-400"
                        value={passw}
                        onChange={(e)=>setPassw(e.target.value)}
                    />
                </div>
                <div>
                    <p className='text-red-600'>{msgError}</p>
                </div>
                <div className="flex mt-20">
                    <button type='submit' className="flex w-65 text-white font-bold p-2 items-center justify-center bg-green-500">{loading ? 'Loading...' : 'Log in'}</button>
                </div>
            </form>
        </div>
    )
};

export default Login;