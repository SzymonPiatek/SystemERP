import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import { Notes } from '../utils/types';

type NoteResponse = {
  success: boolean;
  message: string;
  notes: Notes[];
};

export const getNotes = async () => axiosFetch<{ data: NoteResponse }>({ url: API.notes.all });
