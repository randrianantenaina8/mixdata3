import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CustomToast {
  notify(message, options) {
    toast(message, options);
  }

  notifySuccess(message) {
    toast.success(message, {});
  }

  notifyError(message) {
    toast.error(message, {});
  }

  
}

export function createCustomToast() {
  return new CustomToast();
}
