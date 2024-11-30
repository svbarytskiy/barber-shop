import { FC } from "react"

interface ServiceItem {
    service: string
    onClick: (service: string) => void
}

const ServiceItem: FC<ServiceItem> = ({ service, onClick }) => {
    return (
        <div onClick={() => onClick(service)} className="cursor-pointer text-base sm:text-lg bg-blue-500 rounded text-white p-3 hover:bg-blue-400 transition">
            {service}
        </div>
    )
}
export default ServiceItem