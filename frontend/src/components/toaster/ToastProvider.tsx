import { Toaster } from 'react-hot-toast';

function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      gutter={20}
      toastOptions={{
        duration: 3000,
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
    />
  );
}

export default ToastProvider;
