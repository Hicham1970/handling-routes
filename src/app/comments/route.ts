import { NextRequest } from 'next/server';
import {comments } from './data';


// Route handler for GET /comments
// This function handles GET requests to the /comments endpoint and retrieves comments based on the query parameter.
// It filters the comments based on the query parameter and returns the filtered comments as a JSON response.   
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const filteredComments = query
        ? comments.filter((comment) => comment.comment.toLowerCase().includes(query.toLowerCase()))
        : comments;
    return new Response(JSON.stringify(filteredComments))
}


export async function POST(request: Request) {
    const comment = await request.json()
    const newComment = {
        id: (comments.length + 1).toString(),
        comment: comment.comment,
    };
    // Save the comment to the database or perform any other necessary actions
    comments.push(newComment);
    return new Response(JSON.stringify(newComment), {
        headers: {
            'Content-Type': 'application/json',
        },
        status: 201,
    })
 }
