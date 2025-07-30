I'll review the entire repository to understand the architecture and approach, then prepare you for interview discussion. Let me start by exploring the codebase structure and key components.

Read file: README.md
Read file: ENTITIES.md
Read file: NOTES.md
Read file: SETUP.md
Now let me examine the backend implementation to understand the GraphQL schema and resolvers:

Read file: backend/src/schema.ts
Read file: backend/src/resolvers.ts
Read file: backend/src/data.ts
Now let me examine the frontend implementation:

Read file: frontend/src/app/page.tsx
Read file: frontend/src/app/HomeClient.tsx
Read file: frontend/src/app/events/[id]/page.tsx
Read file: frontend/src/lib/graphql.ts
Read file: frontend/src/lib/types.ts
Now let me check the package.json files to understand the dependencies and tech stack:

Read file: backend/package.json
Read file: frontend/package.json
Based on my comprehensive review of the repository, I'll now prepare you for interview discussion on the approach, pros and cons, and real-time solutioning questions.

# Interview Preparation: Mini Event Manager Code Review

## **Architecture Overview**

This is a **full-stack TypeScript application** with:
- **Backend**: Apollo Server GraphQL API with in-memory storage
- **Frontend**: Next.js 15 with App Router, Apollo Client, and TailwindCSS
- **Data Layer**: In-memory arrays with UUID-based relationships
- **State Management**: Apollo Client for server state, React hooks for local state

## **Key Design Decisions & Approach**

### **1. GraphQL-First Architecture**
**Approach**: Used GraphQL as the primary API layer with a well-defined schema.

**Pros:**
- Type-safe API with automatic code generation potential
- Flexible queries (fetch only needed data)
- Single endpoint reduces API complexity
- Built-in introspection and playground for testing
- Strong typing between frontend and backend

**Cons:**
- Learning curve for team members unfamiliar with GraphQL
- Potential over-fetching if queries aren't optimized
- No built-in caching like REST (requires additional setup)
- Schema versioning complexity

### **2. In-Memory Data Storage**
**Approach**: Used arrays with helper functions instead of a database.

**Pros:**
- Rapid prototyping and development
- No database setup required
- Simple to understand and debug
- Easy to reset data for testing

**Cons:**
- Data loss on server restart
- No persistence or scalability
- No concurrent access handling
- Memory limitations for large datasets

### **3. Next.js App Router with Server Components**
**Approach**: Mixed server-side rendering with client-side interactivity.

**Pros:**
- Better SEO with server-side rendering
- Improved performance with streaming
- Reduced client-side JavaScript
- Built-in routing and optimization

**Cons:**
- More complex mental model
- Potential hydration issues
- Limited client-side state management options

## **Code Quality Assessment**

### **Strengths:**
1. **TypeScript Throughout**: Strong typing across frontend and backend
2. **Clean Separation**: Clear separation between data, resolvers, and schema
3. **Comprehensive Error Handling**: Proper error states and user feedback
4. **Responsive Design**: Mobile-first approach with TailwindCSS
5. **Form Validation**: Yup schemas with Formik integration
6. **Modular Structure**: Well-organized file structure

### **Areas for Improvement:**
1. **No Testing**: Missing unit and integration tests
2. **Limited Error Boundaries**: No React error boundaries
3. **No Loading States**: Basic loading indicators
4. **Hardcoded Values**: Some magic strings and numbers
5. **No Authentication**: No user management system

## **Real-Time Solutioning Questions & Answers**

### **Q1: How would you scale this to handle 10,000+ events?**

**Answer:**
```typescript
// 1. Database Migration
interface Event {
  id: string;
  title: string;
  date: Date;
  createdBy: string;
  // Add indexes
  createdAt: Date;
  updatedAt: Date;
}

// 2. Pagination Implementation
type Query {
  events(
    first: Int = 10
    after: String
    filter: EventFilter
  ): EventConnection!
}

// 3. Caching Strategy
const cache = new Redis();
const events = await cache.get(`events:${page}:${filter}`);
if (!events) {
  events = await db.events.findMany({ /* query */ });
  await cache.set(`events:${page}:${filter}`, events, '5m');
}
```

### **Q2: How would you implement real-time updates for multiple users?**

