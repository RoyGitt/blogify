import { connectDb } from "@/lib/db";
import { Post } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    connectDb();
    const { slug } = params;
    const post = await Post.findOne({ slug });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error.message);
  }
};
