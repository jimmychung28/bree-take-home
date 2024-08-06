import { formFields } from '@/utils/formMap';


function stringToEnum(value: string): formFields{
    return formFields[value as keyof typeof formFields ];
}

type FormInputProps = {
    label: string;
    id: string;
    type?: string;
    required: string;
    errors: any;
    register: any;
    result: any;
    matchKey: string;
}

const FormInput: React.FC<FormInputProps> = ({
    label,  
    id,
    type,
    required,
    errors,
    register,
    result,
    matchKey
    }) => {

    if (type === 'number') {
        return (
            <div key={id} className="mb-4">
                        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
                        <div className='block flex items-center'>
                            <input
                              id={id}
                              type="number"
                              {...register(stringToEnum(id), { required, valueAsNumber: true })}
                              className="mt-1 mr-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {result?.fetched? <p> {result?.[matchKey] ? "✅" : "❌"}</p> : null}
                </div>
                {errors[id] && <p className="mt-2 text-sm text-red-600">{errors[id].message}</p>}
            </div>
        );
    } else {
        return (
            <div key={id} className="mb-4">
                        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
                        <div className='block flex items-center'>
                            <input
                              id={id}
                              {...register(stringToEnum(id), { required })}
                              className="mt-1 mr-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {result?.fetched? <p> {result?.[matchKey] ? "✅" : "❌"}</p> : null}
                </div>
                {errors[id] && <p className="mt-2 text-sm text-red-600">{errors[id].message}</p>}
            </div>
        );
    }
    
}

export default FormInput;