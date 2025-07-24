import {
    users,
    events,
    attendees,
    tags,
    eventAttendees,
    findUserById,
    findEventById,
    findAttendeeById,
    findTagById,
    findEventAttendeesByEventId,
    addEvent,
    addAttendee,
    addEventAttendee,
    removeEventAttendee,
    updateEventAttendeeRSVP
} from './data';

export const resolvers = {
    Query: {
        events: () => events,
        event: (_: any, { id }: { id: string }) => findEventById(id),
        tags: () => tags,
        users: () => users
    },

    Event: {
        createdBy: (parent: any) => findUserById(parent.createdBy),
        tags: (parent: any) => parent.tagIds.map((tagId: string) => findTagById(tagId)).filter(Boolean),
        attendees: (parent: any) => {
            const eventAttendeeList = findEventAttendeesByEventId(parent.id);
            return eventAttendeeList.map((ea) => ({
                id: ea.id,
                attendee: findAttendeeById(ea.attendeeId),
                rsvpStatus: ea.rsvpStatus
            }));
        },
        attendeeCount: (parent: any) => {
            return findEventAttendeesByEventId(parent.id).length;
        }
    },

    Mutation: {
        createEvent: (_: any, { input }: { input: any }) => {
            const { title, date, createdBy, tagIds = [] } = input;

            // Validate that the user exists
            if (!findUserById(createdBy)) {
                throw new Error('User not found');
            }

            // Validate that all tags exist
            for (const tagId of tagIds) {
                if (!findTagById(tagId)) {
                    throw new Error(`Tag with id ${tagId} not found`);
                }
            }

            const newEvent = addEvent({
                title,
                date,
                createdBy,
                tagIds
            });

            return newEvent;
        },

        addAttendeeToEvent: (_: any, { input }: { input: any }) => {
            const { eventId, name, email } = input;

            // Validate that the event exists
            const event = findEventById(eventId);
            if (!event) {
                throw new Error('Event not found');
            }

            // Check if attendee with same email already exists (if email provided)
            let existingAttendee: any = null;
            if (email) {
                existingAttendee = attendees.find(a => a.email === email);
            }

            let attendeeId: string;
            if (existingAttendee) {
                attendeeId = existingAttendee.id;
            } else {
                // Create new attendee
                const newAttendee = addAttendee({ name, email });
                attendeeId = newAttendee.id;
            }

            // Check if attendee is already added to this event
            const existingEventAttendee = eventAttendees.find(
                ea => ea.eventId === eventId && ea.attendeeId === attendeeId
            );

            if (existingEventAttendee) {
                throw new Error('Attendee is already added to this event');
            }

            // Add attendee to event
            const newEventAttendee = addEventAttendee({
                eventId,
                attendeeId,
                rsvpStatus: 'yes' // Default RSVP status
            });

            return {
                id: newEventAttendee.id,
                attendee: findAttendeeById(attendeeId),
                rsvpStatus: newEventAttendee.rsvpStatus
            };
        },

        removeAttendeeFromEvent: (_: any, { eventId, attendeeId }: { eventId: string; attendeeId: string }) => {
            // Validate that the event exists
            if (!findEventById(eventId)) {
                throw new Error('Event not found');
            }

            // Validate that the attendee exists
            if (!findAttendeeById(attendeeId)) {
                throw new Error('Attendee not found');
            }

            const success = removeEventAttendee(eventId, attendeeId);
            if (!success) {
                throw new Error('Attendee is not associated with this event');
            }

            return true;
        },

        setRSVPStatus: (_: any, { input }: { input: any }) => {
            const { eventId, attendeeId, rsvpStatus } = input;

            // Validate RSVP status
            if (!['yes', 'no', 'maybe'].includes(rsvpStatus)) {
                throw new Error('Invalid RSVP status. Must be "yes", "no", or "maybe"');
            }

            // Validate that the event exists
            if (!findEventById(eventId)) {
                throw new Error('Event not found');
            }

            // Validate that the attendee exists
            if (!findAttendeeById(attendeeId)) {
                throw new Error('Attendee not found');
            }

            const updatedEventAttendee = updateEventAttendeeRSVP(eventId, attendeeId, rsvpStatus);
            if (!updatedEventAttendee) {
                throw new Error('Attendee is not associated with this event');
            }

            return {
                id: updatedEventAttendee.id,
                attendee: findAttendeeById(attendeeId),
                rsvpStatus: updatedEventAttendee.rsvpStatus
            };
        }
    }
}; 