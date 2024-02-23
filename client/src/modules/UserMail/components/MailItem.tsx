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
    <div onClick={() => setExpanded(true)} className={`w-full rounded border cursor-pointer hover:bg-gray-500 mt-3 p-3 ${isViewed ? 'bg-gray-600' : 'bg-gray-400'}`}>
      <div>Від: {sender.id}</div>
      <div>Для: {receiver.id}</div>
      {expanded && (
        <>
          <div>Повідомлення: {text}</div>
          <div>Час: {formattedTime}</div>
          <div>Статус: {msgStatus}</div>
          <div onClick={(event) => { event.stopPropagation(); setExpanded(!expanded); }} className="mx-auto py-1 w-[80px] rounded bg-gray-600 text-center text-gray-300" >Закрити</div>          <div className="flex justify-around mt-3">
            <button className="px-4 py-2 rounded bg-green-500 text-white" onClick={() => { handleOpenModal('accept') }}>Прийняти</button>
            <Modal isOpen={isAcceptModalOpen} onClose={closeModal}>
              <AcceptRequestModal date={formattedTime} service={service} senderId={sender.id} receiverId={receiver.id} msgId={id} />
            </Modal >
            <button className="px-4 py-2 rounded bg-red-500 text-white" onClick={() => { handleOpenModal('decline') }}>Відмовити</button>
            <Modal isOpen={isDeclineModalOpen} onClose={closeModal}>
              <DeclineRequestModal date={formattedTime} service={service} senderId={sender.id} receiverId={receiver.id} msgId={id} />
            </Modal >
          </div>
        </>
      )}
    </div>
  );
};


