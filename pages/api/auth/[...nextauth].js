import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import {mongooseConnect} from "@/lib/mongoose";
import {User} from "@/models/User";
import bcrypt from "bcryptjs";
export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        await mongooseConnect()
        const user = await User.findOne({email});
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (passwordOk) {
          return user;
        }
        return null
      }
    })
  ],
  callbacks:{
    jwt: async ({ token, user }) =>{
      if (user) {
        token.uid = user;
      }
      return token
    },
    session: async ({ session, token }) => {
      session.userData = {
        isAdmin: token.uid.admin,
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
}

export const handler = NextAuth(authOptions);
export default handler
export { handler as GET, handler as POST };