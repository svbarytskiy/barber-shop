import { observer } from "mobx-react-lite";
import { FC } from "react";
import CustomCheckbox from "../../../../comon/ui/CustomCheckBox/CustomCheckBox";
import SearchBar from "../../../../comon/ui/SearchBar/SearchBar";

interface FilterSidebarProps {
    handleSearch: (query: string) => void;
    handleCheckboxChange: (checked: boolean, id: string) => void;
}

const services = [
    { id: "haircut", label: "Haircut" },
    { id: "manicure", label: "Manicure" },
    { id: "hairdying", label: "Hairdying" },
    { id: "pedicure", label: "Pedicure" },
    { id: "hairExtension", label: "Hair Extension" },
    { id: "hairStyling", label: "Hair Styling" }
];

const FilterSidebar: FC<FilterSidebarProps> = ({ handleSearch, handleCheckboxChange }) => {
    const onSearchInputChange = (query: string) => {
        handleSearch(query); // Pass the query string directly
    };

    return (
        <aside className="w-1/3 rounded-xl bg-white h-full max-h-[700px] p-7 border-2 shadow-lg">
            <SearchBar placeholder="Search by name..." onSearch={onSearchInputChange} />
            <section className="border-b-2 w-full mt-5">
                <h2 className="text-gray-900 text-xl font-bold">Select service</h2>
                <fieldset className="ml-5">
                    <legend className="sr-only">Service options</legend>
                    {services.map((service) => (
                        <CustomCheckbox
                            key={service.id}
                            id={service.id}
                            label={service.label}
                            onChange={handleCheckboxChange}
                        />
                    ))}
                </fieldset>
            </section>
        </aside>
    );
};

export default observer(FilterSidebar);
