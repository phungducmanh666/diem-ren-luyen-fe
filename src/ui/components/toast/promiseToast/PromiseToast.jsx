import React from "react";
import { toast } from "react-toastify";

function PromiseToast({ promise, title, onSuccess, onFailed }) {
  return toast.promise(promise, {
    pending: title,
    success: {
      render({ data }) {
        return onSuccess(data);
      },
    },
    error: {
      render({ data }) {
        return onFailed(data);
      },
    },
  });
}

export default PromiseToast;
