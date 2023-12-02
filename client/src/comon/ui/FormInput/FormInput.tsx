import { FC, ChangeEvent, Dispatch, SetStateAction } from 'react';

interface FormInputProps {
    inputValue: string | number;
    labelText: string;
    inputType: string;
    inputPlaceholder: string;
    setValue: Dispatch<SetStateAction<string>>;
}

const FormInput: FC<FormInputProps> = ({ inputValue, labelText, inputType, inputPlaceholder, setValue }) => {
    const handleItemChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <label className='max-w-sm w-full block text-xs text-gray-400'>
            {labelText}
            <input
                type={inputType}
                value={inputValue}
                onChange={handleItemChange}
                placeholder={inputPlaceholder}
                className='mt-1 text-black max-w-sm w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
            />
        </label>
    );
};

export default FormInput;
