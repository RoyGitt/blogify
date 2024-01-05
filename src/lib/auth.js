import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDb } from "./db";
import { User } from "./models";
import bcrypt from "bcrypt";

const login = async (credentials) => {
  const { email, password } = credentials;
  try {
    await connectDb();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid Credentials!");
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid Credentials!");
    }
    return user;
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to login!");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          console.log(error.message);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "github") {
        await connectDb();
        try {
          const user = await User.findOne({ img: profile.avatar_url });
          if (!user) {
            const generatedPassoword =
              Math.random.toString(36).slice(-4) +
              Math.random.toString(36).slice(-4);
            const hashedPassword = bcrypt.hashSync(generatedPassoword, 10);
            const newUser = await User({
              username: profile.login,
              email: profile?.email || "githubEmailnoaccess",
              password: hashedPassword,
              img: profile.avatar_url,
            });
            await newUser.save();
          }
        } catch (error) {
          console.log(error.message);
          return false;
        }
      }
      return true;
    },
  },
});

