import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { useUser,UserButton } from '@clerk/clerk-react'

function Header() {
    const { user, isSignedIn } = useUser();

    return (
        <div className='p-3 px-5 flex justify-between shadow-sm md:px-20 lg:px-32 my-3'>
            <img src="/logo.svg" width={80} alt="" />

            {isSignedIn ?
                <div className='flex items-center gap-5'>
                    <Link to="/dashboard">
                        <Button variant="outline">仪表盘</Button>
                    </Link>
                    <UserButton/>
                </div>
                :
                <Link to="/auth/sign-in">
                    <Button>立即开始</Button>
                </Link>
            }
        </div>
    )
}

export default Header