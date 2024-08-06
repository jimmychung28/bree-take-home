'use client'

import { useForm, SubmitHandler } from 'react-hook-form';
import {useState} from 'react'; 
import type { FormValues } from '../utils/types';
import { query } from '@/utils/query';
import Modal from 'react-modal';

export default function Home() {

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const [result, setResult] = useState<Partial<{
        nameMatches: boolean;
        dobMatches: boolean;
        countryMatches: boolean;
        fetched: boolean;
    }>>({fetched: false});

  const [isModalOpen, setModalIsOpen] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {


    const response = await query(data);

    if(!response?.error) {
      setResult({...response, fetched: true});
      setModalIsOpen(true);
    }

  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
              <div className="mb-4 ">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <div className='block flex items-center'>
                    <input
                      id="fullName"
                      {...register('fullName', { required: 'Full Name is required' })}
                      className="mt-1 mr-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {result?.fetched? <p> {result?.nameMatches ? "✅" : "❌"}</p> : null}
                </div>
                {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="birthYear" className="block text-sm font-medium text-gray-700">Birth Year</label>
                <div className='block flex items-center'>
                  <input
                    id="birthYear"
                    type="number"
                    {...register('birthYear', { required: 'Birth Year is required', valueAsNumber: true })}
                    className="mt-1 mr-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {result?.fetched? <p> {result?.dobMatches  ? "✅" : "❌"}</p> : null}
                </div>
                {errors.birthYear && <p className="mt-2 text-sm text-red-600">{errors.birthYear.message}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <div className='block flex items-center'>
                    <input
                      id="country"
                      {...register('country', { required: 'Country is required' })}
                      className="mt-1 mr-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {result?.fetched? <p> {result?.countryMatches ? "✅" : "❌"}</p> : null}
                </div>
                {errors.country && <p className="mt-2 text-sm text-red-600">{errors.country.message}</p>}
              </div>
              
              <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit
              </button>
            </form>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={()=>setModalIsOpen(false)}
              contentLabel="Query Result"
              className="bg-white p-6 rounded shadow-lg max-w-md mx-auto mt-20"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
              <h2 className="text-xl font-semibold mb-4">{result.nameMatches || result.dobMatches || result.countryMatches ? 'Hit' : 'Clear'}</h2>
              <div className="mb-4">
                <p>Full Name Match: {result.nameMatches ? "✅" : "❌"}</p>
                <p>Birth Year Match: {result.dobMatches ? "✅" : "❌"}</p>
                <p>Country Match: {result.countryMatches ? "✅" : "❌"}</p>
              </div>
              <button onClick={()=>setModalIsOpen(false)} className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Close
              </button>
            </Modal>
    </main>
  );
}