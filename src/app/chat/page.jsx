'use client'

import { useEffect, useState } from 'react';
import { fetchChatConnections } from '@/action/index';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { fetchUser } from '../redux/slice';

export default function ChatConnectionsPage() {
  const dispatch = useDispatch();
  const [chatConnections, setChatConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = useSelector((state) => state?.user?.user?.id);

  useEffect(() => {
    if (!currentUserId) {
      dispatch(fetchUser());
    }
  }, [currentUserId, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUserId) {
        const d = await fetchChatConnections(currentUserId);
        if (d.success) {
          setChatConnections(d.data);
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [currentUserId]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Chat Connections</h1>
      {chatConnections?.length === 0 ? (
        <p className="text-center text-gray-600">No chat connections found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chatConnections?.map((connection) => (
            <div
              key={connection.listing_id}
              className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <Link  href={`/chat/${connection.listing_id}`} className="text-xl font-semibold mb-2 text-gray-800">
                Listing ID: {connection.listing_id}
              </Link>
              {/* <ul className="space-y-2">
                {connection?.sender_ids?.map((sender_id) => (
                  <li key={sender_id}>
                    <Link href={`/chat/${connection.listing_id}`}>
                      <Link  href={`/chat/${connection.listing_id}`} className="text-blue-500 hover:underline">
                        {sender_id}
                      </Link>
                    </Link>
                  </li>
                ))}
              </ul> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
