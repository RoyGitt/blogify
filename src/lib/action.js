"use server";

import { NextResponse } from "next/server";
import { Post, User } from "./models";
import { connectDb } from "./db";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import bcrypt from "bcrypt";

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

export const registerUser = async (prevState, formData) => {
  const { username, email, password, passwordRepeat } =
    Object.fromEntries(formData);
  console.log(username, email, password, passwordRepeat);
  if (password !== passwordRepeat) {
    return { error: "Passwords do not match!" };
  }

  try {
    await connectDb();
    const user = await User.findOne({ email });
    if (user) {
      return { error: "An user is already registered with that email id!" };
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User({
      username,
      email,
      password: hashedPassword,
    });
    newUser.save();
  } catch (error) {
    console.log(error.message);
    return { error: "Failed to register user!" };
  }
};

export const login = async (prevState, formData) => {
  const { email, password } = Object.fromEntries(formData);
  try {
    await signIn("credentials", { email, password });
  } catch (error) {
    console.log(error.message);
    if (error.message.includes("Credentials")) {
      return { error: "Invalid Credentials" };
    }
    return { error: "Failed to login" };
  }
};

export const handleGithubLogin = async () => {
  await signIn("github");
};

export const handleLogout = async () => {
  await signOut();
};
