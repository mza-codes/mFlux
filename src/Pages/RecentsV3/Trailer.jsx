import { useState } from "react";

const Trailer = () => {

    const [trailers, setTrailers] = useState({
        isActive: false,
        list: [],
        data: {}
    });

    const [err, setErr] = useState({
        trailer: {
            active: false,
            msg: "",
            err: {}
        }
    });

    return (
        <main>

            {err?.trailer?.active &&
                <div className='w-[90%] lg:w-1/2'>
                    <p className='font-kanit red'>{err?.trailer?.msg}</p>
                    <p className='font-kanit red'>{err?.trailer?.err?.code}</p>
                </div>}
            {trailers.isActive &&
                <div id='watchTrailer' className='w-auto h-auto'>
                    <div className='w-full flex flex-row justify-between text-white'>
                        <button className='text-2xl m-2 roundBtn' onClick={handleChange} >
                            <i className="ri-refresh-fill"></i>
                        </button>
                        <button className='text-2xl m-2 roundBtn' onClick={e => setTrailers(curr => ({ ...curr, isActive: false }))} >
                            <i className="ri-close-circle-fill"></i>
                        </button>
                    </div>
                    {trailers?.list?.length &&
                        <div className='w-full flex flex-row items-center flex-wrap p-2
                        justify-center text-center gap-2'>
                            {trailers?.list?.map((video) => (
                                <div key={video.key} className="w-16 items-center justify-center text-center flex h-16 
                                    bg-gradient-to-br  from-orange-400 to-red-600 cursor-pointer text-white rounded-lg 
                                    opacity-50 z-50 hover:opacity-100 p-3 m-1 text-xs"
                                    onClick={e => setTrailers(curr => ({ ...curr, data: video }))}>
                                    {video?.type}
                                </div>
                            ))}
                        </div>}
                    <div className="w-full flex items-center justify-center text-center p-1 m-0 ">
                        <iframe allowFullScreen={true} style={{ width: "100%", height: "100%" }}
                            title="Movie Trailers" src={`https://www.youtube.com/embed/${trailers?.data?.key}?fs=1`}>
                        </iframe>
                    </div>
                </div>}
        </main>
    );
};

export default Trailer;