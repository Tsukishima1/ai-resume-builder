import { Button } from "@/components/ui/button"
import { PersonalDetail } from "./forms/PersonalDetail"
import { Summary } from "./forms/Summary"
import { Experience } from "./forms/Experience"
import { Education } from "./forms/Education"
import { Skill } from "./forms/Skill"
import { ArrowRight, LayoutGrid, ArrowLeft } from "lucide-react"
import { useState } from "react"

export const FromSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(5); // 当前表单的索引，用于控制显示哪个表单
  const [enableNext, setEnableNext] = useState(false); // 是否启用下一个按钮
  const [enablePrev, setEnablePrev] = useState(false); // 是否启用上一个按钮

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" className="flex gap-2"><LayoutGrid className="w-5"/> 主题色</Button>
        <div className="flex gap-2">
          {activeFormIndex > 1 && 
          <Button className="flex gap-2" size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex - 1)}
          >
            <ArrowLeft className="w-5"/>
          </Button>}
          <Button className="flex gap-2" size="sm"
            onClick={() => {setActiveFormIndex(activeFormIndex + 1); setEnableNext(false);}}
            disabled={!enableNext}
          >
            下一步 <ArrowRight className="w-5"/>
          </Button>
        </div>
      </div>
      {/* Personal Detail */}
      {activeFormIndex === 1 ? <PersonalDetail enableNext={(v)=>setEnableNext(v)} /> : null}
      {/* Summery */}
      {activeFormIndex === 2 ? <Summary enableNext={(v)=>setEnableNext(v)} /> : null}
      {/* Experience */}
      {activeFormIndex === 3 ? <Experience enableNext={(v)=>setEnableNext(v)} /> : null}
      {/* Educational Detail */}
      {activeFormIndex === 4 ? <Education enableNext={(v)=>setEnableNext(v)} /> : null}
      {/* Skills */}
      {activeFormIndex === 5 ? <Skill /> : null}
    </div>
  )
}
