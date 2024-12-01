import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import { Note } from '../utils/types';

type NoteResponse = {
  success: boolean;
  message: string;
  notes: Note[];
};

export const getNotes = async () => axiosFetch<{ data: NoteResponse }>({ url: API.notes.all });
