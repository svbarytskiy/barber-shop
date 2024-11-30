import React, { FC, useState } from "react";
import ProgressBar from "./components/ProgressBar";
import StageOne from "./components/StageOne";
import StageTwo from "./components/StageTwo";
import StageThree from "./components/StageThree";
import StageFour from "./components/StageFour";
import GoBackButton from "./ui/goBackButton/goBackButton";
import { StageFive } from "./components/StageFive";
import { observer } from "mobx-react-lite";

const OrderCreationForm: FC = () => {
    const [step, setStep] = useState(1);
    const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedService, setSelectedService] = useState<string>('');

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSelectDate = (date: Date) => {
        setSelectedDate(date);
        nextStep();
    };

    const handleSelectService = (service: string) => {
        setSelectedService(service);
        nextStep();
    };

    const handleSelectDayId = (dayId: string) => {
        setSelectedDayId(dayId);
        nextStep();
    };

    const submitForm = () => {
        console.log("Form submitted with:", {
            selectedDayId,
            selectedDate,
            selectedService,
        });
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="w-full sm:w-[600px] md:w-[728px] lg:w-[900px] h-[500px] sm:h-[600px] p-3 sm:p-8 border rounded-xl bg-white shadow-lg mx-auto">
                <header className="flex items-center mb-3">
                    <GoBackButton className="mt-auto mr-3" />
                    <ProgressBar step={step} />
                </header>


                {step === 1 && <StageOne onNext={handleSelectDayId} />}
                {step === 2 && <StageTwo onNext={handleSelectDate} onPrev={prevStep} selectedDayId={selectedDayId} />}
                {step === 3 && <StageThree onNext={handleSelectService} onPrev={prevStep} selectedDayId={selectedDayId} />}
                {step === 4 && <StageFour onPrev={prevStep} onNext={nextStep} selectedDate={selectedDate} service={selectedService} />}
                {step === 5 && <StageFive onSubmit={submitForm} />}

            </div>
        </div>
    );
};

export default observer(OrderCreationForm);
