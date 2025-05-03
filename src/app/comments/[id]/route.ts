import { NextRequest } from 'next/server';
import { comments } from '../data';


// Route handler for GET /
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const comment = comments.find((comment) => comment.id === params.id);
    if (!comment) {
        return new Response('Comment not found', { status: 404 });
    }
    return new Response(JSON.stringify(comment), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}


// Route Handler for PATCH /

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    const comment = await request.json();
    const index = comments.findIndex((comment) => comment.id === params.id);
    if (index === -1) {
        return new Response('Comment not found', { status: 404 });
    }
    comments[index].comment = comment.comment;
    return new Response(JSON.stringify(comments[index]), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

// Route Handler for DELETE
// DELETE /:id
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    // Find the comment by ID and remove it from the array
    const index = comments.findIndex((comment) => comment.id === params.id);
    if (index === -1) {
        // If the comment is not found, return a 404 response
        return new Response('Comment not found', { status: 404 });
    }
    // Remove the comment from the array
    // This is a simple array operation; in a real application, you would likely want to update the database instead
    comments.splice(index, 1);
    return new Response('Comment deleted', { status: 200 });
}
