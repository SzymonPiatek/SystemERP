import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type {
  Note,
  NoteResponse,
  QueryParamsProps,
  TableData,
  NotePayload,
} from '../../utils/types.ts';
import { getNotes, addNote, editNote, deleteNote } from '../../actions/noteActions.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toaster } from '../../components/ui/toaster.tsx';

export const useNotes = (params: QueryParamsProps) => {
  return useQuery<TableData<Note>, AxiosError>({
    queryKey: ['allNotes', params],
    queryFn: async () => {
      try {
        return await getNotes(params);
      } catch (error) {
        throw error;
      }
    },
  });
};

export const useAddNote = () => {
  const queryClient = useQueryClient();

  return useMutation<NoteResponse, AxiosError<{ message?: string }>, { newNote: NotePayload }>({
    mutationKey: ['allNotes'],
    mutationFn: async ({ newNote }) => {
      try {
        return await addNote(newNote);
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toaster.create({
        title: 'Success',
        description: 'Note successfully added.',
        type: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['allNotes'] });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      toaster.create({
        title: 'Error',
        description: errorMessage,
        type: 'error',
      });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; message: string },
    AxiosError<{ message?: string }>,
    { noteId: number }
  >({
    mutationKey: ['allNotes'],
    mutationFn: ({ noteId }) => deleteNote(noteId),
    onSuccess: () => {
      toaster.create({
        title: 'Success',
        description: 'Note successfully deleted.',
        type: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['allNotes'] });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      toaster.create({
        title: 'Error',
        description: errorMessage,
        type: 'error',
      });
    },
  });
};

export const useEditNote = () => {
  const queryClient = useQueryClient();

  return useMutation<
    NoteResponse,
    AxiosError<{ message?: string }>,
    { updatedNote: Omit<NotePayload, 'ownerId'>; id: number }
  >({
    mutationKey: ['allNotes'],
    mutationFn: async ({ updatedNote, id }) => {
      try {
        return await editNote(id, updatedNote);
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toaster.create({
        title: 'Success',
        description: 'Note successfully updated.',
        type: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['allNotes'] });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      toaster.create({
        title: 'Error',
        description: errorMessage,
        type: 'error',
      });
    },
  });
};
