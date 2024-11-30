import { ChangeEvent, Dispatch, FC, SetStateAction } from "react"

interface FileInputProps {
    labelText: string;
    setImage: Dispatch<SetStateAction<File | null>>;
}

const FileInput: FC<FileInputProps> = ({ labelText, setImage }) => {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        setImage(selectedFile || null);
    };
    return (
        <>
            <label className='text-gray-300 max-w-sm w-full block py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
                {labelText}
                <input
                    type='file'
                    className='hidden'
                    onChange={handleFileChange}
                />
            </label>
        </>
    )
}
export default FileInput;