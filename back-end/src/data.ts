import { v4 as uuidv4 } from 'uuid';
import { User, Event, Attendee, Tag, EventAttendee } from './types';

// In-memory data storage
export const users: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    { id: '3', name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    { id: '4', name: 'Bob Williams', email: 'bob.williams@example.com' },
    { id: '5', name: 'Carol Brown', email: 'carol.brown@example.com' },
    { id: '6', name: 'David Miller', email: 'david.miller@example.com' },
    { id: '7', name: 'Eve Davis', email: 'eve.davis@example.com' },
    { id: '8', name: 'Frank Wilson', email: 'frank.wilson@example.com' },
    { id: '9', name: 'Grace Lee', email: 'grace.lee@example.com' },
    { id: '10', name: 'Henry Clark', email: 'henry.clark@example.com' },
    { id: '11', name: 'Ivy Lewis', email: 'ivy.lewis@example.com' },
    { id: '12', name: 'Jack Walker', email: 'jack.walker@example.com' },
    { id: '13', name: 'Kathy Hall', email: 'kathy.hall@example.com' },
    { id: '14', name: 'Leo Allen', email: 'leo.allen@example.com' },
    { id: '15', name: 'Mona Young', email: 'mona.young@example.com' },
    { id: '16', name: 'Nina King', email: 'nina.king@example.com' },
    { id: '17', name: 'Oscar Wright', email: 'oscar.wright@example.com' },
    { id: '18', name: 'Paul Scott', email: 'paul.scott@example.com' },
    { id: '19', name: 'Quinn Green', email: 'quinn.green@example.com' },
    { id: '20', name: 'Rita Adams', email: 'rita.adams@example.com' },
    { id: '21', name: 'Sam Baker', email: 'sam.baker@example.com' },
    { id: '22', name: 'Tina Nelson', email: 'tina.nelson@example.com' },
    { id: '23', name: 'Uma Carter', email: 'uma.carter@example.com' },
    { id: '24', name: 'Vince Perez', email: 'vince.perez@example.com' },
    { id: '25', name: 'Wendy Roberts', email: 'wendy.roberts@example.com' },
    { id: '26', name: 'Xander Evans', email: 'xander.evans@example.com' },
    { id: '27', name: 'Yara Turner', email: 'yara.turner@example.com' },
    { id: '28', name: 'Zane Parker', email: 'zane.parker@example.com' },
    { id: '29', name: 'Amy Foster', email: 'amy.foster@example.com' },
    { id: '30', name: 'Ben Morgan', email: 'ben.morgan@example.com' },
    { id: '31', name: 'Cathy Reed', email: 'cathy.reed@example.com' },
    { id: '32', name: 'Derek Cox', email: 'derek.cox@example.com' }
];

export const tags: Tag[] = [
    { id: '1', name: 'Internal' },
    { id: '2', name: 'Public' },
    { id: '3', name: 'Team Offsite' },
    { id: '4', name: 'Conference' }
];

