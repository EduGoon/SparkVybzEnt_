import { useAuth } from './AuthContext';

export interface Ticket {
  id: number;
  eventId: number;
  eventTitle: string;
  eventDate: string;
  ticketType: string;
  quantity: number;
  totalPrice: number;
  purchaseDate: string;
  status: 'confirmed' | 'pending' | 'used';
}

export const useTickets = () => {
  const { user } = useAuth();

  // For demo mode, use a fixed demo user ID
  const currentUserId = user?.id || 999; // Demo user ID

  const getUserTickets = (): Ticket[] => {
    const stored = localStorage.getItem(`tickets_${currentUserId}`);
    const tickets = stored ? JSON.parse(stored) : [];
    console.log('Getting tickets for user', currentUserId, ':', tickets);
    return tickets;
  };

  const addTicket = (ticket: Omit<Ticket, 'id' | 'purchaseDate'>) => {
    const tickets = getUserTickets();
    const newTicket: Ticket = {
      ...ticket,
      id: Date.now(),
      purchaseDate: new Date().toISOString(),
    };
    tickets.push(newTicket);
    localStorage.setItem(`tickets_${currentUserId}`, JSON.stringify(tickets));
    console.log('Added ticket for user', currentUserId, ':', newTicket);
    console.log('All tickets now:', tickets);
  };

  return { getUserTickets, addTicket };
};