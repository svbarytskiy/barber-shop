import { FC, useState } from "react";

interface CollapsibleSectionProps {
    title: string;
    children: React.ReactNode;
    defaultCollapsed?: boolean;
}

const CollapsibleSection: FC<CollapsibleSectionProps> = ({
    title,
    children,
    defaultCollapsed = false
}) => {
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

    const toggleCollapse = () => {
        setIsCollapsed(prev => !prev);
    };

    return (
        <div className="w-full my-2">
            <div className="flex items-center justify-between">
                <h2 className="text-base mb-2 text-gray-900 sm:text-xl font-bold">{title}</h2>
                <button
                    onClick={toggleCollapse}
                    className="p-2 rounded-lg focus:outline-none lg:hidden"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 transition-transform ${isCollapsed ? 'rotate-180' : 'rotate-0'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
            <div className={`${isCollapsed ? 'hidden' : 'block'} lg:block`}>
                {children}
            </div>
        </div>
    );
};

export default CollapsibleSection;
