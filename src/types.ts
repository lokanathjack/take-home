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

export interface Event {
    id: string;
    title: string;
    date: string; // ISO date string
    createdBy: string; // User ID
    tagIds: string[]; // Tag IDs
}

export interface EventAttendee {
    id: string;
    eventId: string;
    attendeeId: string;
    rsvpStatus: 'yes' | 'no' | 'maybe';
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
    rsvpStatus: 'yes' | 'no' | 'maybe';
} 