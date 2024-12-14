import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import { FilterParams, Note, TableData } from '../utils/types';
import { AxiosError } from 'axios';

export const getNotes = async (params?: FilterParams) =>
  axiosFetch<TableData<Note> | AxiosError>({ url: API.notes.all, params });
