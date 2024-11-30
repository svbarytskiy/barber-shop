import { FC, ChangeEvent, Dispatch, SetStateAction } from 'react';

interface FormInputProps {
    inputValue: string | number;
    labelText: string;
    inputType: string;
    inputPlaceholder: string;
    setValue: Dispatch<SetStateAction<string>>;
    className?: string;
}

const FormInput: FC<FormInputProps> = ({ inputValue, labelText, inputType, inputPlaceholder, setValue, className = '' }) => {
    const handleItemChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <label className={`max-w-sm w-full block text-lg text-gray-400 ${className}`}>
            {labelText}
            <input
                type={inputType}
                value={inputValue}
                onChange={handleItemChange}
                placeholder={inputPlaceholder}
                className={`mt-1 text-black text-lg max-w-sm w-full rounded-lg border-2 border-gray-900 py-4 px-3 outline-none placeholder:text-gray-900 ${className}`}
            />
        </label>
    );
};

export default FormInput;
