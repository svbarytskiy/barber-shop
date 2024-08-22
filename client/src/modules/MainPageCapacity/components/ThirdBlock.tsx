import { FC } from "react";
import { observer } from "mobx-react-lite";
import LinkButton from "../../../comon/ui/LinkButton/LinkButton";

const ThirdBlock: FC = () => {
    return (
        <div
            className="my-[200px] w-full h-[600px] flex rounded-md bg-cover bg-center justify-between px-10"
        >

            <div className="w-[800px] h-[600px] rounded-md bg-cover bg-center" style={{ backgroundImage: `url('/assets/creo3.jpeg')` }}></div>
            <div className="max-w-[600px]">
                <h1 className="text-7xl mb-5">Enjoy the atmosphere</h1>
                <p className="text-lg mb-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam aut esse magni hic praesentium voluptatibus odit, alias omnis eligendi iusto cum adipisci cupiditate provident. Quod, quibusdam aut suscipit excepturi eveniet facere modi, fugiat corrupti eaque itaque quas nisi natus culpa?</p>
            </div>
        </div>
    );
}

export default observer(ThirdBlock);
