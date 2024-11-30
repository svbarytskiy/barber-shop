import { FC } from "react";
import Article from "../../ui/Article/Article";
import ImageBackground from "../../ui/ImageBackground/ImageBackground";

const SecondBlock: FC = () => {
    return (
        <section
            className="my-[50px] md:my-[100px] lg:my-[150px] xl:my-[200px] w-full h-auto flex flex-col md:flex-row rounded-md bg-cover bg-center justify-between px-5 md:px-10"
        >
            <Article title={"Get the best haircut ever"} text={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam aut esse magni hic praesentium voluptatibus odit, alias omnis eligendi iusto cum adipisci cupiditate provident. Quod, quibusdam aut suscipit excepturi eveniet facere modi, fugiat corrupti eaque itaque quas nisi natus culpa?"} styles={"text-gray-900"} />
            <ImageBackground imagePath="/assets/creo2.jpg" additionalStyles="" />
        </section>
    );
}

export default SecondBlock;
