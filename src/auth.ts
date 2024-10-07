import NextAuth from "next-auth";
import NextAuthConfig from "next-auth";
import GitHubProvider from "next-auth/providers/github";

interface Profile {
  login?: string;
}

const authOptions: NextAuthConfig = {
  callbacks: {
    async signIn({ profile }: { profile: Profile }) {
      // Change this to your username
      return profile?.login === "tchrlton";
    },
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  basePath: "/api/auth",
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);