export const attendees: Attendee[] = [
    { id: '1', name: 'Olivia Stone', email: 'olivia.stone@example.com' },
    { id: '2', name: 'Liam Brooks', email: 'liam.brooks@example.com' },
    { id: '3', name: 'Sophia Reed', email: 'sophia.reed@example.com' },
    { id: '4', name: 'Mason Price', email: 'mason.price@example.com' },
    { id: '5', name: 'Isabella Bell', email: 'isabella.bell@example.com' },
    { id: '6', name: 'Logan Ward', email: 'logan.ward@example.com' },
    { id: '7', name: 'Mia Cox', email: 'mia.cox@example.com' },
    { id: '8', name: 'Lucas Gray', email: 'lucas.gray@example.com' },
    { id: '9', name: 'Charlotte Diaz', email: 'charlotte.diaz@example.com' },
    { id: '10', name: 'Elijah Ross', email: 'elijah.ross@example.com' },
    { id: '11', name: 'Ava Rivera', email: 'ava.rivera@example.com' },
    { id: '12', name: 'James Cooper', email: 'james.cooper@example.com' },
    { id: '13', name: 'Emily Bailey', email: 'emily.bailey@example.com' },
    { id: '14', name: 'Benjamin Murphy', email: 'benjamin.murphy@example.com' },
    { id: '15', name: 'Harper Kelly', email: 'harper.kelly@example.com' },
    { id: '16', name: 'Ethan Howard', email: 'ethan.howard@example.com' },
    { id: '17', name: 'Abigail Ward', email: 'abigail.ward@example.com' },
    { id: '18', name: 'Alexander Cox', email: 'alexander.cox@example.com' },
    { id: '19', name: 'Ella Foster', email: 'ella.foster@example.com' },
    { id: '20', name: 'Daniel Morgan', email: 'daniel.morgan@example.com' },
    { id: '21', name: 'Scarlett Reed', email: 'scarlett.reed@example.com' },
    { id: '22', name: 'Matthew Evans', email: 'matthew.evans@example.com' },
    { id: '23', name: 'Victoria Turner', email: 'victoria.turner@example.com' },
    { id: '24', name: 'Jackson Parker', email: 'jackson.parker@example.com' },
    { id: '25', name: 'Grace Adams', email: 'grace.adams@example.com' },
    { id: '26', name: 'Sebastian Nelson', email: 'sebastian.nelson@example.com' },
    { id: '27', name: 'Chloe Carter', email: 'chloe.carter@example.com' },
    { id: '28', name: 'Aiden Perez', email: 'aiden.perez@example.com' },
    { id: '29', name: 'Penelope Baker', email: 'penelope.baker@example.com' },
    { id: '30', name: 'Jackie Lee', email: 'jackie.lee@example.com' },
    { id: '31', name: 'Noah Brooks', email: 'noah.brooks@example.com' },
    { id: '32', name: 'Zoe Hall', email: 'zoe.hall@example.com' }
];

export const events: Event[] = [
    { id: '1', title: 'Team Meeting', date: '2024-08-01T10:00:00Z', createdBy: '3', tagIds: ['1'] },
    { id: '2', title: 'Product Launch', date: '2024-08-05T14:00:00Z', createdBy: '4', tagIds: ['2', '4'] },
    { id: '3', title: 'Annual Conference', date: '2024-09-10T09:00:00Z', createdBy: '5', tagIds: ['4'] },
    { id: '4', title: 'Offsite Retreat', date: '2024-09-20T12:00:00Z', createdBy: '6', tagIds: ['3'] },
    { id: '5', title: 'Hackathon', date: '2024-10-15T08:00:00Z', createdBy: '7', tagIds: ['2'] },
    { id: '6', title: 'Quarterly Review', date: '2024-10-25T15:00:00Z', createdBy: '8', tagIds: ['1', '2'] },
    { id: '7', title: 'Board Meeting', date: '2024-11-01T11:00:00Z', createdBy: '9', tagIds: ['1'] },
    { id: '8', title: 'Team Offsite', date: '2024-11-10T13:00:00Z', createdBy: '10', tagIds: ['3'] },
    { id: '9', title: 'Public Webinar', date: '2024-11-20T17:00:00Z', createdBy: '11', tagIds: ['2'] },
    { id: '10', title: 'Internal Training', date: '2024-12-01T09:30:00Z', createdBy: '12', tagIds: ['1'] }
];

