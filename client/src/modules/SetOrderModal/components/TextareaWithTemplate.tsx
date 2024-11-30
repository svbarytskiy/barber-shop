import React, { FC, useState, ChangeEvent } from "react";

interface TextareaWithTemplateProps {
    barberName: string;
    date: string;
    service: string | undefined;
    template: string
    onUpdateText: (text: string) => void; 
}

export const TextareaWithTemplate: FC<TextareaWithTemplateProps> = ({template, barberName, date, service, onUpdateText }) => {
    const [text, setText] = useState(template);
   
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value;
        setText(newText);
        console.log(newText)
        onUpdateText(newText); 
    };

    return (
        <textarea
            className="w-full text-base sm:text-lg h-[150px] p-2 sm:p-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={text}
            onChange={handleChange}
        ></textarea>
    );
};
