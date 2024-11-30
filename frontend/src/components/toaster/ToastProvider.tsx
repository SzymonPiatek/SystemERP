import { Toaster } from 'react-hot-toast';

function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder
      gutter={20}
      toastOptions={{
        duration: 3000 * 1000,
        style: {
          maxWidth: 300,
          width: '100%',
          display: 'flex',
          fontWeight: 600,
          fontSize: '1rem',
          wordBreak: 'break-word',
          padding: '1rem',
          lineHeight: '1.5',
        },
      }}
      containerStyle={{
        top: 84,
      }}
    />
  );
}

export default ToastProvider;
