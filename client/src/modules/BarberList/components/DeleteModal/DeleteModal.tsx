import { FC } from "react";
import DoButton from "../../../../comon/ui/DoButton/DoButton";


interface DeleteModalProps {
    barberName: string,
    onSubmitDelete: () => void,
}

const DeleteModal: FC<DeleteModalProps> = ({barberName, onSubmitDelete}) => {
    
    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}
                className='p-10 '>
                <h1 className='text-xl text-gray-600 pb-5 text-center'>Підтвердження видалення барбера {barberName}</h1>
                <div className='flex text-lg text-gray-600 max-w-sm space-x-4'>
                    Ви дійсно хочете видалити цей акаунт?
                </div>
                <DoButton callbackHandler={onSubmitDelete} buttonText='Так' />
            </form>
        </>)
}
export default DeleteModal