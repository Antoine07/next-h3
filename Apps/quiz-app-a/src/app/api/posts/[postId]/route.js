export async function GET(request, { params }) {
    const { postId } = await params
  
    return Response.json({
      post:  postId,
    });
  }