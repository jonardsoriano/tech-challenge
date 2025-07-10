"use client";

import React, { useEffect, useState } from 'react';

interface Booking {
  id: number;
  name: string;
  email: string;
  licencePlate: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export default function BookingsList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h2>All Bookings</h2>
      {loading ? (
        <div>Loading...</div>
      ) : bookings.length === 0 ? (
        <div>No bookings found.</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Licence Plate</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.name}</td>
                <td>{b.email}</td>
                <td>{b.licencePlate}</td>
                <td>{b.startDate.slice(0, 10)}</td>
                <td>{b.endDate.slice(0, 10)}</td>
                <td>{b.createdAt.slice(0, 19).replace('T', ' ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
