import { useState, ReactNode, useEffect, useRef, FC } from 'react';

interface SelectAccordionProps {
  children: ReactNode;
  defaultText: string;
  className?: string
}

const SelectAccordion: FC<SelectAccordionProps> = ({ children, defaultText, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accordionRef.current && !accordionRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    // Додаємо слухача на подію кліку
    document.addEventListener('mousedown', handleClickOutside);

    // Видаляємо слухача при розмонтажі компонента
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative w-[160px] ${className}`} ref={accordionRef}>
      {/* Кнопка для відкриття/закриття акордеону */}
      <button
        className="w-full flex justify-around items-center px-4 py-2 bg-white text-gray-900 rounded-full focus:outline-none"
        onClick={toggleDropdown}
      >
        <span className='text-base sm:text-lg text-blue-300'>{selectedOption || defaultText}</span>
        <span
          className={`text-blue-200 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'
            }`}
        >
          ▼
        </span>
      </button>

      {/* Випадаючий список з анімацією */}
      <div
        className={`absolute w-full bg-white shadow-lg rounded-xl mt-2 z-10 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
          }`}
        style={{ transitionProperty: 'max-height, opacity' }}
      >
        <ul>
          {children}
        </ul>
      </div>
    </div>
  );
};

export default SelectAccordion;
