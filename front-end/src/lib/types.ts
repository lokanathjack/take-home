// Shared types for the frontend, adapted from backend/src/types.ts

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Tag {
    id: string;
    name: string;
}

export interface Attendee {
    id: string;
    name: string;
    email?: string;
}

export interface EventAttendee {
    id: string;
    attendee: Attendee;
    rsvpStatus: 'yes' | 'no' | 'maybe' | 'pending';
}

export interface Event {
    id: string;
    title: string;
    date: string; // ISO date string
    createdBy: User;
    tags: Tag[];
    attendees: EventAttendee[];
    attendeeCount: number;
}

export interface CreateEventInput {
    title: string;
    date: string;
    createdBy: string;
    tagIds?: string[];
}

export interface AddAttendeeInput {
    eventId: string;
    name: string;
    email?: string;
}

export interface SetRSVPInput {
    eventId: string;
    attendeeId: string;
    rsvpStatus: 'yes' | 'no' | 'maybe' | 'pending';
} 