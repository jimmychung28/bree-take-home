import type { FormValues } from '../utils/types';


export const query = async (data: FormValues): Promise<Partial<{
    nameMatches: boolean;
    dobMatches: boolean;
    countryMatches: boolean;
    error: string;
}>> => {
    try{
        const response = await fetch(`/api/submit`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })

          const result: {nameMatches: boolean, dobMatches: boolean, countryMatches: boolean} = await response.json();

          return result;

    } catch (error) {
        console.error('Error:', error);
        return {error: 'An error occurred'};
    }

}