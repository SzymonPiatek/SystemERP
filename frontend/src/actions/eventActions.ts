import axiosFetch from '../utils/axiosFetch.ts';
import API from '../utils/apiRoutes.ts';
import { Event } from '../utils/types.ts';

type EventResponse = {
  success: boolean;
  message: string;
  events: Event[];
};

export const getEvents = async () =>
  axiosFetch<{ data: EventResponse }>({ url: API.events.all, method: 'get' });
