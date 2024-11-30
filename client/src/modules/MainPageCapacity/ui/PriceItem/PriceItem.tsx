import { FC } from "react";

interface PriceItemProps {
    title: string;
    description: string;
    price: string;
}

const PriceItem: FC<PriceItemProps> = ({ title, description, price }) => (
    <div className="rounded-md bg-white p-4 flex justify-between items-center">
        <div className="max-w-[400px]">
            <h2 className="text-lg">{title}</h2>
            <p className="hidden sm:block">{description}</p>
        </div>
        <div className="text-pink-500 text-4xl font-dancing italic mr-2">{price}</div>
    </div>
);

export default PriceItem;
