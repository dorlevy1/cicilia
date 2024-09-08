import { toast } from 'react-toastify';

const useToast = () => {
    const showToast = (message, type = 'default') => {
        switch (type) {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            case 'info':
                toast.info(message);
                break;
            case 'warning':
                toast.warn(message);
                break;
            default:
                toast(message); // Default toast
        }
    };

    return { showToast };
};

export default useToast;
