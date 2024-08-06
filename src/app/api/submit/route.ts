import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { FormValues } from '@/utils/types';

export async function POST(request: NextRequest) {



    const body: FormValues  = await request.json();

    const { fullName, birthYear, country } = body;

    try{
      const response = await fetch('https://api.ofac-api.com/v4/screen', {
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
      console.log(data);
      console.log(data.results[0].matches);
    } catch (error) {
      console.error('Error:', error);
    }
   
    // return Response.json({ data })
    return Response.json({ message: 'POST request received' })
  }