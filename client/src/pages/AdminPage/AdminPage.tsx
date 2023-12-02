import { FC } from "react"
import CreateBarberForm from "../../modules/CreateBarberForm/CreateBarberForm"
import ModalForm from "../../modules/ModalForm/ModalForm"
import BarberList from "../../modules/BarberList/BarberList"

export const AdminPage: FC = () => {
    return (
        <>
            <ModalForm />
            <BarberList/>
        </>
    )
}