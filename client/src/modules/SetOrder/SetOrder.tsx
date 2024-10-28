import { FC, useEffect, useState } from "react";
import { useStore } from "../../hooks/useStore";
import { IBarber, IService } from "../../models/IBarber";
import FilterSidebar from "./components/FilterSidebar/FilterSidebar";
import TopBar from "./components/TopBar/TopBar";
import LoadingSpinner from "../../comon/ui/LoadingSpinner/LoadingSpinner";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import Pagination from "./components/Pagination/Pagination";
import BarbersMap from "./components/BarbersMap/BarbersMap";

const SetOrder: FC = () => {
    const { store } = useStore();
    const [mapOption, setMapOption] = useState<string>("two");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: boolean }>({});
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(6);
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

    const services = [
        { id: "haircut", label: "Haircut" },
        { id: "manicure", label: "Manicure" },
        { id: "hairdying", label: "Hairdying" },
        { id: "pedicure", label: "Pedicure" },
        { id: "hairExtension", label: "Hair Extension" },
        { id: "hairStyling", label: "Hair Styling" }
    ];

    useEffect(() => {
        // Опреділяємо розмір екрану
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 640);
        };

        handleResize(); // Перевіряємо розмір екрану при монтуванні
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (store.barber.barbers.length === 0) {
            store.barber.getAllBarbers();
        }

        const mapOptionParam = searchParams.get("m");
        if (mapOptionParam) {
            setMapOption(mapOptionParam);
            if (mapOptionParam === "one") {
                setItemsPerPage(4);
                setCurrentPage(1);
            } else if (mapOptionParam === "two") {
                setItemsPerPage(6);
                setCurrentPage(1);
            } else if (mapOptionParam === "three") {
                setItemsPerPage(9);
                setCurrentPage(1);
            }
        } else {
            if (!searchParams.get("m")) {
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.set("m", "two");
                setSearchParams(newSearchParams);
                setMapOption("two");
            }
        }
    }, [store.barber, searchParams]);

    useEffect(() => {
        const initialSelectedOptions: { [key: string]: boolean } = {};
        services.forEach(service => {
            if (searchParams.get(service.id) === 'true') {
                initialSelectedOptions[service.id] = true;
            }
        });
        setSelectedOptions(initialSelectedOptions);
    }, [searchParams]);

    const handleCheckboxChange = (checked: boolean, id: string) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [id]: checked,
        }));

        const newSearchParams = new URLSearchParams(searchParams);
        if (checked) {
            newSearchParams.set(id, 'true');
        } else {
            newSearchParams.delete(id);
        }
        setSearchParams(newSearchParams);
    };

    const handleSearch = (query: string) => {
        setCurrentPage(1)
        setSearchQuery(query);
    };

    const handleMapOptionChange = (option: string) => {
        if (!isSmallScreen) {
            setMapOption(option);
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set("m", option);
            setSearchParams(newSearchParams);
        }
    };

    const filteredBarbers = store.barber.barbers.filter((barber: IBarber) => {
        const matchesServices = Object.keys(selectedOptions).every((service) => {
            return selectedOptions[service] ? barber.services[service as keyof IService] : true;
        });
        const matchesSearch = barber.username.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesServices && matchesSearch;
    });

    const selectedServicesArray = Object.keys(selectedOptions).filter((key) => selectedOptions[key]);

    const lastCountryIndex = currentPage * itemsPerPage;
    const firstCountryIndex = lastCountryIndex - itemsPerPage;
    const paginatedBarbers = filteredBarbers.slice(firstCountryIndex, lastCountryIndex);
    const onPaginate = (number: number) => setCurrentPage(number);

    return (
        <section className="w-full flex flex-col lg:flex-row p-5 lg:p-10">
            <FilterSidebar services={services} handleSearch={handleSearch} handleCheckboxChange={handleCheckboxChange} />
            <div className="w-full lg:ml-3 mt-5 lg:mt-0 lg-ml-10">
                <TopBar
                    isSmallScreen={isSmallScreen}
                    mapOption={isSmallScreen ? "one" : mapOption}
                    selectedService={selectedServicesArray}
                    handleMapOptionChange={isSmallScreen ? () => { } : handleMapOptionChange}
                />

                {store.barber.isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <>
                        <BarbersMap mapOption={isSmallScreen ? "one" : mapOption} paginatedBarbers={paginatedBarbers} />
                        {filteredBarbers.length > itemsPerPage ? (
                            <Pagination
                                currentPage={currentPage}
                                onPaginate={onPaginate}
                                totalItems={filteredBarbers.length}
                                itemsPerPage={itemsPerPage}
                            />
                        ) : null}
                    </>
                )}
            </div>
        </section>
    );
};

export default observer(SetOrder);
