import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: '/((?!_next/static|_next/image|favicon.ico|login).*)',
}

const publicRoutes = ['/login']

export function middleware(req: NextRequest){
    const pathname = req.nextUrl.pathname
    const token = req.cookies.get('token')?.value;


    if(publicRoutes.includes(pathname)) {
        return NextResponse.next()
    }
    
    if(!token){
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
}