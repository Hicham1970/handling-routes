import { NextRequest } from 'next/server';
import { headers, cookies } from 'next/headers';
 
export async function GET(request: NextRequest) {
    // You can use the request object to access query parameters, headers, etc.
    //Extracts the request headers from the NextRequest object; First method withe NextRequest
    // const requestHeaders = new Headers(request.headers);
    // console.log('Request Headers:', requestHeaders.get('Authorization'));

    // Extracts the request headers from the NextRequest object; Second method with headers() function
    const headersList = await headers();
    console.log('Request Headers:', headersList.get('Authorization'));
    // lire le parameter theme
    const theme = request.cookies.get('theme');
    console.log('Theme:', theme?.value); // 'dark'

    // Extracts the cookies from the NextRequest object with cookies() function
    const cookiesList = await cookies();
    //set a cookie
    cookiesList.set('resultsPerPage', '10');
    // get a cookie
    console.log('Cookies:', cookiesList.get('resultsPerPage'));  
    
    return new Response('<h1>This is the Profile Api Data !</>', {
        status: 200,
        headers: {
            // to set the response headers 
            'Content-Type': 'text/html',
            'Set-Cookie': 'theme=dark',
        },
    });
}
