import Image from "next/image";
import styles from "./blogDetail.module.css";
import PostUser from "@/components/postUser/PostUser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";

// const getPost = async (slug) => {
//   try {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/1`);
//     if (!res.ok) {
//       throw new Error("Something went wrong");
//     }
//     return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.desc,
  };
};

const SinglePostPage = async ({ params, searchParams }) => {
  const { slug } = params;

  const post = await getPost(slug);
  // console.log(searchParams);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src={
            post?.img
              ? post.img
              : "https://images.pexels.com/photos/19551880/pexels-photo-19551880/free-photo-of-cute-dog-in-christmas-sweater-and-hat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt=""
          fill
          className={styles.img}
        />
      </div>

      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              <Suspense fallback={<p>Loading</p>}>
                <PostUser userId={post.userId} />
              </Suspense>

              {post.createdAt
                ? post.createdAt.toString().slice(4, 16)
                : new Date().toString().slice(4, 16)}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
