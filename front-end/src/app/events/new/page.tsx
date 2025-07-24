'use client';

import { useMutation, useQuery } from '@apollo/client';
import { CREATE_EVENT, GET_TAGS, GET_USERS, GET_EVENTS } from '@/lib/graphql';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { CreateEventInput, Tag, User } from '@/lib/types';

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  date: Yup.date()
    .required('Date is required')
    .min(new Date(), 'Event date must be in the future'),
  createdBy: Yup.string()
    .required('Please select a user'),
  tagIds: Yup.array()
    .of(Yup.string())
});

export default function CreateEventPage() {
  const router = useRouter();
  const { data: tagsData } = useQuery(GET_TAGS);
  const { data: usersData } = useQuery(GET_USERS);
  const [createEvent, { loading }] = useMutation(CREATE_EVENT, {
    refetchQueries: [{ query: GET_EVENTS }],
    onCompleted: () => {
      router.push('/');
    }
  });

  const tags = tagsData?.tags || [];
  const users = usersData?.users || [];

  const initialValues: CreateEventInput = {
    title: '',
    date: '',
    createdBy: '',
    tagIds: []
  };

  const handleSubmit = async (values: CreateEventInput) => {
    try {
      await createEvent({
        variables: {
          input: {
            title: values.title,
            date: new Date(values.date).toISOString(),
            createdBy: values.createdBy,
            tagIds: values.tagIds
          }
        }
      });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Events
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
          <p className="text-gray-600 mt-2">Fill in the details below to create a new event</p>
        </div>

        {/* Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className="space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Event Title *
                  </label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter event title"
                  />
                  <ErrorMessage name="title" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Event Date & Time *
                  </label>
                  <Field
                    type="datetime-local"
                    id="date"
                    name="date"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <ErrorMessage name="date" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Created By */}
                <div>
                  <label htmlFor="createdBy" className="block text-sm font-medium text-gray-700">
                    Created By *
                  </label>
                  <Field
                    as="select"
                    id="createdBy"
                    name="createdBy"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select a user</option>
                    {users.map((user: User) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="createdBy" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="space-y-2">
                    {tags.map((tag: Tag) => (
                      <label key={tag.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={Array.isArray(values.tagIds) && values.tagIds.includes(tag.id)}
                          onChange={(e) => {
                            const currentTagIds = Array.isArray(values.tagIds) ? values.tagIds : [];
                            if (e.target.checked) {
                              setFieldValue('tagIds', [...currentTagIds, tag.id]);
                            } else {
                              setFieldValue('tagIds', currentTagIds.filter((id: string) => id !== tag.id));
                            }
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{tag.name}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorMessage name="tagIds" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-3">
                  <Link
                    href="/"
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating...' : 'Create Event'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
} 