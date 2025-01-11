import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import { Event, QueryParamsProps } from '../utils/types';

export type AddEventPayload = {
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
export type EditEventPayload = {
  title: string;
  startDate: string;
  endDate: string;
};
export const getEvents = async (params?: QueryParamsProps) => {
  return axiosFetch<{ events: Event[] }>({ url: API.events.all, params });
};

export const addEvent = async (data: AddEventPayload) =>
  axiosFetch<EventResponse>({
    url: API.events.all,
    method: 'post',
    data,
  });

export const deleteEvent = async (eventId: number) =>
  axiosFetch<EventResponse>({
    url: API.events.event(eventId),
    method: 'delete',
  });
export const editEvent = async (eventId: number, data: EditEventPayload) =>
  axiosFetch<EventResponse>({
    url: API.events.event(eventId),
    method: 'patch',
    data,
  });
