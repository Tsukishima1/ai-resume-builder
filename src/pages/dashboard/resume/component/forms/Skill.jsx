import React, { useState, useContext } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useEffect } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/styles.css'
import { apiUpdateResume } from '@/api/resume'
import { useParams } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

const Formfield = {
    name: '',
    rating: 0
}

export const Skill = () => {
    const params = useParams()
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [skillList, setSkillList] = useState(resumeInfo?.skills.length > 1 ? resumeInfo?.skills : [Formfield])
    skillList.forEach(item => {
        delete item.id;
        delete item.userResumeId;
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (index, key, e) => {
        const values = [...skillList]
        values[index] = {
            ...values[index],
            [key]: e
        }
        setSkillList(values)
    }

    const AddNewSkill = () => {
        setSkillList([...skillList, Formfield])
    }

    const RemoveSkill = () => {
        const values = [...skillList]
        values.pop()
        setSkillList(values)
    }

    const onSave = async () => {
        console.log('Skill List:', skillList)
        setLoading(true)

        const resumeData = {
            resumeId: params.resumeId,
            skill: skillList
        }

        try {
            const result = await apiUpdateResume(resumeData);
            console.log('Updated Resume:', result);
            toast("该部分更新成功~ 🎉")
        }
        catch (error) {
            console.error('Failed to update resume:', error);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setResumeInfo({ ...resumeInfo, skills: skillList })
    }, [skillList])

    return (
        <div className='p-5 shadow-md rounded-lg border-t-primary border-t-8 mt-8'>
            <h2 className='font-bold text-lg'>个人技能</h2>
            <p className='text-muted-foreground mb-3'>最后请编辑您的个人技能掌握情况！</p>
            <div className='flex flex-col gap-2'>
                {skillList.map((skill, index) => (
                    <div className='flex justify-between border rounded-lg p-2 items-center' key={index}>
                        <div>
                            <label className="text-xs text-muted-foreground">技能名称</label>
                            <Input
                                onChange={(e) => { handleChange(index, 'name', e.target.value) }}
                                className="mt-1"
                                defaultValue={resumeInfo?.skills[index]?.name} />
                        </div>
                        <Rating
                            value={skill.rating} onChange={(v) => { handleChange(index, 'rating', v) }}
                            style={{ maxWidth: 130 }}
                            defaultValue={resumeInfo?.skills[index]?.rating}
                        />
                    </div>
                ))}
            </div>
            <div className='flex justify-between mt-3'>
                <div className='flex gap-2'>
                    <Button onClick={AddNewSkill} variant="outline"> + 添加更多专业技能</Button>
                    {
                        skillList.length > 1 && <Button onClick={RemoveSkill} variant="outline"> - 移除最后一条</Button>
                    }
                </div>
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin w-5 h-5' /> : '保存'}
                </Button>
            </div>
        </div>
    )
}
