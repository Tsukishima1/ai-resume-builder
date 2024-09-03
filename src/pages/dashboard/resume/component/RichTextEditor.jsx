import React, { useState, useContext } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
import { toast } from 'sonner'
import { apiGenerateSummary } from '@/api/generate-summary'

const PROMPT = '职位名称：{positionTitle}，给出三到五句工作内容简述，句子前不要加序号，使用换行符隔开'

export const RichTextEditor = ({ onRichTextEditorChange, index }) => { // 为什么这里要加{}而不是直接写参数名？ 因为这里是解构赋值，如果直接写参数名，那么在调用这个组件的时候，就必须要传入一个对象，而不是直接传入一个值
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [value, setValue] = useState()

    const handleGernerateSummary = async () => {
        if(!resumeInfo.experience[index].title) {
            toast.error('Please enter the position title first')
            return
        }
        const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);

        try {
            const response = await apiGenerateSummary(prompt)
            setValue(response)
        }
        catch (error) {
            console.error('Failed to generate summary:', error)
        }
    }

    return (
        <div>
            <div className='flex justify-between my-2 items-center'>
                <label className='text-sm text-muted-foreground'>Summary</label>
                <Button className="border-neutral-400 text-primary border-2 text-neutral-500 focus-visible:text-sm" 
                    size="sm" variant="outline"
                    type="button"
                    disabled={loading}
                    onClick={handleGernerateSummary}
                >
                    <Brain className="w-4 mr-1" />
                    Generate from AI
                </Button>
            </div>
            <EditorProvider>
                <Editor value={value} 
                onChange={(e) => {
                    setValue(e.target.value)
                    onRichTextEditorChange(e)
                }}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}
