import { useEffect, useRef } from "react";

const ErrorBar = ({ err = "Something Went Wrong !" }) => {
    const msgRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            msgRef.current.style.display = "none";
        }, 15000);
        return () => clearTimeout();
    }, []);

    return (
        <div ref={msgRef} className='flex fixed p-4 errBar bottom-0 w-full items-center h-4 
            justify-center text-center text-white font-poppins'>
            <p className='text-xl font-medium truncate'>{err}</p>
        </div>
    )
};

export default ErrorBar;