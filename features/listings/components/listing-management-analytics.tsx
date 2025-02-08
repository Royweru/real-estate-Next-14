"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export const ListingManagementAnalytics = () => {
  const dummyData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 600 },
    { name: 'Mar', value: 500 },
    { name: 'Apr', value: 700 },
    { name: 'May', value: 300 },
    { name: 'Jun', value: 900 },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Listing Analytics</h1>
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Performance Overview</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg">Views</h3>
            <p className="text-lg font-bold">13,000</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg">Total Earnigs</h3>
            <p className="text-lg font-bold">Kes 2,504,332</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg">Inquiries</h3>
            <p className="text-lg font-bold">3,000</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Number of views</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={dummyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
