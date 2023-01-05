
const Icon = ({ color, icon, w, h, size,hover, classes, z, ...props }) => {

    return (
        <div  {...props} style={{ color }} className={
            `${hover && "opacity-50 hover:opacity-100"} cursor-pointer ${classes ?? ""} ${z && "z-50"}`} >
            <iconify-icon icon={icon ?? "mdi:favourite"} width={w ?? size ?? 18} height={h ?? size ?? 18} />
        </div>
    );
};

export default Icon;