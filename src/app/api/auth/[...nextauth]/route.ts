import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "email" },
        senha: { label: "senha", type: "senha" }
      },
      async authorize(credentials) {
        const res = await fetch('https://bumpy-unicorn-brunogianini-8376417b.koyeb.app/login', {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) return null;
        const data = await res.json();

        if (data && data.token) {
          // Decodifica o JWT para pegar o id
          const decoded: any = jwtDecode(data.token);
          return {
            id: decoded.id,
            email: decoded.email,
            token: data.token
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user?.token) {
        token.accessToken = user.token;
        // Decodifica o JWT para pegar o id
        const decoded: any = jwtDecode(user.token);
        token.userId = decoded.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      session.user = {
        ...session.user,
        id: token?.id,
        email: token?.email || session.user?.email,
      };
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }