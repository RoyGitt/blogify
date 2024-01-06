import PostCard from "@/components/postCard/PostCard";
import styles from "./blog.module.css";
// import { getPosts } from "@/lib/data";

export const metadata = {
  title: "Blog",
  description:
    "We create digital ideas that are bigger, bolder, braver and better.",
};

const getPosts = async () => {
  try {
    // If i dont want to store cache
    // const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    //   cache: "no-store",
    //     });
    const apiBaseUrl =
      process.env.NODE_ENV === "production"
        ? "https://blogify-lao6.vercel.app/api/blog"
        : "http://localhost:3000/api/blog";
    const res = await fetch(`${apiBaseUrl}`, {
      next: { revalidate: 3600 }, //for revalidating
    });
    if (!res.ok) {
      throw new Error("Could not fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const BlogPage = async () => {
  const posts = await getPosts();

  return (
    <div className={styles.container}>
      {posts?.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
