import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Tag {
    id: ID!
    name: String!
  }

  type Attendee {
    id: ID!
    name: String!
    email: String
  }

  type EventAttendee {
    id: ID!
    attendee: Attendee!
    rsvpStatus: String!
  }

  type Event {
    id: ID!
    title: String!
    date: String!
    createdBy: User!
    tags: [Tag!]!
    attendees: [EventAttendee!]!
    attendeeCount: Int!
  }

  input CreateEventInput {
    title: String!
    date: String!
    createdBy: ID!
    tagIds: [ID!]
  }

  input AddAttendeeInput {
    eventId: ID!
    name: String!
    email: String
  }

  input SetRSVPInput {
    eventId: ID!
    attendeeId: ID!
    rsvpStatus: String!
  }

  type Query {
    events: [Event!]!
    event(id: ID!): Event
    tags: [Tag!]!
    users: [User!]!
  }

  type Mutation {
    createEvent(input: CreateEventInput!): Event!
    addAttendeeToEvent(input: AddAttendeeInput!): EventAttendee!
    removeAttendeeFromEvent(eventId: ID!, attendeeId: ID!): Boolean!
    setRSVPStatus(input: SetRSVPInput!): EventAttendee!
  }
`; 