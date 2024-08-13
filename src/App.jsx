import './App.css'
import { Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import Header from './components/custom/Header';
import { Toaster } from './components/ui/sonner';

function App() {
  const {user,isLoaded,isSignedIn} = useUser();

  if(!isSignedIn&&isLoaded){
    return <Navigate to={'/auth/sign-in'} /> // 如果用户未登录，重定向到登录页面
  }

  return (
    <>
      <Header />
      <Outlet /> 
      <Toaster />
    </>
  )
}

export default App
