import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { FormValues } from '@/utils/types';

export async function POST(request: NextRequest) {
    const body: FormValues  = await request.json();

    const { fullName, birthYear, country } = body;

    try{
      const response = await fetch('https://api.ofac-api.com/v4/search', {
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

      const nameMatchesFilter = data.results[0].matches.filter((match: {
        name: string;
        [key: string]: any; 
      }) => match.name.toLowerCase().includes(fullName.toLowerCase()));
      const nameMatches: boolean = nameMatchesFilter.length > 0;
      const dobMatches: boolean= nameMatchesFilter.some(({personDetails}: {
        birthDates: string;
        [key: string]: any; 
      }) => personDetails.birthDates.some((date:string)=>new Date(date).getFullYear() === birthYear))
      const countryMatches: boolean = nameMatchesFilter.some(({addresses}: {
        addresses: any[];
        [key: string]: any; 
      }) => addresses && addresses.some((address:{
        country: string;
        [key: string]: any; 
      }) => address.country.toLowerCase().trim() === country.toLowerCase().trim()))

      return Response.json({ nameMatches, dobMatches, countryMatches });
    } catch (error) {
      console.error('Error:', error);
    }
  }