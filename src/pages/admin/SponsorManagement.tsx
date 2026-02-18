import React, { useState } from 'react';

interface Sponsor {
  id: number;
  name: string;
  logo: string;
  website: string;
  events: number[];
  contactEmail: string;
  description: string;
}

const mockSponsors: Sponsor[] = [
  {
    id: 1,
    name: 'Safaricom PLC',
    logo: '/api/placeholder/100/50',
    website: 'https://safaricom.co.ke',
    events: [1, 2],
    contactEmail: 'sponsorship@safaricom.co.ke',
    description: 'Leading telecommunications company in Kenya'
  },
  {
    id: 2,
    name: 'Equity Bank',
    logo: '/api/placeholder/100/50',
    website: 'https://equitybank.co.ke',
    events: [1],
    contactEmail: 'marketing@equitybank.co.ke',
    description: 'Pan-African financial services provider'
  },
  {
    id: 3,
    name: 'Nairobi Business Park',
    logo: '/api/placeholder/100/50',
    website: 'https://nairobibusinesspark.com',
    events: [2],
    contactEmail: 'events@nbp.co.ke',
    description: 'Premium business and lifestyle destination'
  }
];

const mockEvents = [
  { id: 1, title: 'Nairobi Music Festival' },
  { id: 2, title: 'Tech Conference Nairobi' }
];

const SponsorManagement: React.FC = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>(mockSponsors);
  const [showForm, setShowForm] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [formData, setFormData] = useState<Partial<Sponsor>>({
    name: '',
    logo: '',
    website: '',
    events: [],
    contactEmail: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEventToggle = (eventId: number) => {
    setFormData(prev => ({
      ...prev,
      events: prev.events?.includes(eventId)
        ? prev.events.filter(id => id !== eventId)
        : [...(prev.events || []), eventId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSponsor) {
      setSponsors(prev => prev.map(s => s.id === editingSponsor.id ? { ...formData, id: s.id } as Sponsor : s));
    } else {
      const newSponsor: Sponsor = {
        ...formData,
        id: Date.now(),
        events: formData.events || []
      } as Sponsor;
      setSponsors(prev => [...prev, newSponsor]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      logo: '',
      website: '',
      events: [],
      contactEmail: '',
      description: ''
    });
    setEditingSponsor(null);
    setShowForm(false);
  };

  const editSponsor = (sponsor: Sponsor) => {
    setFormData(sponsor);
    setEditingSponsor(sponsor);
    setShowForm(true);
  };

  const deleteSponsor = (id: number) => {
    setSponsors(prev => prev.filter(s => s.id !== id));
  };

  const getEventTitles = (eventIds: number[]) => {
    return eventIds.map(id => mockEvents.find(e => e.id === id)?.title).filter(Boolean).join(', ');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Sponsor Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Add New Sponsor
        </button>
      </div>

      {/* Sponsor Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6">{editingSponsor ? 'Edit Sponsor' : 'Add New Sponsor'}</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                <input
                  type="url"
                  name="logo"
                  value={formData.logo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Associated Events */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Associated Events</label>
              <div className="space-y-2">
                {mockEvents.map(event => (
                  <label key={event.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.events?.includes(event.id) || false}
                      onChange={() => handleEventToggle(event.id)}
                      className="mr-2"
                    />
                    {event.title}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
              >
                {editingSponsor ? 'Update Sponsor' : 'Add Sponsor'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sponsors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsors.map(sponsor => (
          <div key={sponsor.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="w-16 h-8 object-contain mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{sponsor.name}</h3>
                <a
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-600 hover:text-green-800"
                >
                  Visit Website
                </a>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">{sponsor.description}</p>
            <div className="mb-4">
              <p className="text-sm text-gray-500">Events: {getEventTitles(sponsor.events)}</p>
              <p className="text-sm text-gray-500">Contact: {sponsor.contactEmail}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => editSponsor(sponsor)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => deleteSponsor(sponsor.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorManagement;