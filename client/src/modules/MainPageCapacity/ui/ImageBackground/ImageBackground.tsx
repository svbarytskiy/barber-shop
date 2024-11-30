import { FC } from "react";

interface ImageBackgroundProps {
    imagePath: string;
    additionalStyles?: string;
}

const ImageBackground: FC<ImageBackgroundProps> = ({ imagePath, additionalStyles = "" }) => {
    return (
        <figure
            className={`w-full md:w-[600px] h-[300px] md:h-[400px] rounded-md bg-cover bg-center ${additionalStyles}`}
            style={{ backgroundImage: `url(${imagePath})` }}
        >
            <img src={imagePath} alt="Background" className="invisible w-full h-full object-cover" />
        </figure>
    );
}

export default ImageBackground;
