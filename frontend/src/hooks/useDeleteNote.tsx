import { useMutation } from '@tanstack/react-query';
import { deleteNote } from '../actions/noteActions';
import toast from 'react-hot-toast';

export const useDeleteNote = (fetchData: () => void) => {
  return useMutation<void, any, number>({
    mutationFn: async (noteId: number) => {
      await deleteNote(noteId);
    },
    onSuccess: () => {
      toast.success('Note successfully deleted!');
      fetchData();
    },
    onError: (error: any) => {
      toast.error('Error deleting note.');
      toast.error(error.message);
    },
  });
};
