import { FC } from "react";

const NoItemsBlock: FC = () => {
    return (
        <>
            <div className="relative mx-auto flex flex-col items-center  rounded-lg p-10 min-h-[400px]">
                <div className="relative z-10 w-[200px] h-[200px] bg-blue-200 rounded-[40%_60%_50%_70%] shadow-xl overflow-hidden">
                    <img
                        src="/assets/josukani.png"
                        alt="No items illustration"
                        className="object-cover w-full h-full"
                    />
                </div>

                <p className="relative z-10 mt-10 w-full text-2xl font-bold text-gray-900 text-center drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] animate-pulse">
                    No items
                </p>
              
            </div>
        </>
    );
};

export default NoItemsBlock;
