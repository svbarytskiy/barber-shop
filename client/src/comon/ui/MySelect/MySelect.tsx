import React, { FC, useState, useRef, useEffect } from "react";

export interface Option {
  value: string;
  label: string;
}

interface MySelectProps {
  options: Option[];
  selectedOption?: string; // Це має бути значенням, а не об'єктом Option
  onChange: (selectedValue: string) => void;
}

const MySelect: FC<MySelectProps> = ({ options, onChange, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Ініціалізація стану з використанням selectedOption як значення для пошуку в масиві options
  const [newSelectedOption, setNewSelectedOption] = useState<Option | undefined>(options.find(option => option.value === selectedOption));
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: Option) => {
    setNewSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative text-left my-4 ml-3" ref={dropdownRef}>
      <div>
        <span
          onClick={handleToggle}
          className="cursor-pointer rounded-md px-4 py-2 inline-flex items-center border border-gray-300 shadow-sm text-x font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {newSelectedOption ? newSelectedOption.label : "Select an option"}
        </span>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionSelect(option)}
                className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                role="menuitem"
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MySelect;
