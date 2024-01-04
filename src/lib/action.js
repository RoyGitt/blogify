"use server";

import { NextResponse } from "next/server";
import { Post } from "./models";
import { connectDb } from "./db";
import { revalidatePath } from "next/cache";

export const addPost = async (formData) => {
  const { title, desc, userId, slug } = Object.fromEntries(formData);
  try {
    connectDb();
    console.log(title, desc, userId, slug);
    const newPost = await Post({ title, desc, userId, slug });
    await newPost.save();
    revalidatePath("/blog");
    NextResponse.json(newPost);
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = async (formData) => {
  const { userId } = Object.fromEntries(formData);
  console.log(userId);
  try {
    connectDb();
    await Post.findOneAndDelete({ userId });
    revalidatePath("/blog");
    NextResponse.json("Post deleted successfully");
  } catch (error) {
    console.log(error.message);
  }
};
