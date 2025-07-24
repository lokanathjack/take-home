import { gql } from '@apollo/client';

// Queries
export const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
      date
      attendeeCount
      createdBy {
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      id
      title
      date
      createdBy {
        id
        name
        email
      }
      tags {
        id
        name
      }
      attendees {
        id
        attendee {
          id
          name
          email
        }
        rsvpStatus
      }
      attendeeCount
    }
  }
`;

export const GET_TAGS = gql`
  query GetTags {
    tags {
      id
      name
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

// Mutations
export const CREATE_EVENT = gql`
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
      title
      date
      createdBy {
        name
      }
      tags {
        name
      }
    }
  }
`;

export const ADD_ATTENDEE_TO_EVENT = gql`
  mutation AddAttendeeToEvent($input: AddAttendeeInput!) {
    addAttendeeToEvent(input: $input) {
      id
      attendee {
        id
        name
        email
      }
      rsvpStatus
    }
  }
`;

export const REMOVE_ATTENDEE_FROM_EVENT = gql`
  mutation RemoveAttendeeFromEvent($eventId: ID!, $attendeeId: ID!) {
    removeAttendeeFromEvent(eventId: $eventId, attendeeId: $attendeeId)
  }
`;

export const SET_RSVP_STATUS = gql`
  mutation SetRSVPStatus($input: SetRSVPInput!) {
    setRSVPStatus(input: $input) {
      id
      attendee {
        id
        name
        email
      }
      rsvpStatus
    }
  }
`; 