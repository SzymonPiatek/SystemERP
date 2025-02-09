import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addEvent, getEvents, deleteEvent, editEvent } from '../../actions/eventActions';
import type {
  AddEventPayload,
  EditEventPayload,
  Event,
  EventResponse,
  ToastForErrorHookErrorType,
} from '../../utils/types';
import { AxiosError } from 'axios';
import { toastForErrorHook, toastForSuccessHook } from '../../utils/hooks';

export const useEvents = () => {
  return useQuery<Event[], AxiosError>({
    queryKey: ['allEvents'],
    queryFn: async () => {
      try {
        const response = await getEvents();
        return response.events;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const useAddEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<EventResponse, ToastForErrorHookErrorType, { data: AddEventPayload }>({
    mutationFn: async ({ data }) => {
      const response = await addEvent(data);
      return response;
    },
    onSuccess: (response) => {
      toastForSuccessHook({ response });
      queryClient.invalidateQueries({ queryKey: ['allEvents'] });
    },
    onError: (error) => {
      toastForErrorHook({ error });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<EventResponse, ToastForErrorHookErrorType, { eventId: number }>({
    mutationKey: ['allEvents'],
    mutationFn: async ({ eventId }) => {
      const response = await deleteEvent(eventId);
      return response;
    },
    onSuccess: (response) => {
      toastForSuccessHook({ response });
      queryClient.invalidateQueries({ queryKey: ['allEvents'] });
    },
    onError: (error) => {
      toastForErrorHook({ error });
    },
  });
};

export const useEditEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<
    EventResponse,
    ToastForErrorHookErrorType,
    { updatedEvent: EditEventPayload; id: number }
  >({
    mutationFn: async ({ updatedEvent, id }) => {
      const response = await editEvent(id, updatedEvent);
      return response;
    },
    onSuccess: (response) => {
      toastForSuccessHook({ response });
      queryClient.invalidateQueries({ queryKey: ['allEvents'] });
    },
    onError: (error) => {
      toastForErrorHook({ error });
    },
  });
};
