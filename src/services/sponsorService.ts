import { apiFetch } from './api';
import { Sponsor } from '../utilities/types';

interface ListResponse<T> {
  data: T[];
}

export const listSponsors = async (): Promise<ListResponse<Sponsor>> => {
  return apiFetch<ListResponse<Sponsor>>('/sponsors');
};

export const createSponsor = async (sponsor: Partial<Sponsor>): Promise<Sponsor> => {
  return apiFetch<Sponsor>('/sponsors', {
    method: 'POST',
    body: sponsor,
  });
};

export const updateSponsor = async (id: string, sponsor: Partial<Sponsor>): Promise<Sponsor> => {
  return apiFetch<Sponsor>(`/sponsors/${id}`, {
    method: 'PUT',
    body: sponsor,
  });
};

export const deleteSponsor = async (id: string): Promise<void> => {
  return apiFetch<void>(`/sponsors/${id}`, {
    method: 'DELETE',
  });
};
