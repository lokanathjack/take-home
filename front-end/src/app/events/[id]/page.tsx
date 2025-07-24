'use client';

import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENT, ADD_ATTENDEE_TO_EVENT, REMOVE_ATTENDEE_FROM_EVENT, SET_RSVP_STATUS } from '@/lib/graphql';
import { useParams } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { ArrowLeftIcon, PlusIcon, TrashIcon, CalendarIcon, UserGroupIcon, TagIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Tag, EventAttendee } from '@/lib/types';

const addAttendeeSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .optional()
});

// Define a type for the form values
interface AddAttendeeFormValues {
  name: string;
  email: string;
}

export default function EventDetailsPage() {
  const params = useParams();
  // const router = useRouter(); // Remove unused variable
  const eventId = params.id as string;
  const [showAddForm, setShowAddForm] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_EVENT, {
    variables: { id: eventId }
  });

  const [addAttendee] = useMutation(ADD_ATTENDEE_TO_EVENT, {
    onCompleted: () => {
      refetch();
      setShowAddForm(false);
    }
  });

  const [removeAttendee] = useMutation(REMOVE_ATTENDEE_FROM_EVENT, {
    onCompleted: () => {
      refetch();
    }
  });

  const [setRSVPStatus] = useMutation(SET_RSVP_STATUS, {
    onCompleted: () => {
      refetch();
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading event...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error loading event</div>
          <p className="text-gray-600">{error.message}</p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const event = data?.event;
  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Event not found</div>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const handleAddAttendee = async (values: AddAttendeeFormValues) => {
    try {
      await addAttendee({
        variables: {
          input: {
            eventId: eventId,
            name: values.name,
            email: values.email || undefined
          }
        }
      });
    } catch (error) {
      console.error('Error adding attendee:', error);
    }
  };

  const handleRemoveAttendee = async (attendeeId: string) => {
    if (confirm('Are you sure you want to remove this attendee?')) {
      try {
        await removeAttendee({
          variables: {
            eventId: eventId,
            attendeeId: attendeeId
          }
        });
      } catch (error) {
        console.error('Error removing attendee:', error);
      }
    }
  };

  const handleRSVPChange = async (attendeeId: string, rsvpStatus: string) => {
    try {
      await setRSVPStatus({
        variables: {
          input: {
            eventId: eventId,
            attendeeId: attendeeId,
            rsvpStatus: rsvpStatus
          }
        }
      });
    } catch (error) {
      console.error('Error updating RSVP:', error);
    }
  };

  const getRSVPColor = (status: string) => {
    switch (status) {
      case 'yes': return 'bg-green-100 text-green-800';
      case 'no': return 'bg-red-100 text-red-800';
      case 'maybe': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Events
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Event Details */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <UserGroupIcon className="h-5 w-5 mr-2" />
                  Created by {event.createdBy.name} ({event.createdBy.email})
                </div>

                {event.tags && event.tags.length > 0 && (
                  <div className="flex items-center text-sm text-gray-600">
                    <TagIcon className="h-5 w-5 mr-2" />
                    <div className="flex flex-wrap gap-1">
                      {event.tags.map((tag: Tag) => (
                        <span
                          key={tag.id}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Attendees */}
            <div className="bg-white shadow rounded-lg p-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Attendees ({event.attendeeCount})
                </h2>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add Attendee
                </button>
              </div>

              {/* Add Attendee Form */}
              {showAddForm && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                  <Formik
                    initialValues={{ name: '', email: '' }}
                    validationSchema={addAttendeeSchema}
                    onSubmit={handleAddAttendee}
                  >
                    <Form className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Name *
                        </label>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Enter attendee name"
                        />
                        <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email (optional)
                        </label>
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Enter attendee email"
                        />
                        <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
                      </div>

                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowAddForm(false)}
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Add Attendee
                        </button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              )}

              {/* Attendees List */}
              <div className="space-y-3">
                {event.attendees && event.attendees.length > 0 ? (
                  event.attendees.map((eventAttendee: EventAttendee) => (
                    <div
                      key={eventAttendee.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {eventAttendee.attendee.name}
                            </p>
                            {eventAttendee.attendee.email && (
                              <p className="text-sm text-gray-500">
                                {eventAttendee.attendee.email}
                              </p>
                            )}
                          </div>
                          <select
                            value={eventAttendee.rsvpStatus}
                            onChange={(e) => handleRSVPChange(eventAttendee.attendee.id, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="yes">Yes</option>
                            <option value="maybe">Maybe</option>
                            <option value="no">No</option>
                            <option value="pending">Pending</option>
                          </select>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRSVPColor(eventAttendee.rsvpStatus)}`}>
                            {eventAttendee.rsvpStatus}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveAttendee(eventAttendee.attendee.id)}
                        className="ml-4 p-1 text-red-600 hover:text-red-800"
                        title="Remove attendee"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No attendees yet. Add the first one!</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Attendees:</span>
                  <span className="text-sm font-medium">{event.attendeeCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Confirmed:</span>
                  <span className="text-sm font-medium text-green-600">
                    {event.attendees?.filter((ea: EventAttendee) => ea.rsvpStatus === 'yes').length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Maybe:</span>
                  <span className="text-sm font-medium text-yellow-600">
                    {event.attendees?.filter((ea: EventAttendee) => ea.rsvpStatus === 'maybe').length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Declined:</span>
                  <span className="text-sm font-medium text-red-600">
                    {event.attendees?.filter((ea: EventAttendee) => ea.rsvpStatus === 'no').length || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 