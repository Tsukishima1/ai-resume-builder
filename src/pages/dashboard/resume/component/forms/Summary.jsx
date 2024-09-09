import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Brain, LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { apiUpdateResume } from '@/api/resume'
import { apiGenerateSummary } from '@/api/generate-summary'
import { useParams } from 'react-router-dom'
import { toast } from "sonner"

const PROMPT = '生成三到五句简历摘要，一段话即可，职业是：{jobTitle}'

export const Summary = ({ enableNext, toNext }) => {
    const params = useParams()
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [summary, setSummary] = useState('')
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState()

    useEffect(() => {
        setFormData({
            ...formData,
            summary: summary
        })

        summary && setResumeInfo({ // summary不为空时，更新resumeInfo
            ...resumeInfo,
            summary: summary
        })
    }, [summary])

    const onSave = async (e) => {
        e.preventDefault()
        setLoading(true)

        // 传入resumeid和表单数据
        const resumeData = {
            resumeId: params.resumeId,
            ...formData
        }

        try {
            const result = await apiUpdateResume(resumeData)
            console.log('Updated resume:', result)
            enableNext(true)
            toast("简历已更新~ 🎉")
            toNext();
        }
        catch (error) {
            console.error('Failed to update resume:', error)
        }
        finally {
            setLoading(false)
        }
    }

    const handleGernerateSummary = async () => {
        if (!resumeInfo?.jobTitle) {
            toast.error('Please enter the job title first')
            return
        }
        const prompt = PROMPT.replace('{jobTitle}', resumeInfo?.jobTitle)
        setLoading(true)
        try {
            const response = await apiGenerateSummary(prompt)
            console.log('response:', response)
            setSummary(response)
        }
        catch (error) {
            console.error('Failed to generate summary:', error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className='p-5 shadow-md rounded-lg border-t-primary border-t-8 mt-8'>
                <h2 className='font-bold text-lg'>简历摘要</h2>
                <p className='text-muted-foreground'>现在完成一份你的简历摘要！</p>

                <form onSubmit={onSave}>
                    <div className='mt-6'>
                        <div className='justify-between flex items-end'>
                            <label>填写摘要内容</label>
                            <Button className="border-neutral-400 text-primary border-2 text-neutral-500 focus-visible:text-sm" size="sm" variant="outline"
                                type="button"
                                onClick={handleGernerateSummary}
                                disabled={loading}
                            >
                                <Brain className="w-4 mr-1" />
                                调用AI生成
                            </Button>
                        </div>
                    </div>
                    <Textarea className="mt-5" required onChange={(e) => setSummary(e.target.value)} value={resumeInfo?.summary} />
                    <div className='mt-2 flex justify-end'>
                        <Button disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin w-5 h-5' /> : '保存'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
