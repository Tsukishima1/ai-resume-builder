import { MoreVertical } from 'lucide-react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function ResumeCardItem({ resume }) {
    return (
        <div className='relative hover:scale-105 transition-all flex flex-col itemcen'>
            <Link to={'/dashboard/resume/' + resume.resumeId + '/edit'}>
                <div className="cursor-pointer p-14 bg-neutral-200 flex items-center justify-center h-[280px] rounded-lg hover:shadow-sm bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 border-t-4 border-violet-300">
                    <img src="/cv.png" width={80} height={80} />
                </div>
            </Link>
            <div className='bg-violet-300 mx-4 py-2 rounded-b-xl'>
                <h2 className="text-center text-white">{resume.title}</h2>
            </div>
            <div className='absolute right-2 top-4'>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreVertical className='text-violet-400 cursor-pointer' />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </div>
    )
}

ResumeCardItem.propTypes = {
    resume: PropTypes.shape({
        id: PropTypes.string.isRequired,
        resumeId: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    })
}

export default ResumeCardItem