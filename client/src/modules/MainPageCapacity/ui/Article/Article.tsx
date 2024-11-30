import { FC } from "react"

interface ArticleProps {
    title: string,
    text: string,
    styles: string
}

const Article: FC<ArticleProps> = ({ title, text, styles }) => {
    return (
        <article className={`max-w-full md:max-w-[400px] mt-5 md:mt-0 ${styles}`}>
            <h1 className="text-3xl md:text-2xl lg:text-4xl mb-3 md:mb-5">{title}</h1>
            <p className="text-base md:text-lg mb-5">{text}</p>
        </article>
    );
}

export default Article;
