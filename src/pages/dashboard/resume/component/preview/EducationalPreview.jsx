import React from 'react'

export const EducationalPreview = ({ resumeInfo }) => {
    return (
        <div>
            <h2 className="text-center font-bold text-sm" style={{
                color: resumeInfo?.themeColor
            }}
            >教育背景</h2>
            <hr className="my-3" style={{
                borderColor: resumeInfo?.themeColor
            }} />

            {resumeInfo?.education.map((edu, index) => (
                <div key={index} className="mb-2 flex justify-between">
                    <div>
                        <h2 className="text-md font-bold" style={{
                            color: resumeInfo?.themeColor
                        }}>{edu?.universityName}</h2>
                        <h2 className="text-sm flex justify-between text-muted-foreground">
                            {edu.degree} {edu?.major}

                        </h2>
                    </div>
                    <div className="text-xs text-center flex items-center">
                        <p className='text-[1rem] text-muted-foreground font-bold' style={{color: resumeInfo?.themeColor}}>{edu?.startDate}{edu?.endDate && <>-</>}{edu?.endDate}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
