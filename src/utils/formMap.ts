export enum formFields  {
    fullName = 'fullName',
    birthYear = 'birthYear',
    country = 'country',
}

type FormInput = {
    label: string;
    id: string;
    type: string;
    required: string;
};

export type FormMap = {
    [key in formFields]: FormInput;
};

const FORM_MAP: FormMap = {
    [formFields.fullName]: {
        label: 'Full Name',
        id: formFields.fullName,
        type: 'text',
        required: 'Full Name is required',
    },
    [formFields.birthYear]: {
        label: 'Birth Year',
        id: formFields.birthYear,
        type: 'number',
        required: 'Birth Year is required',
    },
    [formFields.country]: {
        label: 'Country',
        id: formFields.country,
        type: 'text',
        required: 'Country is required',
    },
};

export default FORM_MAP;