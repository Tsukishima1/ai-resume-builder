import { Button } from "@/components/ui/button"
import { PersonalDetail } from "./forms/PersonalDetail"
import { Summary } from "./forms/Summary"
import { Experience } from "./forms/Experience"
import { Education } from "./forms/Education"
import { Skill } from "./forms/Skill"
import { ArrowRight, LayoutGrid, ArrowLeft, Home } from "lucide-react"
import { useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import ViewResume from "@/pages/my-resume/[resumeId]/view"

export const FromSection = () => {
  const params = useParams();
  const [activeFormIndex, setActiveFormIndex] = useState(1); // 当前表单的索引，用于控制显示哪个表单
  const [enableNext, setEnableNext] = useState(true); // 是否启用下一个按钮

  const handleNext = () => {
    setActiveFormIndex(prevIndex=>prevIndex+1);
  }

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Link to="/dashboard">
            <Button><Home size={18}/></Button>
          </Link>
          <Button variant="outline" className="flex gap-2"><LayoutGrid size={18}/> 主题色</Button>
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && 
          <Button className="flex gap-2" size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex - 1)}
          >
            <ArrowLeft className="w-5"/>
          </Button>}
          <Button className="flex gap-2" size="sm"
            onClick={() => {setActiveFormIndex(activeFormIndex + 1);}}
            disabled={!enableNext}
          >
            下一步 <ArrowRight className="w-5"/>
          </Button>
        </div>
      </div>
      {/* Personal Detail */}
      {activeFormIndex === 1 ? <PersonalDetail enableNext={(v)=>setEnableNext(v)} toNext={handleNext}/> : null}
      {/* Summery */}
      {activeFormIndex === 2 ? <Summary enableNext={(v)=>setEnableNext(v)} toNext={handleNext}/> : null}
      {/* Experience */}
      {activeFormIndex === 3 ? <Experience enableNext={(v)=>setEnableNext(v)} toNext={handleNext}/> : null}
      {/* Educational Detail */}
      {activeFormIndex === 4 ? <Education enableNext={(v)=>setEnableNext(v)} toNext={handleNext}/> : null}
      {/* Skills */}
      {activeFormIndex === 5 ? <Skill /> : null}
      {activeFormIndex === 6 ? <Navigate to={"/my-resume/"+params.resumeId+"/view"}/> : null}
    </div>
  )
}
