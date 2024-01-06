"use server";

import { NextResponse } from "next/server";
import { Message, Post, User } from "./models";
import { connectDb } from "./db";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import bcrypt from "bcrypt";

export const addPost = async (prevState, formData) => {
  const { title, desc, userId, slug } = Object.fromEntries(formData);
  try {
    connectDb();
    const newPost = await Post({ title, desc, userId, slug });
    await newPost.save();
    revalidatePath("/blog");
    revalidatePath("/admin");
    NextResponse.json(newPost);
  } catch (error) {
    return { error: "Failed to save new post!" };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectDb();
    await Post.findByIdAndDelete(id);
    revalidatePath("/blog");
    revalidatePath("/admin");
    NextResponse.json("Post deleted successfully");
  } catch (error) {
    return { error: "Failed to delete post!" };
  }
};

export const registerUser = async (prevState, formData) => {
  const { username, email, password, passwordRepeat } =
    Object.fromEntries(formData);
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
    return { success: true };
  } catch (error) {
    return { error: "Failed to register user!" };
  }
};

export const addUser = async (prevState, formData) => {
  const { username, email, password, passwordRepeat, isAdmin } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match!" };
  }

  try {
    await connectDb();

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return { error: "An user is already registered with that email id!" };
    }

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return { error: "An user is already registered with that username!" };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User({
      username,
      email,
      password: hashedPassword,
      isAdmin,
    });

    newUser.save();

    return { success: true };
  } catch (error) {
    return { error: "Failed to register user!" };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    await User.findByIdAndDelete(id);
    revalidatePath("/admin");
  } catch (error) {
    throw error;
  }
};

export const login = async (prevState, formData) => {
  const { email, password } = Object.fromEntries(formData);
  try {
    await signIn("credentials", { email, password });
  } catch (error) {
    if (error.message.includes("Credentials")) {
      return { error: "Invalid Credentials" };
    }
    throw error;
  }
};

export const handleGithubLogin = async () => {
  await signIn("github");
};

export const handleLogout = async () => {
  await signOut();
};

export const sendMessage = async (prevState, formData) => {
  const { name, email, phone, message } = Object.fromEntries(formData);

  try {
    await connectDb();

    const messageAlreadySent = await Message.findOne({ email });
    if (messageAlreadySent) {
      return {
        success: "Message already sent, kindly wait for it to be seen 😎",
      };
    }

    const newMessage = await Message({ name, email, phone, message });
    newMessage.save();
    return { success: "Successfully sent the message 😁" };
  } catch (error) {
    return { error: "Failed to send the message 🥲" };
  }
};
