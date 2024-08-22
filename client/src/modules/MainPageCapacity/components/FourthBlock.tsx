import { FC } from "react";
import { observer } from "mobx-react-lite";
import LinkButton from "../../../comon/ui/LinkButton/LinkButton";

const FourthBlock: FC = () => {
    return (
        <div className="my-[200px] w-full h-auto rounded-md bg-gray-700 p-10">
            <h1 className="text-7xl mb-5 text-center text-white mb-10 font-dancing italic">Our pricelist</h1>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="h-[100px] rounded-md bg-white p-4 flex justify-between">
                    <div className="max-w-400px"><h1 className="text-lg">Hairdying</h1>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    </div>
                    <div className="text-pink-500 text-4xl font-dancing italic mr-2">100$</div>
                </div>
                <div className="h-[100px] rounded-md bg-white p-4 flex justify-between">
                    <div className="max-w-400px"><h1 className="text-lg">Hairdying</h1>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    </div>
                    <div className="text-pink-500 text-4xl font-dancing italic mr-2">70$</div>
                </div>
                <div className="h-[100px] rounded-md bg-white p-4 flex justify-between">
                    <div className="max-w-400px"><h1 className="text-lg">Hairdying</h1>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    </div>
                    <div className="text-pink-500 text-4xl font-dancing italic mr-2">35$</div>
                </div>
                <div className="h-[100px] rounded-md bg-white p-4 flex justify-between">
                    <div className="max-w-400px"><h1 className="text-lg">Hairdying</h1>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    </div>
                    <div className="text-pink-500 text-4xl font-dancing italic mr-2">60$</div>
                </div>
                <div className="h-[100px] rounded-md bg-white p-4 flex justify-between">
                    <div className="max-w-400px"><h1 className="text-lg">Hairdying</h1>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    </div>
                    <div className="text-pink-500 text-4xl font-dancing italic mr-2">120$</div>
                </div>
                <div className="h-[100px] rounded-md bg-white p-4 flex justify-between">
                    <div className="max-w-400px"><h1 className="text-lg">Hairdying</h1>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    </div>
                    <div className="text-pink-500 text-4xl font-dancing italic mr-2">45$</div>
                </div>
                <div className="h-[100px] rounded-md bg-white p-4 flex justify-between">
                    <div className="max-w-400px"><h1 className="text-lg">Hairdying</h1>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    </div>
                    <div className="text-pink-500 text-4xl font-dancing italic mr-2">20$</div>
                </div>
                <div className="h-[100px] rounded-md bg-white p-4 flex justify-between">
                    <div className="max-w-400px"><h1 className="text-lg">Hairdying</h1>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    </div>
                    <div className="text-pink-500 text-4xl font-dancing italic mr-2">65$</div>
                </div>
            </div>
        </div>
    );
}

export default observer(FourthBlock);

