export async function GET(request, { params }) {
    const { postId } = await params

    // params = { postId : 3 }

    const posts = [
        { id: 1, title: "MySQL" }, // p => p.id == postId
        { id: 2, title: "Next" }, // p => p.id == postId
        { id: 3, title: "React" } // p => p.id == postId TRUE
      ]

    const post = posts.find(p => p.id == postId)
  
    return Response.json({
      post:  post,
    });
  }