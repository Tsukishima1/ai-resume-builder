import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useContext, useState } from 'react'
import { apiUpdateResume } from '@/api/resume'
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { toast } from "sonner"

export const PersonalDetail = ({enableNext, toNext}) => {
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

        console.log(formData);

        try {
            const result = await apiUpdateResume(resumeData)
            console.log('Updated resume:', result)
            enableNext(true)
            toast("个人信息已保存~ 🎉")
            toNext();
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
            <h2 className='font-bold text-lg'>个人资料</h2>
            <p className='text-muted-foreground'>开始填写你的基础信息吧！</p>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label className='text-sm text-muted-foreground'>姓名</label>
                        <Input name='fullName' defaultValue={resumeInfo?.fullName} required onChange={handleInputChange} className='mt-1'/>
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm text-muted-foreground'>求职名称</label>
                        <Input name='jobTitle' defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} className='mt-1'/>
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm text-muted-foreground'>常住地址</label>
                        <Input name='address' defaultValue={resumeInfo?.address} required onChange={handleInputChange} className='mt-1'/>
                    </div>
                    <div className=''>
                        <label className='text-sm text-muted-foreground'>手机号码</label>
                        <Input name='phone' defaultValue={resumeInfo?.phone} required onChange={handleInputChange} className='mt-1'/>
                    </div>
                    <div className=''>
                        <label className='text-sm text-muted-foreground'>邮箱地址</label>
                        <Input name='email' defaultValue={resumeInfo?.email} required onChange={handleInputChange} className='mt-1'/>
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <Button disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin w-5 h-5' /> : '保存'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
