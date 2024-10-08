import React from 'react'

export const SkillsPreview = ({resumeInfo}) => {
  return (
    <div>
        <h2 className="text-center font-bold text-sm" style={{
            color: resumeInfo?.themeColor
        }}
        >个人技能</h2>
        <hr className="my-3" style={{
            borderColor: resumeInfo?.themeColor
        }}/>
    
        <div className='grid grid-cols-2 gap-3 my-4 mb-10'>
            {resumeInfo?.skills.map((skill, index) => (
                <div key={index} className="mb-2 flex items-center justify-between">
                    <h2 className="text-md font-bold" style={{
                        color: resumeInfo?.themeColor
                    }}>{skill?.name}</h2>
                    {
                        skill?.rating ? <div className='h-2 bg-gray-200 w-[120px] rounded-sm'>
                        <div className='h-2 rounded-sm' style={{
                            width: skill?.rating*20+'%',
                            backgroundColor: resumeInfo?.themeColor
                        }}></div>
                    </div> : null
                    }
                    
                </div>
            ))}
        </div>
    </div>
  )
}
