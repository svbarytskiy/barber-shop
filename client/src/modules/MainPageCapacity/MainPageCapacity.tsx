import { FC } from "react";
import { observer } from "mobx-react-lite";
import LinkButton from "../../comon/ui/LinkButton/LinkButton";
import FirstBlock from './components/FirstBlock'
import SecondBlock from "./components/SecondBlock";
import ThirdBlock from "./components/ThirdBlock";
import FourthBlock from "./components/FourthBlock";

const MainPageCapacity: FC = () => {
    return (
        <main>
            <FirstBlock />
            <SecondBlock />
            <ThirdBlock />
            <FourthBlock />
        </main>
    );
}

export default observer(MainPageCapacity);
