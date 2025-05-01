import {comments } from './data';

export async function GET() {
    return new Response(JSON.stringify(comments))
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