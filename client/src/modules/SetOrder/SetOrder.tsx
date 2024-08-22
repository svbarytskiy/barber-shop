import { FC, useEffect, useState } from "react";
import MySelect, { Option } from "../../comon/ui/MySelect/MySelect";
import { useStore } from "../../hooks/useStore";
import { BarberCard } from "./components/BarberCard";
import { IBarber, IService } from "../../models/IBarber";
import CustomCheckbox from "../../comon/ui/CustomCheckBox/CustomCheckBox";
import SearchBar from "../../comon/ui/SearchBar/SearchBar";

export const SetOrder: FC = () => {
    const serviceOptions: Option[] = [
        { value: "haircut", label: "Стрижка волосся" },
        { value: "hairDyeing", label: "Фарбування волосся" },
        { value: "pedicure", label: "Педикюр" },
        { value: "manicure", label: "Манікюр" },
        { value: "hairExtension", label: "Нарощування волосся" },
        { value: "hairStyling", label: "Укладка волосся" },
    ];
    const [selectedService, setSelectedService] = useState<string>("haircut");
    const { store } = useStore(); // Припускаємо, що useStore() повертає тип, який містить store.barber.barbers
    const [isChecked, setIsChecked] = useState(false);
    useEffect(() => {
        store.barber.getAllBarbers();
    }, [store.barber]);

    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: boolean }>({});

    const handleCheckboxChange = (checked: boolean, id: string) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [id]: checked,
        }));
    };
    const filteredBarbers = store.barber.barbers.filter((barber: IBarber) => barber.services[selectedService as keyof IService]);
    const [results, setResults] = useState<string[]>([]);

    const handleSearch = (query: string) => {

    };

    return (
        <section className="w-full flex  p-10">
           <div className="w-1/3 rounded-xl bg-white min-h-[700px] p-7 border-2 border-grey-900 shadow-lg">

                <SearchBar placeholder="Search items..." onSearch={handleSearch} />


                <div className="borser-b-2 w-full mt-5">
                    <p className="text-grey-900 text-xl font-bold	">Set srvice</p>
                    <div className="ml-5">
                        <CustomCheckbox id="serv1" label="Haircut" onChange={handleCheckboxChange} />
                        <CustomCheckbox id="serv2" label="Manicure" onChange={handleCheckboxChange} />
                        <CustomCheckbox id="serv3" label="Hairdying" onChange={handleCheckboxChange} />
                        <CustomCheckbox id="serv4" label="Pedicure" onChange={handleCheckboxChange} />
                        <CustomCheckbox id="serv5" label="Hair dyeing" onChange={handleCheckboxChange} />
                        <CustomCheckbox id="serv6" label="Hair styling" onChange={handleCheckboxChange} />
                    </div>
                </div>
                <div className="">
                    <p className="text-grey-900 text-xl font-bold	">Position</p>
                    <div className="ml-5">
                        <CustomCheckbox id="option1" label="Trainee" onChange={handleCheckboxChange} />
                        <CustomCheckbox id="option2" label="Barber" onChange={handleCheckboxChange} />
                        <CustomCheckbox id="option3" label="Senior Barber" onChange={handleCheckboxChange} />
                    </div>
                </div>
            </div>
            <div className="w-full">
                {selectedService && <div className="text-gray-900 text-lg mb-5 ml-6">You select: {selectedService}</div>}
                {filteredBarbers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
                        {filteredBarbers.map((barber) => (
                            <BarberCard
                                key={barber.id}
                                phoneNumber={barber.phoneNumber}
                                barberName={barber.username}
                                options={barber.services}
                                image={barber.image}
                                barberId={barber.id}
                                orderService={selectedService}
                            />
                        ))}
                    </div>

                ) : (
                    <div className="w-full mx-auto flex flex-col items-center">
                        <div
                            className="my-10 w-full max-w-[400px] h-[250px] bg-contain bg-no-repeat bg-center relative"
                            style={{ backgroundImage: `url('/assets/josukani.png')` }}
                        ></div>
                        <p className="my-10 w-full text-2xl text-grey-900 text-center">Немає доступних барберів.</p>
                    </div>
                )}

            </div>
        </section >
    );
};
