import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import { Event } from '../utils/types';

export const getEvents = async () => axiosFetch<{ event: Event[] }>({ url: API.events.all });
