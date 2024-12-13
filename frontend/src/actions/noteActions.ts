import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import { Note } from '../utils/types';
import { AxiosError } from 'axios';

type NoteResponse = {
  success: boolean;
  message: string;
  notes: Note[];
};

export const getNotes = async () => axiosFetch<NoteResponse | AxiosError>({ url: API.notes.all });
