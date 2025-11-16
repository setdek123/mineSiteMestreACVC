'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {FaWarehouse} from 'react-icons/fa';

const About = () => {
    const [cameBack, setCameBack] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();

    
    
    

    return (
        <div className="min-h-screen bg-[#081020] flex flex-row justify-around">
            <div style={{
                backgroundImage: 'linear-gradient(to left,  #081020 , rgba(0,0,0,0.5)), url(/img/mestre-espiga.jpg)',
                width: '300%',
                height: '',
                marginLeft: '-220px'

            }} className='w-2xl mt-2  '>
            
            

            </div>
            <div className="w-500  md:mt-35  md:px-10 h-20 ">
                <span className="text-white text-2xl z-40 relative p-2 ">João Jardim, conhecido como Espiga, iniciou seu aprendizado na Capoeira em 1986, com o então contra mestre do Grupo Senzala Mestre Boneco, participando como aluno da fundação do Grupo Capoeira Brasil em 1989.

                    Há mais de 25 anos dissemina a cultura brasileira pelo mundo como professor de Capoeira e atualmente ministra aulas para crianças e adultos em seu espaço inteiramente dedicado a Capoeira, visando uma didática abrangente que transmita noções musicais, domínio corporal, ensinamentos histórico-culturais brasileiros e afrodescendentes, além de importantes valores para a formação do ser, como a humildade, interação, respeito mútuo e disciplina.

                    Espiga busca através da Capoeira, o desenvolvimento de seus alunos muito além do aspecto físico e é reconhecido pela sua forma de ensinar a Capoeira, participando de eventos em diversos países e transmitindo seus ensinamentos para capoeiristas de diferentes culturas.
                </span>
            </div>
        </div>
    )
}

export default About