import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import { FilterParams, Note, TableData } from '../utils/types';
import { AxiosError } from 'axios';

type NoteResponse = {
  success: boolean;
  message: string;
  notes: Note[];
};

export const getNotes = async (params?: FilterParams) =>
  axiosFetch<TableData<Note> | AxiosError>({ url: API.notes.all, params });
export const deleteNote = async (noteId: number) =>
  axiosFetch<NoteResponse | AxiosError>({
    url: API.notes.note(noteId),
    method: 'delete',
  });
