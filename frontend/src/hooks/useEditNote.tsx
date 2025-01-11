import { useMutation } from '@tanstack/react-query';
import { editNote } from '../actions/noteActions';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

type EditNotePayload = {
  title: string;
  description: string;
};

export const useEditNote = (fetchData: () => void) => {
  return useMutation<void, AxiosError, { noteId: number; data: EditNotePayload }>({
    mutationFn: async ({ noteId, data }) => {
      await editNote(noteId, data);
    },
    onSuccess: () => {
      toast.success('Note successfully updated!');
      fetchData();
    },
    onError: (error: AxiosError) => {
      toast.error('Error updating note.');
      toast.error(error.message);
    },
  });
};
