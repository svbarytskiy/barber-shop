import { FC } from "react";
import PriceItem from "../../ui/PriceItem/PriceItem";
import pricesData from './prices.json';

const FourthBlock: FC = () => {
    return (
        <section className="p-5 my-10 w-full h-auto rounded-md bg-blue-400 sm:p-10">
            <h1 className="text-4xl md:text-5xl lg:text-7xl mb-5 text-center text-white font-dancing italic">Our Pricelist</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pricesData.map((item, index) => (
                    <PriceItem key={index} title={item.title} description={item.description} price={item.price} />
                ))}
            </div>
        </section>
    );
}

export default FourthBlock;
