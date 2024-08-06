A scalable full stack web application that screens customers against the publicly available OFAC Specially Designated Nationals (SDN) list Application availible here https://bree-take-home.vercel.app/

# Tech Stack

NextJS (App Router), Typescript, Tailwind

Notable packages: React Hook Form

# Steps to use

1. Enter name, birth year, and country of user.
2. Submit and an modal will show if the user is a hit or clear (with matching fields or not).  
3. Indicators showing the three fields and if they were matched or not is displayed on both the modal and form

# Run locally

1. npm install
2. npm run dev

# Potential Improvements
1. React Query or useswr could be used to cache queries enhancing performance and reducing redundant network requests. However for a simple app like this it may not be necessary considering addtional complexity with regards to invalidating stale caches. Users are also unlikely to search for the same parameters multiple times in this application. 