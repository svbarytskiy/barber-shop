import { FC } from "react"

const NoItemsBlock: FC = () => {
    return (
        <>
            <div className="w-full mx-auto flex flex-col items-center">
                <div
                    className="my-10 w-full max-w-[400px] h-[250px] bg-contain bg-no-repeat bg-center relative"
                    style={{ backgroundImage: `url('/assets/josukani.png')` }}
                ></div>
                <p className="my-10 w-full text-2xl text-grey-900 text-center">Немає доступних барберів.</p>
            </div>
        </>
    )
}
export default NoItemsBlock