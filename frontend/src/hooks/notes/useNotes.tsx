import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type { Note, QueryParamsProps, TableData } from '../../utils/types.ts';
import { getNotes, addNote, editNote, deleteNote, NotePayload } from '../../actions/noteActions.ts';
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

  return useMutation<TableData<Note>, AxiosError, { newNote: NotePayload }>({
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
      toaster.create({
        title: 'Error',
        description: `An error has occurred. ${error}`,
        type: 'error',
      });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation<TableData<Note>, AxiosError, { noteId: number }>({
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
      toaster.create({
        title: 'Error',
        description: `An error has occurred. ${error}`,
        type: 'error',
      });
    },
  });
};

export const useEditNote = () => {
  const queryClient = useQueryClient();

  return useMutation<
    TableData<Note>,
    AxiosError,
    { updatedNote: Omit<NotePayload, 'ownerId'>; id: number }
  >({
    mutationKey: ['allNotes'],
    mutationFn: async ({ updatedNote, id }) => {
      try {
        return await editNote(updatedNote, id);
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
      toaster.create({
        title: 'Error',
        description: `An error has occurred. ${error}`,
        type: 'error',
      });
    },
  });
};
