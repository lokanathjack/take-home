# Entities

This document describes the data model for the Mini Event Manager system.

## Core Entities

### User
- **id**: string (UUID, primary key)
- **name**: string (required)
- **email**: string (required, unique)
- **createdAt**: date (timestamp when user was created)
- **updatedAt**: date (timestamp when user was last updated)

### Event
- **id**: string (UUID, primary key)
- **title**: string (required)
- **description**: string (optional)
- **date**: date (required, ISO date string)
- **location**: string (optional)
- **createdBy**: string (foreign key, references User.id)
- **createdAt**: date (timestamp when event was created)
- **updatedAt**: date (timestamp when event was last updated)
- **isActive**: boolean (default: true, for soft deletes)

### Tag
- **id**: string (UUID, primary key)
- **name**: string (required, unique)
- **color**: string (optional, hex color code)
- **createdAt**: date (timestamp when tag was created)

### Attendee
- **id**: string (UUID, primary key)
- **name**: string (required)
- **email**: string (optional, unique if present)
- **phone**: string (optional)
- **createdAt**: date (timestamp when attendee was created)
- **updatedAt**: date (timestamp when attendee was last updated)

## Join Entities

### EventTag (Many-to-Many relationship between Event and Tag)
- **id**: string (UUID, primary key)
- **eventId**: string (foreign key, references Event.id)
- **tagId**: string (foreign key, references Tag.id)
- **createdAt**: date (timestamp when association was created)

### EventAttendee (Many-to-Many relationship between Event and Attendee with RSVP status)
- **id**: string (UUID, primary key)
- **eventId**: string (foreign key, references Event.id)
- **attendeeId**: string (foreign key, references Attendee.id)
- **rsvpStatus**: string (enum: 'yes', 'no', 'maybe', 'pending', default: 'pending')
- **rsvpDate**: date (timestamp when RSVP was set)
- **notes**: string (optional, attendee notes for the event)
- **createdAt**: date (timestamp when association was created)
- **updatedAt**: date (timestamp when RSVP was last updated)

## Constraints and Unique Identifiers

### Primary Keys
- All entities use UUID as primary key for scalability and security
- UUIDs are generated using v4 algorithm

### Unique Constraints
- **User.email**: Must be unique across all users
- **Tag.name**: Must be unique across all tags
- **Attendee.email**: Must be unique if present (null values are allowed)
- **EventTag(eventId, tagId)**: Composite unique constraint to prevent duplicate associations
- **EventAttendee(eventId, attendeeId)**: Composite unique constraint to prevent duplicate associations

### Foreign Key Constraints
- **Event.createdBy** → **User.id** (CASCADE on delete)
- **EventTag.eventId** → **Event.id** (CASCADE on delete)
- **EventTag.tagId** → **Tag.id** (CASCADE on delete)
- **EventAttendee.eventId** → **Event.id** (CASCADE on delete)
- **EventAttendee.attendeeId** → **Attendee.id** (CASCADE on delete)

## Indexes and Performance Considerations

### Primary Indexes
- All primary keys are automatically indexed

### Secondary Indexes
- **User.email**: For fast user lookup by email
- **Attendee.email**: For fast attendee lookup by email (partial index on non-null values)
- **Event.date**: For fast event filtering by date
- **Event.createdBy**: For fast event lookup by creator
- **EventAttendee.eventId**: For fast attendee lookup per event
- **EventAttendee.attendeeId**: For fast event lookup per attendee
- **EventAttendee.rsvpStatus**: For fast RSVP status filtering
- **EventTag.eventId**: For fast tag lookup per event
- **EventTag.tagId**: For fast event lookup per tag

### Composite Indexes
- **EventAttendee(eventId, rsvpStatus)**: For filtering attendees by event and RSVP status
- **Event(date, isActive)**: For filtering active events by date range

## Data Model Assumptions

### Business Rules
1. **Users vs Attendees**: Users are system users who can create and manage events. Attendees are external people who can be invited to events but don't have system accounts.

2. **Email Uniqueness**: 
   - User emails must be unique
   - Attendee emails are optional but must be unique if present
   - This allows for attendees without email addresses

3. **RSVP Status**: 
   - Default status is 'pending' when attendee is first added
   - Valid statuses: 'yes', 'no', 'maybe', 'pending'
   - RSVP status is tracked per event-attendee combination

4. **Event Management**:
   - Only users can create events
   - Events can be soft-deleted using the isActive flag
   - Events can have multiple tags for categorization

5. **Tag System**:
   - Tags are reusable across multiple events
   - Tags have unique names for consistency
   - Tags can have optional colors for UI display

### Scalability Considerations
1. **UUIDs**: Using UUIDs instead of auto-incrementing IDs for better distribution and security
2. **Soft Deletes**: Using isActive flag instead of hard deletes to preserve data integrity
3. **Timestamps**: All entities include created/updated timestamps for audit trails
4. **Indexing Strategy**: Comprehensive indexing for common query patterns
5. **Normalization**: Proper normalization to avoid data redundancy

### Future Extensions
1. **Event Recurrence**: Could add recurrence patterns for recurring events
2. **Attendee Groups**: Could add support for bulk attendee management
3. **Event Templates**: Could add event templates for quick event creation
4. **Notifications**: Could add notification preferences and history
5. **File Attachments**: Could add support for event attachments (agendas, materials, etc.) 