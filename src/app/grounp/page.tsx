

const Grounp = () => {
    return (
        <div className="flex h-screen items-center justify-center" style={{
            background: 'linear-gradient(50deg, #fff, #242424 50%, #081020 80%)'
        }}>
            <img src={'/img/Logo.png'} 
            className=" w-220 object-cover brightness-20"/>

            <div className="flex justify-center items-center  absolute">
                <div className="flex  rounded-3xl gap-8 overflow-h">
                    <div className="shadow-2xs rounded-3xl">
                        <div>
                            <img src="/img/turma-mirim.jpg" className="w-80 hover:scale-z-75 rounded-t-3xl" />
                        </div>
                        
                        <div className="flex flex-col mt-0 px-5 pb-10 py-5 rounded-b-3xl bg-[#242424]">
                            <h2 className="text-2xl text-white mb-5">Turma infantil</h2>
                            <span className=" text-gray-500">Horario: <strong>17:30 Horas</strong></span>
                            <span className=" text-gray-500">Saida: <strong>18:30 Horas</strong></span>
                            <span className=" text-gray-400 text-2xl">Dias: <strong>segunda á sexta</strong></span>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src="/img/turma-infantil.jpg" className="w-80 hover:scale-x-75 rounded-t-3xl" />
                        </div>
                        
                        <div className="flex flex-col mt-0 px-5 py-5 pb-10 rounded-b-3xl bg-[#242424]">
                            <h2 className="text-2xl text-white mb-5">Turma adultos</h2>
                            <span className=" text-gray-500">Horario: <strong>18:30 Horas</strong></span>
                            <span className=" text-gray-500">Saida: <strong>19:30 Horas</strong></span>
                            <span className=" text-gray-400 text-2xl">Dias: <strong>segunda á sexta</strong></span>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src="/img/turma-infantil.jpg" className="w-80 hover:scale-x-75 rounded-t-3xl" />
                        </div>
                        
                        <div className="flex flex-col mt-0 px-5 pb-10 py-5 rounded-b-3xl bg-[#242424]">
                            <h2 className="text-2xl text-white mb-5">Turma adultos</h2>
                            <span className=" text-gray-500">Horario: <strong>19:30 Horas</strong></span>
                            <span className=" text-gray-500">Saida: <strong>21:00 Horas</strong></span>
                            <span className=" text-gray-400 text-2xl">Dias: <strong>segunda á sexta</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Grounp;