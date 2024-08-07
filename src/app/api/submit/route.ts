import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { FormValues,Address } from '@/utils/types';


export async function POST(request: NextRequest) {
    const body: FormValues  = await request.json();

    const { fullName, birthYear, country } = body;

    try{
      const response = await fetch(`${process.env.OFAC_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OFAC_API_KEY}`
        },
        body: JSON.stringify({
          "apiKey": `${process.env.OFAC_API_KEY}`,
          "minScore": 20,
          "sources": ["SDN"],
          "cases": [{
            "name": fullName,
            "dob": birthYear,
            "address": {
              "country": country
            }
          }]
        })
      });
      const data = await response.json();

      // Check if the name in returned profiles includes the name entered by the user
      const nameMatchesFilter = data?.results?.[0]?.matches?.filter((match: {
        name: string;
        [key: string]: any; 
      }) => match.name.toLowerCase().includes(fullName.toLowerCase()));

      const nameMatches: boolean = nameMatchesFilter?.length > 0;

      // Check if the birth year in returned profiles includes the birth year entered by the user
      const dobMatches: boolean= nameMatchesFilter?.some(({personDetails}: {
        birthDates: string;
        [key: string]: any; 
      }) => personDetails.birthDates.some((date:string)=>new Date(date).getFullYear() === birthYear))

      // Check if the country in returned profiles includes the country entered by the user
      const countryMatches: boolean = nameMatchesFilter?.some(({addresses}: {
        addresses: Address[];
        [key: string]: any; 
      }) => addresses && addresses.some((address:Address) => address.country.toLowerCase().trim() === country.toLowerCase().trim()))

      return Response.json({ nameMatches, dobMatches, countryMatches });
    } catch (error) {
      console.error('Error:', error);
    }
  }