import { getPosts } from "@/lib/data";
import styles from "./adminposts.module.css";
import Image from "next/image";
import { deletePost } from "@/lib/action";

const AdminPosts = async () => {
  const posts = await getPosts();

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {posts.map((post) => {
        return (
          <div className={styles.post} key={post.id}>
            <div className={styles.detail}>
              <Image
                src={
                  post.img ||
                  "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                alt=""
                width={50}
                height={50}
              />
              <span className={styles.postTitle}>{post.title}</span>
            </div>
            <form action={deletePost}>
              <input type="hidden" name="id" value={post.id} />
              <button className={styles.postButton}>Delete</button>
            </form>
          </div>
        );
      })}
    </div>
  );
};

export default AdminPosts;
