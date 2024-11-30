import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import { Event } from '../utils/types';

type EventResponse = {
  success: boolean;
  message: string;
  events: Event[];
};

export const getEvents = async () => axiosFetch<{ data: EventResponse }>({ url: API.events.all });
