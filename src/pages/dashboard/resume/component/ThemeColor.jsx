import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { LayoutGrid } from "lucide-react"
import { useContext, useState } from "react"
import { ResumeInfoContext } from "@/context/ResumeInfoContext"
import { apiUpdateResume } from "@/api/resume"
import { cn } from "@/lib/utils"
import { useParams } from "react-router-dom"

const ThemeColor = () => {
    const colors = [
        // 彩虹渐变色，拆分多个
        "#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3", "#171717"
    ]

    const { resumeId } = useParams();
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const [selectedColor, setSelectedColor] = useState(resumeInfo?.themeColor);

    const onColorSelect = async (color) => {
        setSelectedColor(color);
        setResumeInfo({
            ...resumeInfo,
            themeColor: color
        }) 

        const resumeData = {
            resumeId: resumeId,
            themeColor: color
        }

        try {
            const result = await apiUpdateResume(resumeData)
            console.log('Updated resume:', result)
        }
        catch (error) {
            console.error('Failed to update resume:', error)
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                    <LayoutGrid size={18} />
                    主题色
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="text-sm text-muted-foreground text-center mb-2">选择你的简历主题颜色</div>
                <div className="flex flex-wrap">
                    {colors.map((color, index) => (
                        <div
                            onClick={() => onColorSelect(color)}
                            key={index}
                            className={cn("w-5 h-5 rounded-full m-1 cursor-pointer hover:ring-2 ring-primary ring-opacity-50",
                                selectedColor === color&&"ring-2"
                            )}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ThemeColor