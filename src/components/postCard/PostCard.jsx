import Image from "next/image";
import styles from "./postCard.module.css";
import Link from "next/link";

const PostCard = ({ post }) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.imgContainer}>
          <Image
            src={
              post.img
                ? post.img
                : "https://images.pexels.com/photos/19551880/pexels-photo-19551880/free-photo-of-cute-dog-in-christmas-sweater-and-hat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt=""
            fill
            className={styles.img}
          />
        </div>

        <span className={styles.date}>
          {post.createdAt?.toString().slice(4, 16)}
        </span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>{post.body}</p>
        <Link className={styles.link} href={`/blog/${post.id}`}>
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
