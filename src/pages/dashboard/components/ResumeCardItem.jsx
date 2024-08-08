import { Notebook } from "lucide-react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

function ResumeCardItem({ resume }) {
    return (
        <Link to={'/dashboard/resume/' + resume.resumeId + '/edit'}>
            <div className="cursor-pointer p-14 bg-neutral-200 flex items-center justify-center h-[280px] rounded-lg hover:scale-105 transition-all hover:shadow-sm">
                <Notebook />
            </div>
            <h2 className="text-center my-3 text-muted-foreground">{resume.title}</h2>
        </Link>
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