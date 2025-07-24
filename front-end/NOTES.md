# Notes and Assumptions

This document outlines the assumptions, design decisions, and known issues for the Mini Event Manager application.

## Assumptions

### Business Logic
1. **Users vs Attendees**: 
   - Users are system users who can create and manage events
   - Attendees are external people who can be invited to events but don't have system accounts
   - This separation allows for a simpler user management system

2. **Event Creation**:
   - Only users can create events
   - Events require a title and date
   - Event dates must be in the future (enforced by frontend validation)
   - Events can have multiple tags for categorization

3. **Attendee Management**:
   - Attendees can be added to events without being system users
   - Email addresses are optional for attendees
   - If an attendee with the same email already exists, they are reused
   - Attendees can attend multiple events

4. **RSVP System**:
   - RSVP status is tracked per event-attendee combination
   - Default RSVP status is 'yes' when adding a new attendee
   - Valid RSVP statuses: 'yes', 'no', 'maybe', 'pending'

### Technical Assumptions
1. **Data Storage**: Using in-memory arrays for demonstration purposes
2. **Data Validation**: Basic validation on both frontend and backend
3. **Error Handling**: Basic error handling with user-friendly messages

## Design Decisions

### Backend Architecture
1. **GraphQL Schema Design**:
   - Used a clean, normalized schema with proper relationships
   - Implemented proper input types for mutations
   - Added computed fields like `attendeeCount` for convenience

2. **Data Layer**:
   - Used in-memory storage with helper functions for data manipulation
   - Implemented proper error handling and validation
   - Used UUIDs for all IDs to ensure uniqueness

3. **API Design**:
   - RESTful-style mutations with clear naming
   - Proper error responses with descriptive messages
   - Optimistic updates where appropriate

### Frontend Architecture
1. **Next.js App Router**:
   - Used the new App Router for better performance and features
   - Implemented proper client-side components where needed
   - Used TypeScript throughout for type safety

2. **State Management**:
   - Used Apollo Client for GraphQL state management
   - Implemented proper loading and error states
   - Used React hooks for local state management

3. **UI/UX Design**:
   - Used TailwindCSS for consistent styling
   - Implemented responsive design for mobile and desktop
   - Used Heroicons for consistent iconography
   - Added proper loading states and error handling

4. **Form Handling**:
   - Used Formik for form state management
   - Implemented Yup validation schemas
   - Added proper error messages and field validation

### Technology Choices
1. **GraphQL**: Chosen for its flexibility and type safety
2. **Apollo Server**: Industry standard for GraphQL servers
3. **Next.js**: Modern React framework with excellent developer experience
4. **TypeScript**: For type safety and better developer experience
5. **TailwindCSS**: For rapid UI development and consistency
6. **Formik + Yup**: For robust form handling and validation

## Known Issues and Limitations

### Current Limitations
1. **Data Persistence**: 
   - All data is lost when the server restarts
   - No database integration implemented

2. **Authentication/Authorization**:
   - No user authentication system
   - No authorization checks for event management
   - All users can manage all events

3. **Real-time Updates**:
   - No real-time updates when multiple users are using the app
   - Changes require manual refresh or refetch

4. **File Uploads**:
   - No support for event attachments or images
   - No file upload functionality

5. **Email Integration**:
   - No email notifications for event invitations
   - No email confirmation system

### Performance Considerations
1. **Scalability**: 
   - In-memory storage won't scale beyond a single server
   - No pagination implemented for large datasets
   - No caching layer implemented

2. **Security**:
   - No input sanitization beyond basic validation
   - No rate limiting implemented
   - No CORS configuration for production

### UI/UX Limitations
1. **Mobile Experience**:
   - Basic responsive design implemented
   - Could be optimized further for mobile devices

2. **Accessibility**:
   - Basic accessibility features implemented
   - Could be enhanced with ARIA labels and keyboard navigation

3. **Internationalization**:
   - No i18n support implemented
   - Date formatting is hardcoded to US format

## Future Enhancements

### High Priority
1. **Database Integration**: Replace in-memory storage with a proper database
2. **Authentication System**: Implement user authentication and authorization
3. **Data Validation**: Add comprehensive server-side validation
4. **Error Handling**: Implement proper error boundaries and logging

### Medium Priority
1. **Real-time Updates**: Add WebSocket support for live updates
2. **Email Notifications**: Implement email invitation system
3. **File Uploads**: Add support for event attachments
4. **Search and Filtering**: Add search functionality for events and attendees

### Low Priority
1. **Advanced UI Features**: Add drag-and-drop, bulk operations
2. **Analytics**: Add event analytics and reporting
3. **Mobile App**: Develop native mobile applications
4. **API Documentation**: Add comprehensive API documentation

## Testing Strategy

### Current Testing
- Manual testing of all features
- Basic error handling validation
- Cross-browser compatibility testing

### Recommended Testing
1. **Unit Tests**: Add unit tests for GraphQL resolvers and utility functions
2. **Integration Tests**: Add integration tests for API endpoints
3. **E2E Tests**: Add end-to-end tests for user workflows
4. **Performance Tests**: Add load testing for API endpoints

## Deployment Considerations

### Development
- Both frontend and backend run on localhost
- No environment-specific configuration
- No production optimizations

### Production Requirements
1. **Environment Variables**: Configure for different environments
2. **Database**: Set up production database
3. **Caching**: Implement Redis or similar for caching
4. **CDN**: Set up CDN for static assets
5. **Monitoring**: Add application monitoring and logging
6. **SSL**: Configure HTTPS for production

## Code Quality

### Current State
- TypeScript used throughout for type safety
- ESLint configured for code quality
- Consistent code formatting
- Clear component and function naming

### Improvements Needed
1. **Code Coverage**: Add comprehensive test coverage
2. **Documentation**: Add JSDoc comments for functions
3. **Performance**: Optimize bundle size and loading times
4. **Security**: Add security scanning and vulnerability checks 