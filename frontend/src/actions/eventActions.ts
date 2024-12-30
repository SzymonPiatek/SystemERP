import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import { Event } from '../utils/types';
import { AxiosError } from 'axios';

type AddEventPayload = {
  title: string;
  startDate: string;
  endDate: string;
  ownerId: number;
};

type EventResponse = {
  success: boolean;
  message: string;
  events: Event[];
};

export const getEvents = async () => {
  return axiosFetch<{ events: Event[] }>({ url: API.events.all });
};

export const addEvent = async (data: AddEventPayload) =>
  axiosFetch<EventResponse | AxiosError>({
    url: API.events.all,
    method: 'post',
    data,
  });
