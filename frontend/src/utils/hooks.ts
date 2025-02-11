import { toaster } from '../components/ui/toaster.tsx';
import { BaseResponse, ToastForErrorHookErrorType } from './types.ts';

export const toastForSuccessHook = ({ response }: { response: BaseResponse }) => {
  toaster.create({
    title: 'Success',
    description: response.message || 'Success',
    type: 'success',
  });
};

export const toastForErrorHook = ({ error }: { error: ToastForErrorHookErrorType }) => {
  toaster.create({
    title: 'Error',
    description: error.response?.data?.message || error.message || 'Error',
    type: 'error',
  });
};
