import { connectDb } from "./db";
import { Post, User } from "./models";
import { unstable_noStore } from "next/cache";

export const getPosts = async () => {
  try {
    await connectDb();
    const posts = await Post.find();
    return posts;
  } catch (error) {
    console.log(error.message);
    console.log("Failed to fetch posts");
  }
};

export const getPost = async (slug) => {
  try {
    await connectDb();
    return await Post.findOne({ slug });
  } catch (error) {
    console.log(error.message);
    console.log("Failed to fetch post");
  }
};

export const getUsers = async (id) => {
  unstable_noStore();
  try {
    await connectDb();
    return await User.find();
  } catch (error) {
    console.log(error.message);
    console.log("Failed to fetch the users");
  }
};

export const getUser = async (id) => {
  try {
    await connectDb();
    return await User.findById(id);
  } catch (error) {
    console.log(error.message);
    console.log("Failed to fetch the user");
  }
};
