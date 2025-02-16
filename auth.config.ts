import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import bcrypt from 'bcryptjs'
import { getUserByEmail } from "./lib/getUser";
import { LoginSchema } from "./features/auth/schemas";

// Notice this is only an object, not a full Auth.js instance

export default {
  providers: [
    
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.hashedPwd) return null;
      
          const confirmPwd = await bcrypt.compare(password,user.hashedPwd)

          if(confirmPwd){
            return user
          }
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig;
