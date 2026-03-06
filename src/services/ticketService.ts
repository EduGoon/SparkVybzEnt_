import { apiFetch } from './api';
import { Ticket } from '../utilities/types';

interface ListResponse<T> {
  data: T[];
}

export const listUserTickets = async (): Promise<ListResponse<Ticket>> => {
  return apiFetch<ListResponse<Ticket>>('/tickets');
};

export const purchaseTickets = async (
  eventId: string,
  ticketTypeId: string,
  quantity: number
): Promise<ListResponse<Ticket>> => {
  return apiFetch<ListResponse<Ticket>>('/tickets/purchase', {
    method: 'POST',
    body: { eventId, ticketTypeId, quantity },
  });
};

export const refundTicket = async (id: string): Promise<{ message: string }> => {
  return apiFetch<{ message: string }>(`/tickets/${id}/refund`, {
    method: 'POST',
  });
};
