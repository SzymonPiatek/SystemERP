import { useMutation } from '@tanstack/react-query';
import { addEvent } from '../actions/eventActions';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

type AddEventPayload = {
  title: string;
  startDate: string;
  endDate: string;
  ownerId: number;
};

export const useAddEvent = () => {
  return useMutation<void, AxiosError, { data: AddEventPayload }>({
    mutationFn: async ({ data }) => {
      await addEvent(data);
    },
    onSuccess: () => {
      toast.success('Event successfully added!');
    },
    onError: (error: AxiosError) => {
      toast.error('Error adding event.');
      toast.error(error.message);
    },
  });
};
