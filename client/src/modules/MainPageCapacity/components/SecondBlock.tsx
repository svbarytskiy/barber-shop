import { FC } from "react";
import { observer } from "mobx-react-lite";
import LinkButton from "../../../comon/ui/LinkButton/LinkButton";

const SecondBlock: FC = () => {
    return (
        <div
            className="my-[200px] w-full h-[600px] flex rounded-md bg-cover bg-center justify-between px-10" 
            >
            <div className="max-w-[600px]">
                <h1 className="text-7xl mb-5">Get the best haircut ever</h1>
                <p className="text-lg mb-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam aut esse magni hic praesentium voluptatibus odit, alias omnis eligendi iusto cum adipisci cupiditate provident. Quod, quibusdam aut suscipit excepturi eveniet facere modi, fugiat corrupti eaque itaque quas nisi natus culpa?</p>
            </div>
            <div className="w-[550px] h-[390px] rounded-md bg-cover bg-center" style={{ backgroundImage: `url('/assets/creo2.jpg')`}}></div>
        </div>

    );
}

export default observer(SecondBlock);
