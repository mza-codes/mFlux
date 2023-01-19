import { toast } from "react-toastify";

export const scrollToTop = () => {
    return window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const hook = (value, hook) => {
    return hook(state => state[value]);
};

export const toastOptions = {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
    autoClose: 2000,
};