import React from 'react'

export const BlogsSection = () => {
  return (
 
    <div className="blog-container py-6 md:py-8 lg:py-10 dark:bg-gray-700 transition duration-500">
      {/* <div className="relative max-w-5xl lg:mx-auto mx-2">
        <div className="breadcrumb text-sm text-gray-900 font-normal flex flex-row space-x-2 my-2 dark:text-gray-50">
          <a href="#">Blogs</a>
          <p></p>
          <a href="#">✌️ Technical Blog For Developers</a>
        </div>
        <div className="relative blog-header-image rounded-lg shadow-lg overflow-hidden h-48 object-cover">
          <img src="https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80" className="object-cover" alt="headerImage" />
        </div>
        <span aria-label="emoji" className="absolute left-1/2 -bottom-5 text-6xl z-10" >🍁</span>
      </div> */}
      <div className="max-w-5xl mx-auto">
        <h1 className="text-center text-2xl font-bold text-text-darkblue md:text-4xl mt-4 lg:mt-6 dark:text-gray-50">Be in the know</h1>
      {/*Blog card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 md:mt-14 lg:mt-16">
          <div className="blog-card flex flex-col items-center md:items-start cursor-pointer">
            <div className="img-container rounded-md overflow-hidden w-3/4 sm:w-1/2 mx-auto md:w-full lg:h-48">
              <img src="https://plus.unsplash.com/premium_photo-1664266386277-2789b93c8b53?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmVhdXRpZnVsJTIwYXBhcnRtZW50c3xlbnwwfHwwfHx8MA%3D%3D" className="object-cover" alt="headerImage" />
            </div>
            <h1 className="mt-4 text-xl font-semibold dark:text-gray-50"> The Dos and Don’ts of Apartment Hunting</h1>
            <p className="my-4 text-sm font-light max-w-md dark:text-gray-50">📌 Looking for an apartment? Avoid common pitfalls and learn the key factors to consider before signing a lease.....</p>
            <small className="text-gray-500 dark:text-gray-50">June 10th, 2021</small>
          </div>
    
          <div className="blog-card flex flex-col items-center md:items-start cursor-pointer">
            <div className="img-container rounded-md overflow-hidden w-3/4 sm:w-1/2 mx-auto md:w-full lg:h-48">
              <img src="https://plus.unsplash.com/premium_photo-1661754912055-05f3dfa8c48e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="object-cover" alt="headerImage" />
            </div>
            <h1 className="mt-4 text-xl font-semibold dark:text-gray-50">What You Need to Know About Rental Agreements Before Signing</h1>
            <p className="my-4 text-sm font-light max-w-md dark:text-gray-50">Understanding lease agreements is crucial to avoid unexpected surprises. Learn what to look for and how to negotiate terms ...</p>
            <small className="text-gray-500 dark:text-gray-50">May 17th, 2021</small>
          </div>
    
          <div className="blog-card flex flex-col items-center md:items-start cursor-pointer">
            <div className="img-container rounded-md overflow-hidden w-3/4 sm:w-1/2 mx-auto md:w-full lg:h-48">
              <img src="https://images.unsplash.com/photo-1734417511653-252ab0709e32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="object-cover" alt="headerImage" />
            </div>
            <h1 className="mt-4 text-xl font-semibold dark:text-gray-50"> How to Sell Your Home Fast (and for the Best Price!)</h1>
            <p className="my-4 text-sm font-light max-w-md dark:text-gray-50">📌 Want to sell your home quickly and maximize your profit? These proven strategies will help you attract buyers....</p>
            <small className="text-gray-500 dark:text-gray-50">May 17th, 2021</small>
          </div>
        </div>
        <div className=' w-full flex justify-end mt-2'>
            <a href="/blog">
                <p className=' text-blue-capri hover:underline text-sm font-normal'>
                    Read more ....
                </p>
            </a>
        </div>
      </div>
    </div>
  )
}
