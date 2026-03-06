import React, { useState, useEffect } from 'react';
import * as adminService from '../../services/adminService';
import { Analytics as AnalyticsType } from '../../utilities/types';

const Analytics: React.FC = () => {
  const [stats, setStats] = useState<AnalyticsType | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await adminService.getAnalytics();
        setStats(res);
      } catch (err) {
        console.error('Failed to load analytics', err);
      }
    };
    load();
  }, []);

  if (!stats) {
    return <div className="min-h-screen flex items-center justify-center">Loading analytics...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Analytics Dashboard</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Events</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalEvents}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Tickets Sold</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalTicketsSold.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">KSH {stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Avg Ticket Price</h3>
          <p className="text-3xl font-bold text-yellow-600">KSH {Math.round(stats.totalRevenue / Math.max(stats.totalTicketsSold, 1)).toLocaleString()}</p>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Revenue</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {stats.monthlyRevenue.map((data) => (
              <div key={data.month} className="flex-1 flex flex-col items-center">
                <div
                  className="bg-green-500 w-full rounded-t"
                  style={{ height: `${Math.min(200, (data.revenue / (stats.totalRevenue || 1)) * 200)}px` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                <span className="text-xs text-gray-700">KSH {(data.revenue / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Tickets Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Tickets Sold</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {stats.monthlyRevenue.map((data) => (
              <div key={data.month} className="flex-1 flex flex-col items-center">
                <div
                  className="bg-blue-500 w-full rounded-t"
                  style={{ height: `${Math.min(200, (data.revenue / (stats.totalRevenue || 1)) * 200)}px` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                <span className="text-xs text-gray-700">{Math.round((data.revenue / (stats.totalRevenue || 1)) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Events Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Top Performing Events</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets Sold</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.topEvents?.map((event) => (
                <tr key={event.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {event.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.tickets}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    KSH {event.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(event.tickets / 450) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Conversion Rate</h3>
          <p className="text-2xl font-bold text-purple-600">3.2%</p>
          <p className="text-sm text-gray-500">Visitors to ticket purchases</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Average Event Rating</h3>
          <p className="text-2xl font-bold text-orange-600">4.7/5</p>
          <p className="text-sm text-gray-500">Based on user feedback</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Repeat Customers</h3>
          <p className="text-2xl font-bold text-indigo-600">28%</p>
          <p className="text-sm text-gray-500">Customers who bought multiple events</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;