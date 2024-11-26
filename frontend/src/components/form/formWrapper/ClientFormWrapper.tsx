import { ReactNode } from 'react';
import { DefaultValues, FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type FormWrapperProps<T extends FieldValues> = {
  onSubmit: (data: T) => Promise<void>;
  children: ReactNode;
  className?: string;
  defaultValues?: DefaultValues<T>;
  onlyTouchedFields?: boolean;
};

function ClientFormWrapper<T extends FieldValues>({
  onSubmit,
  children,
  className,
  defaultValues,
  onlyTouchedFields = false,
}: FormWrapperProps<T>) {
  const methods = useForm<T>({ defaultValues });

  const submitHandler: SubmitHandler<T | Partial<T>> = async (data) => {
    let submittedData = data;

    if (onlyTouchedFields) {
      if (onlyTouchedFields && defaultValues) {
        submittedData = Object.keys(data).reduce((acc, key) => {
          if (defaultValues && defaultValues[key] !== data[key]) {
            acc[key as keyof T] = data[key];
          }
          return acc;
        }, {} as Partial<T>);
      }
    }
    await onSubmit(submittedData as T);
  };

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(submitHandler)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
}

export default ClientFormWrapper;
