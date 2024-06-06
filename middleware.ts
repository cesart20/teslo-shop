import { NextResponse, type NextFetchEvent, type NextRequest, URLPattern } from 'next/server'
import { jwt } from './utils';



 
// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest, ev: NextFetchEvent) {

  let token = req.cookies.get('token');

  console.log(token);


  try {
    await jwt.isValidToken(token?.value !);
    return NextResponse.next();
  } catch (error) {
    const requestedPage = req.nextUrl.pathname;
    // requestedPage.pathname = 'http://localhost:3000/auth/login?p=/checkout/address';
    console.log("requestedPage: ", requestedPage);
    
    // return NextResponse.rewrite(`/auth/login?p=${requestedPage}`);
    // return NextResponse.rewrite(requestedPage)

    console.log(req.url);
    
  }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/checkout/address', '/checkout/summary'],
}