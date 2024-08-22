import React, { FC, useState } from "react";
import { useStore } from "../../../hooks/useStore";
import Modal from "../../../comon/ui/ModalWrapper/ModalWrapper";
import { AcceptRequestModal } from "./AcceptRequestModal";
import { DeclineRequestModal } from "./DeclineRequestModal";

interface MailItemProps {
  id: string;
  text: string;
  time: Date;
  sender: { id: string };
  receiver: { id: string }
  isViewed: boolean;
  msgStatus: string;
  service: string
}

export const MailItem: FC<MailItemProps> = ({
  id,
  isViewed,
  msgStatus,
  receiver,
  sender,
  text,
  time,
  service
}) => {

  const formattedTime = new Date(time).toLocaleString();
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState<boolean>(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState<boolean>(false);
  const [expanded, setExpanded] = useState(false);

  const closeModal = () => {
    setIsDeclineModalOpen(false);
    setIsAcceptModalOpen(false)
  };

  const handleOpenModal = (type: string) => {
    if (type === 'accept') {
      setIsDeclineModalOpen(false);
      setIsAcceptModalOpen(true);
    } else if (type === 'decline') {
      setIsDeclineModalOpen(true);
      setIsAcceptModalOpen(false);
    }
  };


  return (
    <div onClick={() => setExpanded(true)} className={`w-full  transition rounded-xl flex border cursor-pointer hover:bg-blue-300 mt-3 p-3 ${isViewed ? 'bg-blue-300' : 'bg-blue-200'}  ${expanded ? 'flex-col h-4/6 absolute h-5/6 top-5 w-[calc(100%-41px)]	' : ''}`}>
      <div className="w-16 h-16 bg-blue-500 rounded-full mb-2 mr-4"></div>
      <div className="">
        <div className="text-3xl">From {sender.id}</div>
        <div className="text-xx">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, possimus!...</div>
      </div>

      {expanded && (
        <>
          <div>Повідомлення: {text}</div>
          <div>Час: {formattedTime}</div>
          <div>Статус: {msgStatus}</div>
          <div onClick={(event) => { event.stopPropagation(); setExpanded(!expanded); }} className="mx-auto absolute right-5 top-5 py-1 w-[80px] rounded bg-gray-600 text-center text-gray-300" >Закрити</div>
          <div className="flex mt-auto mb-5 ml-auto mr-5">
            <button className="px-4 py-2 rounded bg-gray-900 text-white mr-5" onClick={() => { handleOpenModal('accept') }}>Accept</button>
            <Modal isOpen={isAcceptModalOpen} onClose={closeModal}>
              <AcceptRequestModal date={formattedTime} service={service} senderId={sender.id} receiverId={receiver.id} msgId={id} />
            </Modal >
            <button className="px-4 py-2 rounded bg-red-500 text-white" onClick={() => { handleOpenModal('decline') }}>Decline</button>
            <Modal isOpen={isDeclineModalOpen} onClose={closeModal}>
              <DeclineRequestModal date={formattedTime} service={service} senderId={sender.id} receiverId={receiver.id} msgId={id} />
            </Modal >
          </div>
        </>
      )}
    </div>
  );
};


