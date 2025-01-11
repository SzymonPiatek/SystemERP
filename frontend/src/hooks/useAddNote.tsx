import { useMutation } from '@tanstack/react-query';
import { addNote } from '../actions/noteActions';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

type AddNotePayload = {
  title: string;
  description: string;
};

export const useAddNote = (fetchData: () => void) => {
  return useMutation<void, AxiosError, { data: AddNotePayload }>({
    mutationFn: async ({ data }) => {
      await addNote(data);
    },
    onSuccess: () => {
      toast.success('Note successfully added!');
      fetchData();
    },
    onError: (error: AxiosError) => {
      toast.error('Error adding note.');
      toast.error(error.message);
    },
  });
};
