import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { FC, useEffect, useState } from "react";
import { MailItem } from "./components/MailItem";
import { IMsg } from "../../models/IMsg";

const UserMail: FC = () => {
    const { store } = useStore();
    const user = store.auth.user;
    const [selectedOption, setSelectedOption] = useState<string>("newMessages");
    const [filteredMsgs, setFilteredMsgs] = useState<IMsg[]>([]);

    useEffect(() => {
        store.message.getAllMsgs(user.id);
    }, [store.message, user.id]);

    useEffect(() => {
        let filtered = store.message.msgs;
        switch (selectedOption) {
            case "newMessages":
                filtered = store.message.msgs.filter(msg => !msg.isViewed);
                break;
            case "allMessages":
                // No additional filtering needed
                break;
            case "unrepliedMessages":
                filtered = store.message.msgs.filter(msg => !msg.reply);
                break;
            case "acceptedMessages":
                filtered = store.message.msgs.filter(msg => msg.msgStatus === "accepted");
                break;
            case "declinedMessages":
                filtered = store.message.msgs.filter(msg => msg.msgStatus === "declined");
                break;
            default:
                break;
        }
        setFilteredMsgs(filtered);
    }, [selectedOption, store.message.msgs]);

    const options = [
        { key: "newMessages", label: "Нові повідомлення" },
        { key: "allMessages", label: "Всі повідомлення" },
        { key: "unrepliedMessages", label: "Повідомлення без відповіді" },
        { key: "acceptedMessages", label: "Прийняті повідомлення" },
        { key: "declinedMessages", label: "Відмовлені повідомлення" },
    ];

    return (
        <div>
            <h1 className='text-xx text-white text-center p-5'>Пошта</h1>
            <div className="flex w-full">
                <div className="w-[500px] rounded-lg bg-gray-600 mr-5 p-2 flex-column">
                    {options.map(option => (
                        <div
                            key={option.key}
                            className={`text-xx text-white rounded text-center p-2 ${selectedOption === option.key ? 'bg-gray-500' : 'bg-gray-700'} mb-1 cursor-pointer`}
                            onClick={() => setSelectedOption(option.key)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
                <div className='flex-column w-full justify-between items-center pt-2 rounded-lg bg-gray-600 p-10'>
                    <div className="text-lg text-white m-2 text-center">Ваші повідомлення</div>
                    {filteredMsgs.length > 0 ? (
                        filteredMsgs.map(msg => (
                            <MailItem key={msg.id} {...msg} />
                        ))
                    ) : (
                        <div className="text-white">Повідомлення відсутні</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default observer(UserMail);
