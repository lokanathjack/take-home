# Setup Instructions

This document provides step-by-step instructions to set up and run the Mini Event Manager application.

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

## Project Structure

```
take-home/
├── backend/          # GraphQL API server
├── frontend/         # Next.js frontend application
├── ENTITIES.md       # Data model documentation
├── SETUP.md          # This file
└── NOTES.md          # Assumptions and known issues
```

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

The GraphQL server will start on `http://localhost:4000`

### 4. Verify Backend is Running
- Open your browser and navigate to `http://localhost:4000`
- You should see the GraphQL Playground interface
- You can test queries and mutations directly in the playground

### Available Backend Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run watch` - Start development server with file watching

## Frontend Setup

### 1. Open a New Terminal and Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

The Next.js application will start on `http://localhost:3000`

### 4. Verify Frontend is Running
- Open your browser and navigate to `http://localhost:3000`
- You should see the Events page with sample data

### Available Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Running the Complete Application

### 1. Start Both Servers
You need to run both the backend and frontend servers simultaneously:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### 2. Access the Application
- Frontend: `http://localhost:3000`
- Backend GraphQL Playground: `http://localhost:4000`

## Features to Test

### 1. View Events
- Navigate to `http://localhost:3000`
- You should see a list of sample events with titles, dates, and attendee counts

### 2. Create New Event
- Click "Create Event" button
- Fill in the form with:
  - Title (required)
  - Date & Time (required, must be in the future)
  - Created By (select a user)
  - Tags (optional)
- Submit the form
- You should be redirected back to the events list

### 3. View Event Details
- Click "View Details" on any event
- You should see:
  - Event information
  - List of attendees
  - RSVP status for each attendee
  - Quick stats sidebar

### 4. Add Attendee
- On the event details page, click "Add Attendee"
- Fill in the form with:
  - Name (required)
  - Email (optional)
- Submit the form
- The attendee should appear in the list

### 5. Manage RSVP Status
- On the event details page, use the dropdown next to each attendee
- Change the RSVP status (Yes/Maybe/No/Pending)
- The status should update immediately

### 6. Remove Attendee
- On the event details page, click the trash icon next to an attendee
- Confirm the removal
- The attendee should be removed from the list

## GraphQL API Testing

You can test the GraphQL API directly using the playground at `http://localhost:4000`:

### Sample Queries

**Get All Events:**
```graphql
query {
  events {
    id
    title
    date
    attendeeCount
    createdBy {
      name
    }
    tags {
      name
    }
  }
}
```

**Get Single Event:**
```graphql
query {
  event(id: "1") {
    id
    title
    date
    attendees {
      attendee {
        name
        email
      }
      rsvpStatus
    }
  }
}
```

### Sample Mutations

**Create Event:**
```graphql
mutation {
  createEvent(input: {
    title: "Test Event"
    date: "2024-12-25T10:00:00Z"
    createdBy: "1"
    tagIds: ["1", "2"]
  }) {
    id
    title
  }
}
```

**Add Attendee:**
```graphql
mutation {
  addAttendeeToEvent(input: {
    eventId: "1"
    name: "John Doe"
    email: "john@example.com"
  }) {
    id
    attendee {
      name
      email
    }
    rsvpStatus
  }
}
```

## Production Deployment

### Backend
1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Set environment variables as needed (PORT, etc.)

### Frontend
1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Update the GraphQL endpoint in `frontend/src/lib/apollo-client.ts` if needed

## Data Persistence

**Note**: This application uses in-memory storage for demonstration purposes. All data will be reset when the backend server restarts. In a production environment, you would integrate with a database like PostgreSQL, MongoDB, or similar. 