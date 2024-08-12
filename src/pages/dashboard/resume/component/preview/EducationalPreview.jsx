import React from 'react'

export const EducationalPreview = ({resumeInfo}) => {
  return (
    <div>
        <h2 className="text-center font-bold text-sm" style={{
            color: resumeInfo?.themeColor
        }}
        >Educational Qualifications</h2>
        <hr className="my-3" style={{
            borderColor: resumeInfo?.themeColor
        }}/>
    
        {resumeInfo?.education.map((edu, index) => (
            <div key={index} className="mb-2">
            <h2 className="text-sm font-bold" style={{
                color: resumeInfo?.themeColor
            }}>{edu?.universityName}</h2>
            <h2 className="text-xs flex justify-between text-muted-foreground">
                {edu.degree} in {edu?.major}
                <span className="text-xs">{edu?.startDate} - {edu?.endDate}</span>
            </h2>
            <p className="text-xs mt-2">{edu?.description}</p>
            </div>
            ))
        }
    </div>
  )
}
