import { addPost, deletePost } from "@/lib/action";

const ServerAction = async () => {
  return (
    <div>
      <form action={addPost}>
        <input type="text" placeholder="title" name="title" />
        <input type="text" placeholder="desc" name="desc" />
        <input type="text" placeholder="User ID" name="userId" />
        <input type="text" placeholder="Slug" name="slug" />
        <button>Add post</button>
      </form>
      <form action={deletePost}>
        <input type="text" placeholder="userId" name="userId" />
        <button>Delete Post</button>
      </form>
    </div>
  );
};
export default ServerAction;
