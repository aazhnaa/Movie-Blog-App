import React from 'react'
const Popup = ({children,onClose}) => {
  return (
    <>
      <div className='backdrop fixed top-0 left-0 w-[100%] h-[100vh] bg-[rgba(0,0,0,0.75)] z-[9] ' onClick={onClose}>
      </div>
      <dialog className='bg-gray-100 fixed top-[34%] z-10 p-8 rounded-md border-none  w-[30%]' open>
        {children}
      </dialog>
    </>
  )
}

export default Popup
