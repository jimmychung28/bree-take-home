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
    matchKey: string;
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
        matchKey: "nameMatches"
    },
    [formFields.birthYear]: {
        label: 'Birth Year',
        id: formFields.birthYear,
        type: 'number',
        required: 'Birth Year is required',
        matchKey: "dobMatches"
    },
    [formFields.country]: {
        label: 'Country',
        id: formFields.country,
        type: 'text',
        required: 'Country is required',
        matchKey: "countryMatches"
    },
};

export default FORM_MAP;