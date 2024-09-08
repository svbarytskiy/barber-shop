import { FC, useEffect, useState } from "react";
import { useStore } from "../../hooks/useStore";
import { BarberCard } from "./components/BarberCard/BarberCard";
import { IBarber, IService } from "../../models/IBarber";
import FilterSidebar from "./components/FilterSidebar/FilterSidebar";
import TopBar from "./components/TopBar/TopBar";
import NoItemsBlock from "./ui/NoItemsBlock/NoItemsBlock";
import ForThreeBarberCard from "./components/BarberCard/ForThreeBarberCard";
import LoadingSpinner from "../../comon/ui/LoadingSpinner/LoadingSpinner";
import { observer } from "mobx-react-lite";
// Import loading spinner component

const SetOrder: FC = () => {
    const [selectedService, setSelectedService] = useState<string>("haircut");
    const { store } = useStore();
    const [mapOption, setMapOption] = useState<string>("two"); // State for mapping options (number of columns)
    const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        store.barber.getAllBarbers();
    }, [store.barber]);

    const handleCheckboxChange = (checked: boolean, id: string) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [id]: checked,
        }));
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query); // Update search query state
    };

    const handleMapOptionChange = (option: string) => {
        setMapOption(option);
    };

    // Filter barbers based on selected options and search query
    const filteredBarbers = store.barber.barbers.filter((barber: IBarber) => {
        const matchesServices = Object.keys(selectedOptions).every((service) => {
            return selectedOptions[service] ? barber.services[service as keyof IService] : true;
        });

        const matchesSearch = barber.username.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesServices && matchesSearch;
    });

    const selectedServicesArray = Object.keys(selectedOptions).filter((key) => selectedOptions[key]);

    return (
        <section className="w-full flex p-10">
            <FilterSidebar handleSearch={handleSearch} handleCheckboxChange={handleCheckboxChange} />
            <div className="w-full">
                <TopBar selectedService={selectedServicesArray} handleMapOptionChange={handleMapOptionChange} />

                {/* Check if the data is loading */}
                {store.barber.isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <LoadingSpinner /> {/* Show a loading spinner */}
                    </div>
                ) : (
                    <>
                        {filteredBarbers.length > 0 ? (
                            <div
                                className={`grid gap-4 justify-items-center ${mapOption === "one" ? "grid-cols-1" :
                                    mapOption === "two" ? "grid-cols-2" :
                                        "grid-cols-3"}`}
                            >
                                {filteredBarbers.map((barber) =>
                                    mapOption === "three" ? (
                                        <ForThreeBarberCard
                                            key={barber.id}
                                            phoneNumber={barber.phoneNumber}
                                            barberName={barber.username}
                                            image={barber.image}
                                            barberId={barber.id}
                                            orderService={selectedService}
                                        />
                                    ) : (
                                        <BarberCard
                                            key={barber.id}
                                            phoneNumber={barber.phoneNumber}
                                            barberName={barber.username}
                                            image={barber.image}
                                            barberId={barber.id}
                                            orderService={selectedService}
                                        />
                                    )
                                )}
                            </div>
                        ) : (
                            <NoItemsBlock />
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default observer(SetOrder)
