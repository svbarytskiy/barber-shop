import { FC } from "react";
import { observer } from "mobx-react-lite";
import LinkButton from "../../comon/ui/LinkButton/LinkButton";
import FirstBlock from './components/FirstBlock/FirstBlock'
import SecondBlock from "./components/SecondBlock/SecondBlock";
import ThirdBlock from "./components/ThirdBlock/ThirdBlock";
import FourthBlock from "./components/FourthBlock/FourthBlock";

const MainPageCapacity: FC = () => {
    return (
        <>
            <FirstBlock />
            <SecondBlock />
            <ThirdBlock />
            <FourthBlock />
        </>
    );
}

export default observer(MainPageCapacity);
