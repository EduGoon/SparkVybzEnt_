import { apiFetch } from './api';
import { Event } from '../utilities/types';

interface ListResponse<T> {
  data: T[];
}

export const listEvents = async (): Promise<ListResponse<Event>> => {
  return apiFetch<ListResponse<Event>>('/events');
};

export const getEvent = async (id: string): Promise<Event> => {
  return apiFetch<Event>(`/events/${id}`);
};

export const createEvent = async (event: Partial<Event>): Promise<Event> => {
  return apiFetch<Event>('/events', {
    method: 'POST',
    body: event,
  });
};

export const updateEvent = async (id: string, event: Partial<Event>): Promise<Event> => {
  return apiFetch<Event>(`/events/${id}`, {
    method: 'PUT',
    body: event,
  });
};

export const deleteEvent = async (id: string): Promise<void> => {
  return apiFetch<void>(`/events/${id}`, {
    method: 'DELETE',
  });
};
