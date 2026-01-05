export default async function Posts() {
  // requete se fait en deux temps

  // 1. fetch pour interroger le serveur asynchrone
  const data = await fetch("http://localhost:3000/api/posts");

  // 2. récupérer les data uniquement de la requete, attention c'est encore asynchrone donc on met un await

  // Attention à la structure meme des données { posts : [ ...] }
  const dataPosts = await data.json();
  const posts = dataPosts.posts;

  console.log(posts);
  return (
    <div className="hero">
      <section className="hero-card">
        <ul>
          {posts.map((post, i) => (
            <li key={i}>{post.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
