import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  AddNotePayload,
  BaseResponse,
  EditNotePayload,
  Note,
  NoteResponse,
  QueryParamsProps,
  TableData,
  ToastForErrorHookErrorType,
} from '../../utils/types';
import { getNotes, addNote, editNote, deleteNote } from '../../actions/noteActions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastForErrorHook, toastForSuccessHook } from '../../utils/hooks';

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

  return useMutation<NoteResponse, ToastForErrorHookErrorType, { newNote: AddNotePayload }>({
    mutationKey: ['allNotes'],
    mutationFn: async ({ newNote }) => {
      const response = await addNote(newNote);
      return response;
    },
    onSuccess: (response) => {
      toastForSuccessHook({ response });
      queryClient.invalidateQueries({ queryKey: ['allNotes'] });
    },
    onError: (error) => {
      toastForErrorHook({ error });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation<BaseResponse, ToastForErrorHookErrorType, { noteId: number }>({
    mutationKey: ['allNotes'],
    mutationFn: async ({ noteId }) => {
      const response = deleteNote(noteId);
      return response;
    },
    onSuccess: (response) => {
      toastForSuccessHook({ response });
      queryClient.invalidateQueries({ queryKey: ['allNotes'] });
    },
    onError: (error) => {
      toastForErrorHook({ error });
    },
  });
};

export const useEditNote = () => {
  const queryClient = useQueryClient();

  return useMutation<
    NoteResponse,
    ToastForErrorHookErrorType,
    { updatedNote: EditNotePayload; id: number }
  >({
    mutationKey: ['allNotes'],
    mutationFn: async ({ updatedNote, id }) => {
      const response = await editNote(id, updatedNote);
      return response;
    },
    onSuccess: (response) => {
      toastForSuccessHook({ response });
      queryClient.invalidateQueries({ queryKey: ['allNotes'] });
    },
    onError: (error) => {
      toastForErrorHook({ error });
    },
  });
};