export const eventAttendees: EventAttendee[] = [
    { id: '1', eventId: '1', attendeeId: '1', rsvpStatus: 'yes' },
    { id: '2', eventId: '1', attendeeId: '2', rsvpStatus: 'maybe' },
    { id: '3', eventId: '1', attendeeId: '3', rsvpStatus: 'no' },
    { id: '4', eventId: '2', attendeeId: '4', rsvpStatus: 'yes' },
    { id: '5', eventId: '2', attendeeId: '5', rsvpStatus: 'yes' },
    { id: '6', eventId: '2', attendeeId: '6', rsvpStatus: 'maybe' },
    { id: '7', eventId: '3', attendeeId: '7', rsvpStatus: 'yes' },
    { id: '8', eventId: '3', attendeeId: '8', rsvpStatus: 'no' },
    { id: '9', eventId: '3', attendeeId: '9', rsvpStatus: 'maybe' },
    { id: '10', eventId: '4', attendeeId: '10', rsvpStatus: 'yes' },
    { id: '11', eventId: '4', attendeeId: '11', rsvpStatus: 'yes' },
    { id: '12', eventId: '4', attendeeId: '12', rsvpStatus: 'no' },
    { id: '13', eventId: '5', attendeeId: '13', rsvpStatus: 'maybe' },
    { id: '14', eventId: '5', attendeeId: '14', rsvpStatus: 'yes' },
    { id: '15', eventId: '5', attendeeId: '15', rsvpStatus: 'no' },
    { id: '16', eventId: '6', attendeeId: '16', rsvpStatus: 'yes' },
    { id: '17', eventId: '6', attendeeId: '17', rsvpStatus: 'maybe' },
    { id: '18', eventId: '6', attendeeId: '18', rsvpStatus: 'no' },
    { id: '19', eventId: '7', attendeeId: '19', rsvpStatus: 'yes' },
    { id: '20', eventId: '7', attendeeId: '20', rsvpStatus: 'maybe' },
    { id: '21', eventId: '7', attendeeId: '21', rsvpStatus: 'no' },
    { id: '22', eventId: '8', attendeeId: '22', rsvpStatus: 'yes' },
    { id: '23', eventId: '8', attendeeId: '23', rsvpStatus: 'maybe' },
    { id: '24', eventId: '8', attendeeId: '24', rsvpStatus: 'no' },
    { id: '25', eventId: '9', attendeeId: '25', rsvpStatus: 'yes' },
    { id: '26', eventId: '9', attendeeId: '26', rsvpStatus: 'maybe' },
    { id: '27', eventId: '9', attendeeId: '27', rsvpStatus: 'no' },
    { id: '28', eventId: '10', attendeeId: '28', rsvpStatus: 'yes' },
    { id: '29', eventId: '10', attendeeId: '29', rsvpStatus: 'maybe' },
    { id: '30', eventId: '10', attendeeId: '30', rsvpStatus: 'no' },
    { id: '31', eventId: '10', attendeeId: '31', rsvpStatus: 'yes' },
    { id: '32', eventId: '10', attendeeId: '32', rsvpStatus: 'maybe' }
];

// Helper functions for data manipulation
export const findUserById = (id: string): User | undefined => {
    return users.find(user => user.id === id);
};

export const findEventById = (id: string): Event | undefined => {
    return events.find(event => event.id === id);
};

export const findAttendeeById = (id: string): Attendee | undefined => {
    return attendees.find(attendee => attendee.id === id);
};

export const findTagById = (id: string): Tag | undefined => {
    return tags.find(tag => tag.id === id);
};

export const findEventAttendeesByEventId = (eventId: string): EventAttendee[] => {
    return eventAttendees.filter(ea => ea.eventId === eventId);
};

export const findEventAttendee = (eventId: string, attendeeId: string): EventAttendee | undefined => {
    return eventAttendees.find(ea => ea.eventId === eventId && ea.attendeeId === attendeeId);
};

export const addEvent = (event: Omit<Event, 'id'>): Event => {
    const newEvent: Event = {
        ...event,
        id: uuidv4()
    };
    events.push(newEvent);
    return newEvent;
};

export const addAttendee = (attendee: Omit<Attendee, 'id'>): Attendee => {
    const newAttendee: Attendee = {
        ...attendee,
        id: uuidv4()
    };
    attendees.push(newAttendee);
    return newAttendee;
};

export const addEventAttendee = (eventAttendee: Omit<EventAttendee, 'id'>): EventAttendee => {
    const newEventAttendee: EventAttendee = {
        ...eventAttendee,
        id: uuidv4()
    };
    eventAttendees.push(newEventAttendee);
    return newEventAttendee;
};

export const removeEventAttendee = (eventId: string, attendeeId: string): boolean => {
    const index = eventAttendees.findIndex(ea => ea.eventId === eventId && ea.attendeeId === attendeeId);
    if (index !== -1) {
        eventAttendees.splice(index, 1);
        return true;
    }
    return false;
};

export const updateEventAttendeeRSVP = (eventId: string, attendeeId: string, rsvpStatus: 'yes' | 'no' | 'maybe'): EventAttendee | null => {
    const eventAttendee = findEventAttendee(eventId, attendeeId);
    if (eventAttendee) {
        eventAttendee.rsvpStatus = rsvpStatus;
        return eventAttendee;
    }
    return null;
}; 