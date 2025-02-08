import Image from 'next/image'
import { ListingType } from '../types'


export const MediaSection = ({
    data
}:{
    data:ListingType
}
) => {
    if(!data) return
  return (
       <div className=' relative w-full grid lg:grid-cols-4 h-full
                  md:grid-cols-4 grid-cols-3 gap-x-2.5 gap-y-2 row-span-7'>
                    
                        {data.videoUrl?(
                          <>
                                <div className=' col-span-2 relative row-span-4'>
                          <video src={data.videoUrl} controls className='relative rounded-lg'/>
                       </div>
                       {data.images.slice(0,2).map((img)=>(
                          <div
                           key={img.url}
                            className=' col-span-1 md:col-span-2 row-span-2 relative'
                          >
                             <Image
                               fill
                               className=' bg-cover bg-center'
                               alt='Image'
                               src={img.url}
                               />
                          </div>
                       ))}
                       {data.images.slice(2).map((img)=>(
                          <div
                           key={img.url}
                            className=' col-span-1 md:col-span-2 row-span-3 relative'
                          >
                             <Image
                               fill
                               className=' bg-cover bg-center'
                               alt='Image'
                               src={img.url}
                               />
                          </div>
                       ))}
                          </>
                       ):(
                           <>
                             {data.images.slice(0,2).map((img)=>(
                                 <div
                                  key={img.url}
                                  className=' col-span-2 row-span-2'
                                 >
                                  <Image
                               fill
                               className=' bg-cover bg-center'
                               alt='Image'
                               src={img.url}
                               />
                                 </div>
                             ))}
                             {data.images[2].url&&(
                                 <div
                                 key={data.images[2].url}
                                 className=' col-span-4 row-span-1'
                                >
                                 <Image
                              fill
                              className=' bg-contain bg-center'
                              alt='Image'
                              src={data.images[2].url}
                              />
                                </div>
                             )}
                                {data.images.slice(3).map((img)=>(
                                 <div
                                  key={img.url}
                                  className=' col-span-2 row-span-2'
                                 >
                                  <Image
                               fill
                               className=' bg-cover bg-center'
                               alt='Image'
                               src={img.url}
                               />
                                 </div>
                             ))}
                           </>
                       )}
                         
                 </div>
  )
}
