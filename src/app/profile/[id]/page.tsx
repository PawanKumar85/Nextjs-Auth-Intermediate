import React from 'react'

const page = ({ params }: any) => {
  return (
    <>
      <div className='flex flex-col gap-3'>
        <h1 className='text-center'>Page</h1>
        <p className='text-4xl'>Profile page
          <span className='p-2 bg-orange-500 text-black rounded ml-2'>{params.id}</span>
        </p>
      </div>
    </>
  )
}

export default page