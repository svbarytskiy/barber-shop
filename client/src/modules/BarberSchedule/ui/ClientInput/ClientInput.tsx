import React, { FC, useState, useEffect } from "react";

interface ClientInputProps {
    initialClientNum: string;
    onChange: (clientNum: string) => void;
    disabled: boolean;
    resetTrigger: boolean;  // Add a prop to trigger reset
}

const ClientInput: FC<ClientInputProps> = ({ initialClientNum, onChange, disabled, resetTrigger }) => {
    const [clientNum, setClientNum] = useState<string>(initialClientNum);

    useEffect(() => {
        setClientNum(initialClientNum); // Reset the input when resetTrigger changes
    }, [resetTrigger, initialClientNum]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setClientNum(value);
        onChange(value);
    };

    return (
        <div className="mb-5">
            <p className="text-lg">Client</p>
            <input
                className="px-4 w-full py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                value={clientNum}
                onChange={handleChange}
                disabled={disabled}
            />
        </div>
    );
};

export default ClientInput;