**Answer:**
```typescript
// 1. WebSocket Integration
const server = new WebSocketServer({ port: 4001 });

// 2. GraphQL Subscriptions
type Subscription {
  eventUpdated(eventId: ID!): Event!
  attendeeAdded(eventId: ID!): EventAttendee!
}

// 3. Pub/Sub Pattern
const pubsub = new PubSub();
await pubsub.publish('EVENT_UPDATED', { eventId, event });

// 4. Client-side Subscription
const { data } = useSubscription(EVENT_UPDATED, {
  variables: { eventId },
  onData: ({ data }) => {
    // Update local cache
    client.cache.modify({
      id: client.cache.identify({ __typename: 'Event', id: eventId }),
      fields: {
        attendees(existing = []) {
          return [...existing, data.attendeeAdded];
        }
      }
    });
  }
});
```

### **Q3: How would you add authentication and authorization?**

**Answer:**
```typescript
// 1. JWT-based Authentication
interface AuthContext {
  user: User;
  permissions: string[];
}

// 2. GraphQL Context
const server = new ApolloServer({
  context: async ({ req }) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const user = await verifyToken(token);
    return { user, permissions: getUserPermissions(user) };
  }
});

// 3. Authorization Directives
directive @auth(requires: [Permission!]!) on FIELD_DEFINITION

type Mutation {
  createEvent(input: CreateEventInput!): Event! @auth(requires: [CREATE_EVENT])
  deleteEvent(id: ID!): Boolean! @auth(requires: [DELETE_EVENT])
}

// 4. Row-level Security
const events = await db.events.findMany({
  where: {
    OR: [
      { createdBy: user.id },
      { isPublic: true },
      { attendees: { some: { attendeeId: user.id } } }
    ]
  }
});
```

### **Q4: How would you optimize performance for large datasets?**

**Answer:**
```typescript
// 1. Database Indexing
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_created_by ON events(created_by);
CREATE INDEX idx_event_attendees_event_id ON event_attendees(event_id);

// 2. DataLoader for N+1 Queries
const userLoader = new DataLoader(async (userIds: string[]) => {
  const users = await db.users.findMany({ where: { id: { in: userIds } } });
  return userIds.map(id => users.find(u => u.id === id));
});

// 3. GraphQL Query Complexity Analysis
const complexityLimit = 1000;
const complexity = calculateQueryComplexity(query, schema);

// 4. Response Caching
const cache = new Redis();
const cacheKey = `query:${hash(query)}:${hash(variables)}`;
```

### **Q5: How would you handle data consistency and transactions?**

**Answer:**
```typescript
// 1. Database Transactions
const transaction = await db.$transaction(async (tx) => {
  const event = await tx.events.create({ data: eventData });
  const attendee = await tx.attendees.create({ data: attendeeData });
  await tx.eventAttendees.create({
    data: { eventId: event.id, attendeeId: attendee.id }
  });
  return { event, attendee };
});

// 2. Optimistic Updates with Rollback
const optimisticResponse = {
  addAttendeeToEvent: {
    id: 'temp-id',
    attendee: { id: 'temp-attendee', name, email },
    rsvpStatus: 'yes'
  }
};

// 3. Event Sourcing for Audit Trail
interface EventLog {
  id: string;
  aggregateId: string;
  eventType: string;
  data: any;
  timestamp: Date;
  userId: string;
}
```

## **Production Readiness Checklist**

### **High Priority:**
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Authentication & authorization
- [ ] Input validation & sanitization
- [ ] Error logging & monitoring
- [ ] Rate limiting & security headers

### **Medium Priority:**
- [ ] Caching layer (Redis)
- [ ] File uploads & storage
- [ ] Email notifications
- [ ] Search & filtering
- [ ] API documentation

### **Low Priority:**
- [ ] Analytics & reporting
- [ ] Mobile app
- [ ] Internationalization
- [ ] Advanced UI features

## **Technical Debt & Refactoring Opportunities**

1. **Extract Business Logic**: Move validation logic to separate services
2. **Add Repository Pattern**: Abstract data access layer
3. **Implement CQRS**: Separate read and write operations
4. **Add Event Sourcing**: For audit trails and data consistency
5. **Microservices Split**: Separate user management, event management, and notifications

This architecture demonstrates solid fundamentals but would need significant enhancements for production use. The focus should be on data persistence, security, and scalability improvements.