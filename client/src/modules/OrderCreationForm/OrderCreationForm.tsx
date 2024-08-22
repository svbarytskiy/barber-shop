import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import ProgressBar from "./components/ProgressBar";
import  StageOne  from "./components/StageOne";
import  StageTwo  from "./components/StageTwo";
import  StageThree  from "./components/StageThree";
import  StageFour  from "./components/StageFour";

const OrderCreationForm: FC = () => {
    const [step, setStep] = useState(1);
    const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Функція для переходу на наступний крок
    const nextStep = () => {
        setStep(step + 1);
    };

    // Функція для переходу на попередній крок
    const prevStep = () => {
        setStep(step - 1);
    };

    // Функція для збереження дати
    const handleSelectDate = (date: Date) => {
        setSelectedDate(date);
        nextStep(); // Перехід на наступний крок
    };

    // Функція для збереження ID дня
    const handleSelectDayId = (dayId: string) => {
        setSelectedDayId(dayId);
        nextStep(); // Перехід на наступний крок
    };

    // Функція для відправки форми
    const submitForm = () => {
        console.log("Form submitted with selected day ID:", selectedDayId);
        console.log("Form submitted with selected date:", selectedDate);
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-[900px] h-[600px] p-8 border rounded-xl">
                <ProgressBar step={step} />
                {step === 1 && <StageOne onNext={handleSelectDayId} />}
                {step === 2 && <StageTwo onNext={handleSelectDate} onPrev={prevStep} selectedDayId={selectedDayId} />}
                {step === 3 && <StageThree onPrev={prevStep} onNext={nextStep} selectedDate={selectedDate} />}
                {step === 4 && <StageFour onSubmit={submitForm} />}
            </div>
        </div>
    );
};

export default observer(OrderCreationForm);
