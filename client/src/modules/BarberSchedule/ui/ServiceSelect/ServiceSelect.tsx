import React, { FC, useState, useEffect } from "react";
import MySelect from "../../../../comon/ui/MySelect/MySelect";

interface ServiceSelectProps {
    initialValue: string;
    onChange: (service: string) => void;
    disabled: boolean;
    resetTrigger: boolean;  // Add a prop to trigger reset
}

const serviceOptions = [
    { value: "haircut", label: "Стрижка волосся" },
    { value: "hairDyeing", label: "Фарбування волосся" },
    { value: "pedicure", label: "Педикюр" },
    { value: "manicure", label: "Манікюр" },
    { value: "hairExtension", label: "Нарощування волосся" },
    { value: "hairStyling", label: "Укладка волосся" },
];

const ServiceSelect: FC<ServiceSelectProps> = ({ initialValue, onChange, disabled, resetTrigger }) => {
    const [value, setValue] = useState<string>(initialValue);

    useEffect(() => {
        setValue(initialValue); // Reset the select when resetTrigger changes
    }, [resetTrigger, initialValue]);

    const handleSelectChange = (selectedValue: string) => {
        setValue(selectedValue);
        onChange(selectedValue);
    };

    return (
        <div className="mb-5">
            <p className="text-lg">Service</p>
            <MySelect
                options={serviceOptions}
                value={value}
                onChange={handleSelectChange}
                disabled={disabled}
            />
        </div>
    );
};

export default ServiceSelect;
