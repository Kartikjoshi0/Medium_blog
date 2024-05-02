import { PrismaClient } from '@prisma/client'
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'email',
            credentials: {
                email: { label: "email", type: "text", placeholder: "abc@gamil.com", required: true },
                password: { label: "Password", type: "password", required: true },
                Name: { label: "Name", type: "text", required: true },
            },
            async authorize(credentials: any) {
                const hashedPassword=await bcrypt.hash(credentials.password,10);
                const existingUser = await prisma.user.findFirst({
                    where: {
                        email: credentials.email
                    }
                })
                if(existingUser){
                    const passwordValidation=await bcrypt.compare(credentials.password,existingUser.password)
                    if(passwordValidation){
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.Name,
                            email: existingUser.email
                        }
                    }
                    return null;
            }
            try {
                const user=prisma.user.create({
                    data: {
                        email: credentials.email,
                        password: hashedPassword,
                        Name: credentials.Name,
                    }
                });
                return {
                    id: (await user).id.toString(),
                    Name: (await user).Name,
                    email: (await user).email
                }
                
            } catch (e) {
                console.log("this is the error",e);
                
            }
            return null
            
        },
        })
    ],
    secret: process.env.JWT_SECRET|| "test",
    callbacks: {
        async session({token,session}: any){
            session.user.id=token.sub
            return session
        }
    }
}