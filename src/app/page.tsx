'use client'

import { useForm, SubmitHandler } from 'react-hook-form';
import {useState} from 'react'; 
import type { FormValues } from '../utils/types';
import { query } from '@/utils/query';
import ResultModal from './components/modal';
import FORM_MAP, {FormMap} from '@/utils/formMap';
import { formFields } from '@/utils/formMap';
import FormInput from './components/formInput';


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
              {Object.keys(FORM_MAP).map((key) => {
                const { label, id, type, required,matchKey } = FORM_MAP[key as keyof FormMap];
                return (
                  <FormInput 
                    key={id}
                    label={label}
                    id={id}
                    type={type}
                    required={required}
                    errors={errors}
                    register={register}
                    result={result}
                    matchKey={matchKey}
                  />
                );
              })}         
              <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit
              </button>
            </form>
            <ResultModal isOpen={isModalOpen} closeModal={() => setModalIsOpen(false)} result={result} />
    </main>
  );
}