'use client';

import api from "@/backend/api/api";
import { createContext, useState, FormEvent, Dispatch, SetStateAction } from "react";


interface PropsContext {
    nameVisitor: string,
    setNameVisitor: Dispatch<SetStateAction<string>>,
    msgVisitor: string,
    setMsgVisitor: Dispatch<SetStateAction<string>>,
    errorMsg: string ,
    setErrorMsg: Dispatch<SetStateAction<string>>,
    ItemsUsers: PropsItems[],
    setItemsUsers: Dispatch<SetStateAction<PropsItems[]>>
    CommitUsers: (e:FormEvent<HTMLFormElement>)=> void,
};


export const AppContext = createContext<PropsContext | undefined>(undefined);



interface PropsItems {
    id: number,
    msg: [
        {
            namet: string,
            commit: string
        }
    ],
}


interface PropsChildren {
    children: React.ReactNode
}



const Context = ({children}: PropsChildren) => {
    const [nameVisitor, setNameVisitor] = useState<string>('');
    const [msgVisitor, setMsgVisitor] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [ItemsUsers, setItemsUsers] = useState<PropsItems[]>([]);


    const CommitUsers = async (e: FormEvent<HTMLElement>) =>{
        e.preventDefault();
        
        if(nameVisitor.trim() === '' && msgVisitor.trim() === ''){
            setErrorMsg('Preencha os campos.')
        }else{
            setErrorMsg('');

            const attrib: PropsItems = {
                id: Date.now(),
                msg: [
                    {
                        namet: nameVisitor,
                        commit: msgVisitor
                    }
                ] 
            }

            setItemsUsers((prev) => [...prev, attrib]);
        }

       
        const resp = await api.post('/commits', {
            name: nameVisitor,
            commit: msgVisitor
        });

        if(resp.status === 201) {
            setErrorMsg('Mensagem enviada com sucesso!');
            console.log('Mensagem enviada com sucesso!');
        }
       

       setMsgVisitor('');
       setNameVisitor('');
    }



    return (
        <AppContext.Provider value={{
            CommitUsers, 
            nameVisitor,
            setNameVisitor,
            setMsgVisitor, 
            msgVisitor,
            errorMsg,
            setErrorMsg,
            ItemsUsers,
            setItemsUsers
        
        }}>

            {children}
        </AppContext.Provider>
    )
};


export default Context;