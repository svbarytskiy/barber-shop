import { FC } from "react"

interface LogoProps {
    size:  string;
}

const Logo: FC<LogoProps> = (size) => {
    return (
        <>
            <figure className={`h-full max-h-[50px] w-full max-w-[160px] flex items-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 123.78 46.46"><path d="M123.35,34.8c-1.55-3.94-7.2-6.42-12.64-4.18L99.65,0a54.24,54.24,0,0,0,.72,15.3c1,5.43,2.88,9.48,6.54,17.58,4,8.92,6.09,13.38,8.49,13.57C119.3,46.75,125.47,40.19,123.35,34.8Zm-15.44-7.12c-.1.32-.4.81-.79.79s-.61-.5-.67-.84c-.14-.75.49-1.61.92-1.55S108.13,27,107.91,27.68Zm9.14,15.2c-1.9.19-4.34-3.39-5.62-8.9,2.84-2.3,6.69-1.8,8.36.34C122.17,37.38,119.21,42.67,117.05,42.88Z" style={{ fill: "#2956e5" }} /><path d="M114.84,0,103.77,30.62c-5.44-2.24-11.08.24-12.63,4.18-2.12,5.39,4,12,8,11.65,2.39-.19,4.46-4.65,8.49-13.57,3.66-8.1,5.49-12.15,6.53-17.58A53.93,53.93,0,0,0,114.84,0ZM97.44,42.88c-2.17-.21-5.13-5.5-2.74-8.56,1.67-2.14,5.51-2.64,8.36-.34C101.78,39.49,99.34,43.07,97.44,42.88Zm10.47-15.2c-.1.32-.4.81-.79.79s-.61-.5-.67-.84c-.14-.75.49-1.61.92-1.55S108.13,27,107.91,27.68Z" style={{ fill: "#0021ac" }} /><path d="M11.51,24.41a8.9,8.9,0,0,1,4,1.83,4,4,0,0,1,1.11,3,5,5,0,0,1-2,4.35Q12.6,35,8.32,35H.48Q0,35,0,34.66V34c0-.2.14-.34.43-.43.61-.21.92-.51.92-.91V18.72a.5.5,0,0,0-.13-.39A3.2,3.2,0,0,0,.45,18c-.22-.07-.34-.15-.38-.24a2,2,0,0,1,0-.62.82.82,0,0,1,.16-.59,1,1,0,0,1,.59-.14H9.56a8.55,8.55,0,0,1,4.87,1.16,3.47,3.47,0,0,1,1.7,3,3,3,0,0,1-1.34,2.51A7.43,7.43,0,0,1,11.51,24.41Zm-4.2-6.69v6.05h.85a2,2,0,0,0,1.26-.34A1.44,1.44,0,0,0,10,22.32c.05-.52.07-1.17.07-2a3.43,3.43,0,0,0-.44-2.15,1.81,1.81,0,0,0-1.42-.49Zm0,7.36v8.61a4.51,4.51,0,0,0,2-.29,1.37,1.37,0,0,0,.6-1.14c0-.57.08-1.53.08-2.88,0-.28,0-.9,0-1.88a6.47,6.47,0,0,0-.2-1.77,1,1,0,0,0-.5-.48,2.67,2.67,0,0,0-1.07-.17Z" style={{ fill: "#0c0052" }} /><path d="M25.61,31h-4l-.19,1.06a.26.26,0,0,1,0,.1,1.71,1.71,0,0,0-.14.6c0,.28.25.51.75.71a1,1,0,0,1,.5.31,1.12,1.12,0,0,1,.09.53,1.28,1.28,0,0,1-.07.57.44.44,0,0,1-.34.1H18c-.24,0-.35-.18-.35-.53a1.18,1.18,0,0,1,.56-1,1.32,1.32,0,0,0,.61-.76l3-13.56a2.43,2.43,0,0,0,.08-.55c0-.23-.23-.45-.69-.63a.59.59,0,0,1-.33-.61,2,2,0,0,1,.1-.79c.06-.09.24-.14.51-.14h6.13a.82.82,0,0,1,.78.38,5.81,5.81,0,0,1,.45,1.66c.07.33.13.65.19,1L31.61,32.1a2.12,2.12,0,0,0,.94,1.41,1.37,1.37,0,0,1,.28.2,1,1,0,0,1,.06.45,1.44,1.44,0,0,1-.11.72.64.64,0,0,1-.48.14H25.18c-.22,0-.32-.15-.32-.44a1.62,1.62,0,0,1,.08-.69,1,1,0,0,1,.46-.33c.37-.17.56-.38.56-.64A11.63,11.63,0,0,0,25.61,31ZM23.69,20.71l-1.81,9h3.56Z" style={{ fill: '#0c0052' }} /><path d="M41.07,26.83v5.72a1.3,1.3,0,0,0,.07.54.86.86,0,0,0,.4.29A.68.68,0,0,1,42,34a1.26,1.26,0,0,1-.17.82.94.94,0,0,1-.62.16H34.41a.52.52,0,0,1-.58-.6,3.59,3.59,0,0,1,.05-.75.39.39,0,0,1,.32-.23c.59-.17.89-.5.89-1V18.94a.86.86,0,0,0-.77-.91,1.31,1.31,0,0,1-.49-.18,1,1,0,0,1-.09-.54c0-.6.22-.89.67-.89h8.87A8.14,8.14,0,0,1,48,17.84a4.45,4.45,0,0,1,2.08,3.84q0,3.42-4.86,4.47,4.44.71,4.44,4.05v2.74a.57.57,0,0,0,.37.52.67.67,0,0,1,.43.63,1.55,1.55,0,0,1-.11.8.88.88,0,0,1-.59.13h-4.3a1.57,1.57,0,0,1-1.27-.63,2.43,2.43,0,0,1-.49-1.55V28.19c0-.9-.64-1.36-1.91-1.36Zm0-9.1V25.5h1c1.06,0,1.59-.77,1.59-2.3V19.49a1.62,1.62,0,0,0-.51-1.36,2.5,2.5,0,0,0-1.58-.4Z" style={{ fill: '#0c0052' }} /><path d="M62.83,24.41a9,9,0,0,1,4,1.83,4,4,0,0,1,1.11,3,5,5,0,0,1-2,4.35Q63.9,35,59.64,35H51.8c-.33,0-.49-.12-.49-.36V34c0-.2.15-.34.44-.43.61-.21.91-.51.91-.91V18.72a.47.47,0,0,0-.13-.39,3,3,0,0,0-.77-.32c-.21-.07-.34-.15-.37-.24a1.86,1.86,0,0,1-.06-.62.81.81,0,0,1,.17-.59,1,1,0,0,1,.58-.14h8.79a8.59,8.59,0,0,1,4.88,1.16,3.47,3.47,0,0,1,1.7,3,3,3,0,0,1-1.34,2.51A7.53,7.53,0,0,1,62.83,24.41Zm-4.2-6.69v6.05h.85a2.07,2.07,0,0,0,1.26-.34,1.44,1.44,0,0,0,.52-1.11c.05-.52.08-1.17.08-2a3.5,3.5,0,0,0-.44-2.15,1.83,1.83,0,0,0-1.42-.49Zm0,7.36v8.61a4.57,4.57,0,0,0,2-.29,1.38,1.38,0,0,0,.59-1.14q.09-.85.09-2.88c0-.28,0-.9,0-1.88a6.65,6.65,0,0,0-.19-1.77,1.09,1.09,0,0,0-.51-.48,2.62,2.62,0,0,0-1.06-.17Z" style={{ fill: "#0c0052" }} /><path d="M76.59,17.83v6.58h1.09a1.1,1.1,0,0,0,.65-.14,1,1,0,0,0,.33-.59,3.26,3.26,0,0,1,.31-1,.43.43,0,0,1,.37-.17,6.53,6.53,0,0,1,1.44.08c.11.05.17.24.17.58V27a.54.54,0,0,1-.16.47,2.56,2.56,0,0,1-1,.11,1.26,1.26,0,0,1-.73-.15,1.74,1.74,0,0,1-.36-.81,1.62,1.62,0,0,0-.34-.75.83.83,0,0,0-.52-.14H76.59V33.7h.85a1.42,1.42,0,0,0,1.08-.32,8.42,8.42,0,0,0,1-1.82,1.33,1.33,0,0,1,1.57-1c.67,0,1,.16,1,.46a1.58,1.58,0,0,1-.07.41L81.38,34a3.25,3.25,0,0,1-.26.86c-.07.1-.29.15-.65.15H69.77c-.27,0-.44-.05-.51-.14a1.44,1.44,0,0,1-.11-.76c0-.27.19-.47.57-.59.59-.18.89-.42.89-.73V18.43c0-.14-.26-.29-.73-.44a1.2,1.2,0,0,1-.57-.28,1.79,1.79,0,0,1-.08-.67.94.94,0,0,1,.09-.54,1.06,1.06,0,0,1,.56-.08H80.11a1.35,1.35,0,0,1,.57.09A.69.69,0,0,1,81,17l.82,3a1.54,1.54,0,0,1,.06.31c0,.21-.26.31-.77.31a3.24,3.24,0,0,1-1.17-.14,1.53,1.53,0,0,1-.56-.72,6.55,6.55,0,0,0-.85-1.44,1.07,1.07,0,0,0-.81-.41Z" style={{ fill: "#0c0052" }} /><path d="M90.33,26.83v5.72a1.3,1.3,0,0,0,.07.54.86.86,0,0,0,.4.29.67.67,0,0,1,.43.66,1.26,1.26,0,0,1-.17.82.94.94,0,0,1-.62.16H83.67q-.57,0-.57-.6a3,3,0,0,1,.05-.75c0-.11.13-.19.32-.23.58-.17.88-.5.88-1V18.94a.86.86,0,0,0-.77-.91,1.17,1.17,0,0,1-.48-.18.88.88,0,0,1-.1-.54c0-.6.23-.89.67-.89h8.87a8.17,8.17,0,0,1,4.73,1.42,4.46,4.46,0,0,1,2.07,3.84q0,3.42-4.86,4.47,4.44.71,4.44,4.05v2.74a.57.57,0,0,0,.37.52.68.68,0,0,1,.44.63,1.51,1.51,0,0,1-.12.8A.88.88,0,0,1,99,35h-4.3a1.54,1.54,0,0,1-1.26-.63,2.38,2.38,0,0,1-.5-1.55V28.19c0-.9-.64-1.36-1.91-1.36Zm0-9.1V25.5h1c1.06,0,1.59-.77,1.59-2.3V19.49a1.62,1.62,0,0,0-.51-1.36,2.48,2.48,0,0,0-1.57-.4Z" style={{ fill: '#0c0052' }} /></svg>
            </figure>
        </>
    )
}
export default Logo