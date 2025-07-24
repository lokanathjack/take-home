import { Event } from '@/lib/types';
import HomeClient from './HomeClient';

async function fetchEvents(): Promise<Event[]> {
  // Use fetch to call the GraphQL endpoint on the server
  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: `{
      events {
        id
        title
        date
        attendeeCount
        createdBy { id name email }
        tags { id name }
        attendees { id rsvpStatus attendee { id name email } }
      }
    }` })
  });
  const { data } = await res.json();
  return data?.events || [];
}

export default async function HomePage() {
  const events = await fetchEvents();
  return <HomeClient events={events} />;
}
