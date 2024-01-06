import Image from "next/image";
import styles from "./blogDetail.module.css";
import PostUser from "@/components/postUser/PostUser";
import { Suspense } from "react";
// import { getPost } from "@/lib/data";

const getPost = async (slug) => {
  try {
    const res = await fetch(`/api/blog/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  console.log(slug);
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
              : "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
            <Suspense fallback={<p>Loading</p>}>
              <PostUser userId={post.userId} />
            </Suspense>
            {post.createdAt && (
              <p className={styles.time}>
                {post.createdAt.toString().slice(0, 10)}
              </p>
            )}
          </div>
        </div>
        <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
