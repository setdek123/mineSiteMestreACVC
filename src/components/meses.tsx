
interface PropsMeses{
    janeiro: number
    fevereiro: number
    março: number
    maio: number
    abril: number
    junho: number
    julio: number
    agosto: number
    setembro: number
    outubro: number
    novembro: number
    dezebro: number
};

interface ListMes {
    items: PropsMeses[]
}



const Mes = ({items}: ListMes) => {

    const Propss = () => {
        const att:ListMes = {
            
        }
    }

    return (
        <div>
            {items[0].janeiro}
        </div>
    );
};

export default Mes;