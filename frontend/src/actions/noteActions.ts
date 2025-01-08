import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import { Note, TableData, QueryParamsProps } from '../utils/types';

export type NotePayload = {
  ownerId: number;
  title: string;
  description: string;
};

export const getNotes = async (params?: QueryParamsProps) =>
  axiosFetch<TableData<Note>>({ url: API.notes.all, params });
export const deleteNote = async (noteId: number) =>
  axiosFetch<TableData<Note>>({
    url: API.notes.note(noteId),
    method: 'delete',
  });
export const editNote = async (
  data: Omit<NotePayload, 'ownerId'>,
  noteId: number,
  params?: QueryParamsProps,
) =>
  axiosFetch<TableData<Note>>({
    url: API.notes.note(noteId),
    method: 'patch',
    data,
    params,
  });
export const addNote = async (data: NotePayload, params?: QueryParamsProps) =>
  axiosFetch<TableData<Note>>({
    url: API.notes.all,
    method: 'post',
    data,
    params,
  });
