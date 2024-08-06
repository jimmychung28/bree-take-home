export type FormValues = {
    fullName: string;
    birthYear: number;
    country: string;
};

export type Address = {
    country: string;
    [key: string]: any; 
}