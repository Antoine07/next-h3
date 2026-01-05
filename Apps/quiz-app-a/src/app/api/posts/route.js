export async function GET(request) {

  const posts = [
    { title: "MySQL" },
    { title: "Next" },
    { title: "React" }
  ]

  return Response.json({
    posts: posts,
  });
}