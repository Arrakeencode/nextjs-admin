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
        // const user1 = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        const email = credentials?.email;
        const password = credentials?.password;

        await mongooseConnect()
        const user = await User.findOne({email});
        console.log(user)
        const passwordOk = user && bcrypt.compareSync(password, user.password);
        // if (user1) {
        //   return user1;
        // }
        if (passwordOk) {

          return user;
        }

        return null
      }
    })
  ],
  callbacks:{
    jwt: async ({ token, user }) =>{
      console.log(token)
      if (user) {
        token.uid = user;
      }

      return token
    },
    session: async ({ session, token }) => {
      // here we put session.useData and put inside it whatever you want to be in the session
      // here try to console.log(token) and see what it will have
      // sometimes the user get stored in token.uid.userData
      // sometimes the user data get stored in just token.uid
      session.userData = {
        isAdmin: token.uid.admin,

      }

      return session;
    },
  },
  session: {
    jwt: true, // Enable JSON Web Tokens for sessions
  },
}

export const handler = NextAuth(authOptions);
export default handler
export { handler as GET, handler as POST };