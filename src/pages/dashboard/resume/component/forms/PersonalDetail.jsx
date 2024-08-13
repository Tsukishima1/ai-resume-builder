import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useContext, useEffect, useState } from 'react'
import { apiUpdateResume } from '@/api/resume'
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { toast } from "sonner"

export const PersonalDetail = ({enableNext}) => {
    const params = useParams();

    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(false);
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const handleInputChange = (e) => {
        enableNext(false)
        const {name,value} = e.target

        setFormData({
            ...formData,
            [name]: value
        })

        setResumeInfo({
            ...resumeInfo,
            [name]: value
        })
    }
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
            toast("个人信息已保存~ 🎉")
        }
        catch (error) {
            console.error('Failed to update resume:', error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className='p-5 shadow-md rounded-lg border-t-primary border-t-8 mt-8'>
            <h2 className='font-bold text-lg'>Personal Detail</h2>
            <p className='text-muted-foreground'>Get Started with the basic information</p>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label className='text-sm text-muted-foreground'>First Name</label>
                        <Input name='firstName' defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} className='mt-1'/>
                    </div>
                    <div>
                        <label className='text-sm text-muted-foreground'>Last Name</label>
                        <Input name='lastName' defaultValue={resumeInfo?.lastName} required onChange={handleInputChange} className='mt-1'/>
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm text-muted-foreground'>Job Title</label>
                        <Input name='jobTitle' defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} className='mt-1'/>
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm text-muted-foreground'>Address</label>
                        <Input name='address' defaultValue={resumeInfo?.address} required onChange={handleInputChange} className='mt-1'/>
                    </div>
                    <div className=''>
                        <label className='text-sm text-muted-foreground'>Phone</label>
                        <Input name='phone' defaultValue={resumeInfo?.phone} required onChange={handleInputChange} className='mt-1'/>
                    </div>
                    <div className=''>
                        <label className='text-sm text-muted-foreground'>Email</label>
                        <Input name='email' defaultValue={resumeInfo?.email} required onChange={handleInputChange} className='mt-1'/>
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <Button disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin w-5 h-5' /> : 'Save'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
