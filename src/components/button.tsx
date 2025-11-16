'use client';

interface Props {
    text: string,
    size: string,
    onclickt?: (e: any) => void;
}

const Button = ({ text, size, onclickt }: Props) => {

    return (
        <div>
            <button
                className={`${size} bg-green-500 rounded-md shadow hover:bg-green-700 cursor-pointer border-b-gray-900`}
                onClick={onclickt}
            >
                <h2 className="text-white text-2xl font-extrabold">{text}</h2>
            </button>
        </div>
    );
};

export default Button;