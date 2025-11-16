const AboutMore = () => {
    return (
        <div className="flex flex-col  min-h-screen bg-gray-200">
            <div className="bg-green-500 items-center flex shadow-2xl p-4 justify-center">
                <h1 className="text-4xl  text-white font-bold">Capoeira Vem Camará</h1>
            </div>
            <div className="flex items-center justify-center gap-5 mt-30">
                <div className="flex gap-2 flex-col  border-gray-300 p-10 bg-white rounded-2xl shadow-lg border  overflow-hidden">
                    <span className="font-extrabold text-2xl">Aulas Presenciais</span>
                    <p className="text-gray-600">Sabados 8H - Freguesia</p>
                </div>
                
                <div className="flex gap-2 flex-col border border-gray-300 bg-white p-10 rounded-2xl shadow-lg overflow-hidden">
                    <span className="font-extrabold text-2xl">Aulas Online</span>
                    <p className="text-gray-600">Pelo app, onde estiver</p>
                </div>

                <div className="flex gap-2 flex-col border border-gray-300 bg-white p-10 rounded-2xl shadow-lg overflow-hidden">
                    <span className="font-extrabold text-2xl">1º Aula Grátis</span>
                    <button className="p-0.5 bg-amber-400 text-gray-800 font-bold rounded-2xl">Quero Participar!</button>
                </div>
            </div>
        </div>
        
    )
};

export default AboutMore;