import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { apiUpdateResume } from '@/api/resume'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const formField = {
  universityName: '',
  degree: '',
  major: '',
  startDate: '',
  endDate: '',
}

export const Education = ({ enableNext }) => {
  const params = useParams()
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [loading, setLoading] = useState(false)
  const [educationList, setEducationList] = useState([resumeInfo?.education[0] || formField])

  const AddNewEducation = () => {
    setEducationList([...educationList, formField])
  }

  const RemoveEducation = () => {
    const values = [...educationList]
    values.pop()
    setEducationList(values)
  }

  const handleChange = (index, event) => {
    enableNext(false)
    const values = [...educationList]
    values[index] = {
      ...values[index],
      [event.target.name]: event.target.value
    }
    setEducationList(values)
  }

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationList
    })
  }, [educationList])

  const onSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    const resumeData = {
      resumeId: params.resumeId,
      education: educationList
    }
    try {
      const result = await apiUpdateResume(resumeData);
      console.log('Updated Resume:', result);
      enableNext(true)
      toast("个人信息已保存~ 🎉")
    }
    catch (error) {
      console.error('Failed to update resume:', error);
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-5 shadow-md rounded-lg border-t-primary border-t-8 mt-8'>
      <h2 className='font-bold text-lg'>教育经历</h2>
      <p className='text-muted-foreground'>现在完成教育经历的填写！</p>

      <div>
        {educationList.map((education, index) => (
          <div key={index} className={index}>
            {educationList.length > 1 &&
              <>
                {index !== 0 && <hr className='border-t-2 mt-5' />}
                <h3 className='text-sm font-bold mt-5'>Education {index + 1}</h3>
              </>
            }
            <div className='grid grid-cols-2 mt-5 gap-3'>
              <div className='col-span-2'>
                <label className='text-sm text-muted-foreground'>学校名称</label>
                <Input
                  name="universityName"
                  defaultValue={resumeInfo?.education[index]?.universityName || ''}
                  onChange={(e) => handleChange(index, e)}
                  className="mt-1" />
              </div>
              <div className='col-span-1'>
                <label className='text-sm text-muted-foreground'>学历</label>
                <Input name="degree" defaultValue={resumeInfo?.education[index]?.degree || ''} onChange={(e) => handleChange(index, e)} className="mt-1" />
              </div>
              <div className='col-span-1'>
                <label className='text-sm text-muted-foreground'>专业</label>
                <Input name="major" defaultValue={resumeInfo?.education[index]?.major || ''} onChange={(e) => handleChange(index, e)} className="mt-1" />
              </div>
              <div className='col-span-1'>
                <label className='text-sm text-muted-foreground'>开学年份</label>
                <Input type="number" min="1950" max="2050" name="startDate" defaultValue={resumeInfo?.education[index]?.startDate || ''} onChange={(e) => handleChange(index, e)} className="mt-1" />
              </div>
              <div className='col-span-1'>
                <label className='text-sm text-muted-foreground'>结业年份</label>
                <Input type="number" min="1950" max="2050" name="endDate" defaultValue={resumeInfo?.education[index]?.endDate || ''} onChange={(e) => handleChange(index, e)} className="mt-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-between mt-5'>
        <div className='flex gap-2'>
          <Button onClick={AddNewEducation} variant="outline"> + 添加更多教育经历</Button>
          {
            educationList.length > 1 && <Button onClick={RemoveEducation} variant="outline"> - 移除最后一条</Button>
          }
        </div>
        <Button onClick={onSave}>
          {loading ? <LoaderCircle className='animate-spin w-5 h-5' /> : '保存'}
        </Button>
      </div>
    </div>
  )
}
