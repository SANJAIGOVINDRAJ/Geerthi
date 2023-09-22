import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthSelection = () => {
  return (
    <div className="flex flex-col max-w-[100vw] min-h-[100vh] items-center justify-center relative ">
    <div className=" absolute p-10 bg-slate-600 w-full px-20 flex items-center shadow-xl justify-center top-0  ">
        <p className=' text-4xl font-bold text-slate-100 '>Bishop Heber College (Autonomous)</p>
    </div>
    <Outlet />
  </div>
  )
}

export default AuthSelection