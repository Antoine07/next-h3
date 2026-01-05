export async function GET(request) {

  const posts = [
    { id: 1, title: "MySQL" },
    { id: 2, title: "Next" },
    { id: 3, title: "React" }
  ]

  return Response.json({
    posts: posts,
  });
}