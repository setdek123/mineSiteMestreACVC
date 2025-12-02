'use client';

import api from '@/backend/api/api';
import { FormEvent, useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

import { useRouter } from 'next/navigation'


const Login = () => {
    const [login, setLogin] = useState<string>('');
    const [passw, setPassw] = useState<string>('');
    const [loginErrorM, setLoginErrorM] = useState<boolean>(false);
    const [passwErrorM, setPasswErrorM] = useState<boolean>(false);
    const [padm, setPAdm] = useState<string>('Administrador');
    const [msgError, setMsgError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter()

    const HandlerSubimit = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        
        if(login.trim() === ""){
            setLoginErrorM(true);
        }else{
            setLoginErrorM(false);
        }
        
        if (passw.trim() === ""){
            setPasswErrorM(true);
        }else{
            setLoginErrorM(false);
        }
            
        try{
            const response = await api.post('/login',{
                email: login,
                passw: passw
            });
            
            if(response.status === 200){
                console.log('Usuário Logado com sucesso!');
                router.push('/dashboard')
                setLoading(true);
                setPAdm('Bem viando mestre espiga!');
                
            }else{
                setMsgError('Error! Voçê não tem acesso de administrador!.');
            }

        }catch(err){
            setMsgError('E-mail ou senha inválida!.');
            console.log('error na requisição', err);
        }
        

        
    }


    return (
        <div className="flex min-h-screen flex-col bg-amber-20 items-center justify-center">
            <div className='flex pb-10'>
                <h1 className='font-extrabold md:text-5xl text-3xl text-gray-700 '>{padm}</h1>
            </div>
            <form onSubmit={HandlerSubimit} className="flex flex-col gap-5 border border-gray-200 bg-white shadow-2xl md:w-100 w-80 rounded-2xl h-100 items-center justify-center ">
                <div className='flex gap-5 items-center'>
                    <FaUser size={20} color='gray'/>
                    <div className='flex flex-col gap-1'>
                        <input type="text" 
                            placeholder="Login"
                            className={ loginErrorM ? "border border-red-500 p-3" : " p-3 border border-gray-400 "}
                            value={login}
                            onChange={(e)=>setLogin(e.target.value)}
                        />
                        <p className={loginErrorM ? "text-red-500" : "opacity-0"}>{loginErrorM ? "Preencha o campo ( LOGIN )" : ""}</p>
                    </div>
                </div>
                <div className="flex gap-5 items-center">
                    <FaLock size={20} color='gray'/>
                    <div className='flex flex-col gap-1'>
                        <input type="password" 
                            placeholder="Senha"
                            className={ passwErrorM ? "border border-red-500 p-3 items-center flex justify-center" : " p-3 border border-gray-400 "}
                            value={passw}
                            onChange={(e)=>setPassw(e.target.value)}
                        />
                        <p className={passwErrorM ? "text-red-500 items-center flex justify-center" : "opacity-0"}>{passwErrorM? "Preencha o campo ( SENHA )" : ""}</p>
                    </div>
                </div>
                <div>
                    <p className='text-red-600'>{msgError}</p>
                </div>
                <div className="flex mt-20">
                    <button type='submit' className="flex w-65 text-white font-bold p-2 items-center justify-center bg-green-500">{loading ? 'Logando...' : 'Entre'}</button>
                </div>
            </form>
        </div>
    )
};

export default Login;