import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import { Note, TableData, QueryParamsProps } from '../utils/types';

export const getNotes = async (params?: QueryParamsProps) =>
  axiosFetch<TableData<Note>>({ url: API.notes.all, params });
export const deleteNote = async (noteId: number) =>
  axiosFetch<TableData<Note>>({
    url: API.notes.note(noteId),
    method: 'delete',
  });
export const editNote = async (data: Note, noteId: number, params?: QueryParamsProps) =>
  axiosFetch<TableData<Note>>({
    url: API.notes.note(noteId),
    method: 'patch',
    data,
    params,
  });
export const addNote = async (
  data: Omit<Note, 'date' | 'isActive' | 'createdAt' | 'updatedAt' | 'id'>,
  params?: QueryParamsProps,
) =>
  axiosFetch<TableData<Note>>({
    url: API.notes.all,
    method: 'post',
    data,
    params,
  });
