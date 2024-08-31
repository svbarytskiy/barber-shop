// TimeInput.tsx
import React, { FC } from "react";

interface TimeInputProps {
    time: string;
}

const TimeInput: FC<TimeInputProps> = ({ time }) => (
    <div className="mb-5">
        <p className="text-lg">Time</p>
        <input
            className="px-4 w-full py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter text here"
            type="text"
            value={time}
            disabled
        />
    </div>
);

export default TimeInput;
