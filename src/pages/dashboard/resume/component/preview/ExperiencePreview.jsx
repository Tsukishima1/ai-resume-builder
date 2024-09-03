import { ArrowRight } from "lucide-react"

export const ExperiencePreview = ({resumeInfo}) => {
  return (
    <div className="my-4">
      <h2 className="text-center font-bold text-sm" style={{
        color: resumeInfo?.themeColor
      }}
      >工作经历</h2>
      <hr className="my-3" style={{
        borderColor: resumeInfo?.themeColor
      }}/>

      {resumeInfo?.experience.map((exp, index) => (
        <div key={index} className="mb-2 textcen">
          <h2 className="text-sm font-bold" style={{
            color: resumeInfo?.themeColor
          }}>{exp?.title}</h2>
          <h2 className="text-xs flex justify-between text-muted-foreground items-center">
            {exp.companyName}{exp.location&&<>,</>} {exp?.location}
          <span className="text-xs flex items-center">{exp.startDate} 
            {exp?.startDate && exp?.endDate && <ArrowRight className="w-3 mx-1" color={resumeInfo?.themeColor}/>} 
            {exp?.endDate}</span>
          </h2>
          {/* <p className="text-xs mt-2">{exp.workSummary}</p> */}
          <div className="text-xs mt-2 preview">
            <div dangerouslySetInnerHTML={{__html:exp?.workSummary}} >

            </div>
          </div>
        </div>
        ))  
      }
    </div>
  )
}
