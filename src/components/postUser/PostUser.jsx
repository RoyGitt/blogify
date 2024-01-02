import Image from "next/image";
import styles from "./postUser.module.css";

const getUser = async (userId) => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users${userId}`
    );
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const PostUser = async ({ userId }) => {
  const user = getUser(userId);

  return (
    <div className={styles.container}>
      <Image
        className={styles.avatar}
        src={user.img ? user.img : "/noavatar.png"}
        alt=""
        width={50}
        height={50}
      />
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>{user.username}</span>
      </div>
    </div>
  );
};

export default PostUser;
