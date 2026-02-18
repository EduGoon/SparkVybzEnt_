export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  featured: boolean;
  status: 'upcoming' | 'ongoing' | 'completed';
  tickets: Ticket[];
  organizer: string;
  capacity: number;
  soldTickets: number;
}

export interface Ticket {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string;
  tier: 'gold' | 'silver' | 'bronze';
}

export interface Analytics {
  totalEvents: number;
  totalTicketsSold: number;
  totalRevenue: number;
  eventsByCategory: { [key: string]: number };
  monthlyRevenue: { month: string; revenue: number }[];
}