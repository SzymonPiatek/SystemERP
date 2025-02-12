import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import {
  AddNotePayload,
  BaseResponse,
  EditNotePayload,
  Note,
  NoteResponse,
  QueryParamsProps,
  TableData,
} from '../utils/types';

export const getNotes = async (params?: QueryParamsProps) =>
  axiosFetch<TableData<Note>>({ url: API.notes.all, params });

export const deleteNote = async (noteId: number) =>
  axiosFetch<BaseResponse>({
    url: API.notes.note(noteId),
    method: 'delete',
  });
export const editNote = async (noteId: number, data: EditNotePayload) =>
  axiosFetch<NoteResponse>({
    url: API.notes.note(noteId),
    method: 'patch',
    data,
  });
export const addNote = async (data: AddNotePayload) =>
  axiosFetch<NoteResponse>({
    url: API.notes.all,
    method: 'post',
    data,
  });
