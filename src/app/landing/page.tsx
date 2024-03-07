'use client'

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useWeb3Auth } from "@/client/web3auth";

const Landing = () => {
    
    const [accounts, setAccount] = useState(''); 
    const params = useParams<{slug:string}>

    const {
      provider,
      login,
      logout,
      account,
      getAccounts,
      chain,
    } = useWeb3Auth();



    const handleLogin = async () => {
      try {
        const fetchedAccount = await getAccounts();
        setAccount(fetchedAccount);
      } catch (error) {
        console.error('Error fetching accounts', error);
      }
    }

    const redirectUrl = account ? `/profile/${account}` : '#';

    const loggedInView = (
      <>
      
      <div className="flex-container">
        
     

        <button onClick={handleLogin} className='card'>
          <Link className='hover:underline' href={redirectUrl}>
            Login
          </Link>
        </button>
        
        <button onClick={getAccounts} className='card'>
          Get Accounts
        </button>
        
       
        
        <button onClick={logout} className='card'>
          Log Out
        </button>
                
        <div id="console" style={{ whiteSpace: "pre-line" }}>
          <p style={{ whiteSpace: "pre-line"}}></p>
        </div>

        {/* <div>
                <h2>User Accounts:</h2>
                <ul>
                {userAccounts && userAccounts.map((account, index) => (
                        <li key={index}>{account}</li>
                    ))}
                </ul>
        </div> */}
      
      </div>
      
      </>
    )

    const SignUp = async () => {
      await login();
      await getAccounts();
    };

    const unloggedInView = (
        <button onClick={SignUp} className='card'>
            Sign Up
        </button>
        
    );

    console.log(account)

  return (
    <>
      <section className="relative bg-black flex flex-col h-screen justify-center items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="text-center pb-12 md:pb-16">   

          <h1 className="text-5xl text-white md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" 
                data-aos="zoom-y-0ut"
          >   
            {/* It's Youtube, but {" "} */}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-400">
            Hearthfire</span>
          </h1>
        
        <div className='max-w-3xl mx-auto'>
            <p
              className="text-xl text-gray-400 mb-8"
              data-aos="zoom-y-out"
              data-aos-delay="150"
            >
            Plant a goal. Grow with it. Earn with it.
            </p>
        </div>

        <div className="grid">{provider ? loggedInView : unloggedInView}</div>
        
        
        

        </div>
        </div>
        </div>
    </section>

    
    </>
  )
  
  
  
}

export default Landing