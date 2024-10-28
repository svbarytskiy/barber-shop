import { FC } from "react";
import { observer } from "mobx-react-lite";
import CustomCheckbox from "../../../../comon/ui/CustomCheckBox/CustomCheckBox";
import SearchBar from "../../../../comon/ui/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import CollapsibleSection from "../../../../comon/ui/CollapsibleSection/CollapsibleSection";

interface Service {
    id: string;
    label: string;
}

interface FilterSidebarProps {
    services: Service[];
    handleSearch: (query: string) => void;
    handleCheckboxChange: (checked: boolean, id: string) => void;
}

const FilterSidebar: FC<FilterSidebarProps> = ({ handleSearch, handleCheckboxChange, services }) => {
    const [searchParams] = useSearchParams();

    const onSearchInputChange = (query: string) => {
        handleSearch(query);
    };

    return (
        <aside className="p-5 sm:p-7 lg:w-1/3 rounded-xl bg-white h-full max-h-[700px] border">
            <SearchBar placeholder="Search by name..." onSearch={onSearchInputChange} />
            <CollapsibleSection title="Select service">
                <fieldset className="ml-5 mt-2">
                    <legend className="sr-only">Service options</legend>
                    {services.map((service) => (
                        <CustomCheckbox
                            key={service.id}
                            id={service.id}
                            label={service.label}
                            onChange={handleCheckboxChange}
                            // Check the checkbox if the corresponding URL parameter is true
                            checked={searchParams.get(service.id) === 'true'}
                        />
                    ))}
                </fieldset>
            </CollapsibleSection>
        </aside>
    );
};

export default observer(FilterSidebar);
