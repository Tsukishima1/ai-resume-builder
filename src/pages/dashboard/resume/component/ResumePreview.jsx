import { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { PersonalDetailPreview } from "./preview/PersonalDetailPreview";
import { SummaryPreview } from "./preview/SummaryPreview";
import { ExperiencePreview } from "./preview/ExperiencePreview";
import { EducationalPreview } from "./preview/EducationalPreview";
import { SkillsPreview } from "./preview/SkillsPreview";

export const ResumePreview = () => {
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
 
  return (
    <div className="shadow-md h-full p-14 border-t-[20px] rounded-lg cursor-default" 
    style={{
        borderColor: resumeInfo?.themeColor
    }}>
        {/* Personal Detail */}
            <PersonalDetailPreview resumeInfo={resumeInfo}/>
        {/* Summary */}
            <SummaryPreview resumeInfo={resumeInfo}/>
        {/* Professional Experience */}
            <ExperiencePreview resumeInfo={resumeInfo}/>
        {/* Educational */}
            <EducationalPreview resumeInfo={resumeInfo}/>
        {/* Skills */}
            <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}
