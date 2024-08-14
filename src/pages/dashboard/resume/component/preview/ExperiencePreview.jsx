export const ExperiencePreview = ({resumeInfo}) => {
  return (
    <div className="my-4">
      <h2 className="text-center font-bold text-sm" style={{
        color: resumeInfo?.themeColor
      }}
      >Professional Experience</h2>
      <hr className="my-3" style={{
        borderColor: resumeInfo?.themeColor
      }}/>

      {resumeInfo?.experience.map((exp, index) => (
        <div key={index} className="mb-2">
          <h2 className="text-sm font-bold" style={{
            color: resumeInfo?.themeColor
          }}>{exp?.title}</h2>
          <h2 className="text-xs flex justify-between text-muted-foreground">
            {exp.companyName}, {exp?.location}
          <span className="text-xs">{exp.startDate} - {exp?.endDate}</span>
          </h2>
          <p className="text-xs mt-2">{exp.workSummary}</p>
        </div>
        ))  
      }
    </div>
  )
}
