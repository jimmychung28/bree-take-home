'use client'

import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  fullName: string;
  birthYear: number;
  country: string;
};

export default function Home() {

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  id="fullName"
                  {...register('fullName', { required: 'Full Name is required' })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="birthYear" className="block text-sm font-medium text-gray-700">Birth Year</label>
                <input
                  id="birthYear"
                  type="number"
                  {...register('birthYear', { required: 'Birth Year is required', valueAsNumber: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.birthYear && <p className="mt-2 text-sm text-red-600">{errors.birthYear.message}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  id="country"
                  {...register('country', { required: 'Country is required' })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.country && <p className="mt-2 text-sm text-red-600">{errors.country.message}</p>}
              </div>
              
              <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit
              </button>
            </form>
    </main>
  );
}