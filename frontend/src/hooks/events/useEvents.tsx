import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addEvent,
  getEvents,
  deleteEvent,
  editEvent,
  AddEventPayload,
  EditEventPayload,
} from '../../actions/eventActions';
import type { Event } from '../../utils/types.ts';
import { AxiosError } from 'axios';
import { toaster } from '../../components/ui/toaster';

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

  return useMutation<void, AxiosError, { data: AddEventPayload }>({
    mutationFn: async ({ data }) => {
      await addEvent(data);
    },
    onSuccess: () => {
      toaster.create({
        title: 'Success',
        description: 'Event successfully added.',
        type: 'success',
      });

      queryClient.invalidateQueries({ queryKey: ['allEvents'] });
    },
    onError: (error: AxiosError) => {
      toaster.create({
        title: 'Error',
        description: `Error adding event: ${error.message}`,
        type: 'error',
      });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { eventId: number }>({
    mutationKey: ['allEvents'],
    mutationFn: async ({ eventId }) => {
      const response = await deleteEvent(eventId);
      if (!response.success) {
        throw new Error(response.message);
      }
    },
    onSuccess: () => {
      toaster.create({
        title: 'Success',
        description: 'Event successfully deleted.',
        type: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['allEvents'] });
    },
    onError: (error: AxiosError) => {
      toaster.create({
        title: 'Error',
        description: `Error deleting event: ${error.message}`,
        type: 'error',
      });
    },
  });
};

export const useEditEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { updatedEvent: EditEventPayload; id: number }>({
    mutationFn: async ({ updatedEvent, id }) => {
      await editEvent(id, updatedEvent);
    },
    onSuccess: () => {
      toaster.create({
        title: 'Success',
        description: 'Event successfully updated.',
        type: 'success',
      });

      queryClient.invalidateQueries({ queryKey: ['allEvents'] });
    },
    onError: (error: AxiosError) => {
      toaster.create({
        title: 'Error',
        description: `Error updating event: ${error.message}`,
        type: 'error',
      });
    },
  });
};
