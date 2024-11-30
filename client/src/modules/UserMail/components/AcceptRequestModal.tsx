import { FC, useEffect, useState } from "react";
import { useStore } from "../../../hooks/useStore";
import { TextareaWithTemplate } from "../../SetOrderModal/components/TextareaWithTemplate";
import DoButton from "../../../comon/ui/DoButton/DoButton";

interface AcceptRequestModalProps {
    date: string;
    service: string;
    senderId: string;
    receiverId: string;
    msgId: string
}

export const AcceptRequestModal: FC<AcceptRequestModalProps> = ({ date, msgId, service, senderId, receiverId }) => {

    const [requestText, setRequestText] = useState<string>("");
    const { store } = useStore();

    let template = `Шановний ${receiverId}, я записав вас на ${date} на ${service} очікую вас на сеансі.`;
    useEffect(() => {
        if (service) {
            template = `Шановний ${receiverId}, я записав вас на ${date} на ${service} очікую вас на сеансі.`;
            setRequestText(template); 
        }
    }, [receiverId, service, date]);
    const acceptRequest = async () => {
        const data = await store.message.acceptRequest(msgId, senderId, requestText, receiverId)
    }
    return (
        <>
            <div className="p-10 bg-white rounded-lg shadow">
                <div className="text-lg mb-4">Сервіс: {service}</div>
                <div className="text-lg mb-4">Час: {date}</div>
                <div className="text-lg mb-8">Юзер: {receiverId}</div>
                <TextareaWithTemplate
                    barberName={senderId}
                    date={date}
                    service={service}
                    onUpdateText={setRequestText}
                    template={template}
                />
            </div>
            <DoButton buttonText={"Надіслати"} callbackHandler={acceptRequest} />
        </>
    )
}