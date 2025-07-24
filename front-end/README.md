# Event Manager Backend

GraphQL API server for the Mini Event Manager application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:4000`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run watch` - Start development server with file watching

## GraphQL Playground

Once the server is running, you can access the GraphQL Playground at:
`http://localhost:4000`

## API Endpoints

- **GraphQL**: `http://localhost:4000/graphql`
- **Health Check**: `http://localhost:4000/health`

## Features

- **Events**: Create, read events with attendees and tags
- **Attendees**: Add/remove attendees from events
- **RSVP Management**: Track attendee RSVP status
- **Tags**: Categorize events with tags
- **Users**: Manage event creators

## Data Storage

Currently uses in-memory storage with mock data. Data will be reset when the server restarts. 