import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { FC, useEffect, useState } from "react";
import { MailItem } from "./components/MailItem";
import { IMsg } from "../../models/IMsg";

const UserMail: FC = () => {
    const { store } = useStore();
    const user = store.auth.user;
    const [selectedOption, setSelectedOption] = useState<string>("Inbox");
    const [filteredMsgs, setFilteredMsgs] = useState<IMsg[]>([]);
    const userInfo = store.auth.user;
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
        { key: "newMessages", label: "Inbox" },
        { key: "allMessages", label: "All" },
        { key: "unrepliedMessages", label: "Unreclined" },
        { key: "acceptedMessages", label: "Accepted" },
        { key: "declinedMessages", label: "Declined" },
    ];

    return (
        <div className="mt-[124px] container-xl mx-auto">
            <div className="flex w-full min-h-[700px] ">
                <div className="w-[450px] flex-grow bg-blue-100 p-5 flex-column max-h-[700px] rounded-xl">
                    <div className="bg-blue-300 w-full rounded-xl flex justify-center items-center  p-6 mb-5 cursor-pointer transition hover:bg-blue-400">
                        <div className="w-16 h-16 bg-blue-500 rounded-full mb-2 mr-4"></div>
                        <div className="" >
                            <p className="text-2xl font-bold text-2xl">{userInfo.username}</p>
                            <p className="text-lg text-grey-800">+{userInfo.phoneNumber}</p>
                        </div>
                    </div>

                    <div className="">   {
                        options.map(option => (
                            <div
                                key={option.key}
                                className={`text-2xl text-gray-900 rounded-xl p-4 ${selectedOption === option.label ? 'bg-blue-300 text-white' : ''} mb-1 cursor-pointer`}
                                onClick={() => setSelectedOption(option.label)}
                            >
                                {option.label}
                            </div>
                        ))}</div>
                </div>
                <div className=' flex-column w-full justify-between items-center pt-2 min-h-[600px] p-10 flex-grow '>
                    <div className="text-5xl w-full text-gray-900 pl-10 rounded-xl bg-blue-100 py-4">{selectedOption}</div>
                    <div className="bg-blue-100 h-full rounded-xl p-5 mt-4 relative ">
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
        </div>

    );
};

export default observer(UserMail);
