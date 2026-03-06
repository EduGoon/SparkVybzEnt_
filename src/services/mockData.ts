import { Event, User, Sponsor, Analytics } from '../utilities/types';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Kenya Music Festival 2024',
    description: 'Experience the vibrant Kenyan music scene with top artists from across the country. Featuring traditional and modern sounds.',
    date: '2024-03-15',
    location: 'Nairobi National Park',
    category: 'Music',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    status: 'PUBLISHED',
    organizerId: 'org-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ticketTypes: [
      { id: '1', name: 'VIP', price: 5000, quantity: 100, sold: 10, description: 'VIP access with premium seating' },
      { id: '2', name: 'Regular', price: 2000, quantity: 500, sold: 100, description: 'General admission' },
      { id: '3', name: 'Student', price: 1000, quantity: 200, sold: 50, description: 'Student discount' },
    ],
  },
  {
    id: '2',
    title: 'Tech Conference Nairobi',
    description: 'Leading technology conference featuring speakers from Silicon Savannah and global tech leaders.',
    date: '2024-04-20',
    location: 'KICC, Nairobi',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    status: 'PUBLISHED',
    organizerId: 'org-2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ticketTypes: [
      { id: '4', name: 'Early Bird', price: 15000, quantity: 200, sold: 30, description: 'Early bird pricing' },
      { id: '5', name: 'Standard', price: 20000, quantity: 300, sold: 50, description: 'Standard admission' },
    ],
  },
  {
    id: '3',
    title: 'Art & Culture Exhibition',
    description: 'Showcasing contemporary Kenyan art and cultural heritage through various mediums.',
    date: '2024-02-28',
    location: 'National Museum, Nairobi',
    category: 'Arts',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
    status: 'PUBLISHED',
    organizerId: 'org-3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ticketTypes: [
      { id: '6', name: 'Adult', price: 500, quantity: 300, sold: 150, description: 'Adult admission' },
      { id: '7', name: 'Child', price: 200, quantity: 100, sold: 80, description: 'Child admission (under 12)' },
    ],
  },
];

export const mockSponsors: Sponsor[] = [
  {
    id: '1',
    name: 'Safaricom PLC',
    logoUrl: 'https://via.placeholder.com/150x50/22c55e/ffffff?text=Safaricom',
    website: 'https://safaricom.co.ke',
    tier: 'GOLD',
    contactEmail: 'sponsorship@safaricom.co.ke',
  },
  {
    id: '2',
    name: 'Equity Bank',
    logoUrl: 'https://via.placeholder.com/150x50/16a34a/ffffff?text=Equity+Bank',
    website: 'https://equitybank.co.ke',
    tier: 'GOLD',
    contactEmail: 'marketing@equitybank.co.ke',
  },
  {
    id: '3',
    name: 'KCB Group',
    logoUrl: 'https://via.placeholder.com/150x50/15803d/ffffff?text=KCB+Group',
    website: 'https://kcbgroup.com',
    tier: 'SILVER',
    contactEmail: 'info@kcbgroup.com',
  },
];

export const mockAnalytics: Analytics = {
  totalEvents: 24,
  totalTicketsSold: 15420,
  totalRevenue: 2850000,
  eventsByCategory: {
    Music: 8,
    Technology: 6,
    Arts: 4,
    Sports: 3,
    Business: 3,
  },
  monthlyRevenue: [
    { month: 'Jan', revenue: 450000 },
    { month: 'Feb', revenue: 520000 },
    { month: 'Mar', revenue: 480000 },
    { month: 'Apr', revenue: 610000 },
    { month: 'May', revenue: 590000 },
    { month: 'Jun', revenue: 320000 },
  ],
};

export const mockUser: User = {
  id: '1',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '1234567890',
  role: 'USER',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};