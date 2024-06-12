'use client'
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from "react";
import { useSession, signIn, signOut } from 'next-auth/react';
export default function Home(){

    const { data: session, status } = useSession();
    console.log(useSession())
    const router = useRouter();  
    useEffect(() => {
        if (status === 'unauthenticated') {
          console.log("------------google---------------")
          signIn('google')
          // redirect('http://localhost:3000/saveaudience')
        }
      }, [status, router]);
    
      if (status === 'loading') {
        return <p>Loading...</p>;
      }

  return (
    
   <div>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
    {/* <Link href='/api/auth/signin'>Sign In With Google</Link> */}
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <h3 className="navbar-brand" href="#">Sneakers Stop</h3>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarText">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <a className="nav-link" href="#" style={{paddingLeft:250}}>Add new Order <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#" style={{paddingLeft:50}}>Add new Product</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#" style={{paddingLeft:50}}>Add new Customer</a>
      </li>
    </ul>
    <Link href='/saveaudience' className="navbar-brand" style={{marginRight:60, fontSize:15}}>
      Send Campaigns
    </Link>
  </div>
</nav>
{session ? (
        <><div style={{marginLeft:60,marginTop:20}}>
          <p>   Welcome <br/><img style={{borderRadius:200,}} src={session.user.image}/><br/>{session.user.name}</p>

          <button onClick={() => signOut()}>Sign out</button>
          </div>
        </>
      ) : (
        <p>Redirecting to sign in...</p>
      )}
   </div>
  );
}
