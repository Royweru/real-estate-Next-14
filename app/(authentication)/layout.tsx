

const AuthLayout = ({
    children
}:{
    children:React.ReactNode
}) => {
  return (
    <div className=' w-full min-h-screen flex justify-center items-center bg-gradient-to-tl from-sky-200 via-blue-100 to-sky-400'>
      {children}
    </div>
  )
}

export default AuthLayout