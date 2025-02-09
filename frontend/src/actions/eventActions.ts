import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import type {
  AddEventPayload,
  EditEventPayload,
  EventResponse,
  EventsResponse,
  QueryParamsProps,
} from '../utils/types';

export const getEvents = async (params?: QueryParamsProps) => {
  return axiosFetch<EventsResponse>({ url: API.events.all, params });
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
