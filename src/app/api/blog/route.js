import { connectDb } from "@/lib/db";
import { Post } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    connectDb();
    const posts = await Post.find();
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error.message);
  }
};
