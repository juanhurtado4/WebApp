/*
  Displays given message in a toast/flash w select defaults
  Default: display toast w/ blue bg at top of screen; auto-hides in 3sec
  https://github.com/fkhadra/react-toastify
  and https://fkhadra.github.io/react-toastify/
*/
import { toast } from "react-toastify";

export function showToastError (msg, options = {}) {
  toast.error(msg, {
    autoClose: 3000,
    bodyClassName: {
      fontFamily: "'Source Sans Pro', sans-serif",
      fontSize: "1.2rem",
      textAlign: "center",
    },
    hideProgressBar: true,
    position: toast.POSITION.TOP_CENTER,
    ...options,
  });
}

export function showToastSuccess (msg, options = {}) {
  toast.success(msg, {
    autoClose: 3000,
    bodyClassName: {
      fontFamily: "'Source Sans Pro', sans-serif",
      fontSize: "1.2rem",
      textAlign: "center",
    },
    hideProgressBar: true,
    position: toast.POSITION.TOP_CENTER,
    ...options,
  });
}
