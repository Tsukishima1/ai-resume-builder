import React, { useEffect, useState, useContext } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RichTextEditor } from '../RichTextEditor';
import { apiUpdateResume } from '@/api/resume';
import { useParams } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

const fromField = {
    title: '',
    companyName: '',
    location: '',
    startDate: '',
    endDate: '',
    workSummary: '',
}

export const Experience = ({ enableNext, toNext }) => {
    const params = useParams()
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);
    
    // 如果resumeInfo.experience.length为0，那么就返回一个初始值，否则返回resumeInfo.experience
    const [experienceList, setExperienceList] = useState(resumeInfo.experience.length ? resumeInfo.experience : [fromField]);
    // 去掉experience里的id属性和userResumeId属性
    experienceList.forEach(item => {
        delete item.id;
        delete item.userResumeId;
    })
    
    const handleChange = (index, event) => {
        enableNext(false);
        const values = [...experienceList]; // 获取所有的工作经验，然后更新指定的工作经验
        // 和深浅拷贝有关，这里的values是一个数组，里面存放的是对象，如果直接修改values[index]的属性，那么会直接修改原来的值，所以需要先拷贝一份，然后再修改
        values[index]={
            ...values[index],
            [event.target.name]: event.target.value
        };
        setExperienceList(values);
    }

    const AddNewExperience = () => {
        setExperienceList([...experienceList, fromField]); // 添加一个新的工作经验
    }

    const RemoveExperience = () => {
        const values = [...experienceList];
        values.pop(); // 移除最后一个工作经验
        setExperienceList(values);
    }

    const handleRichTextEditor = (event, name, index) => {
        enableNext(false);
        const values = [...experienceList];
        values[index]={
            ...values[index],
            [name]: event.target.value
        };
        setExperienceList(values);
    }

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log(experienceList);

        const resumeData = {
            resumeId: params.resumeId,
            experience: experienceList
        }
        try {
            const result = await apiUpdateResume(resumeData);
            console.log(resumeInfo);
            enableNext(true)
            toast("该部分更新成功~ 🎉")
            toNext();
        }
        catch (error) {
            console.error('Failed to update resume:', error);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experienceList
        })
    }, [experienceList])

    return (
        <div className='p-5 shadow-md rounded-lg border-t-primary border-t-8 mt-8'>
            <h2 className='font-bold text-lg'>工作经历</h2>
            <p className='text-muted-foreground'>填写你曾经的一些工作经历吧！</p>
            <div>
                {experienceList.map((experience, index) => (
                    <div key={index} className={index}>
                        {experienceList.length > 1 &&
                            <>
                                {index !== 0 && <hr className='border-t-2 mt-5' />}
                                <h3 className='text-sm font-bold mt-5'>Experience {index + 1}</h3>
                            </>
                        }
                        <div className='grid grid-cols-2 mt-5 gap-3'>
                            <div className='col-span-2'>
                                <label className='text-sm text-muted-foreground'>职位</label>
                                <Input name="title" onChange={(event) => handleChange(index, event)} defaultValue={resumeInfo?.experience[index]?.title||''} className="mt-1" />
                            </div>
                            <div>
                                <label className='text-sm text-muted-foreground'>公司</label>
                                <Input name="companyName" onChange={(event) => handleChange(index, event)} defaultValue={resumeInfo?.experience[index]?.companyName||''} className="mt-1" />
                            </div>
                            <div>
                                <label className='text-sm text-muted-foreground'>地点</label>
                                <Input name="location" onChange={(event) => handleChange(index, event)} defaultValue={resumeInfo?.experience[index]?.location||''} className="mt-1" />
                            </div>
                            <div>
                                <label className='text-sm text-muted-foreground'>开始时间</label>
                                <Input type="month" name="startDate" onChange={(event) => handleChange(index, event)} defaultValue={resumeInfo?.experience[index]?.startDate||''} className="mt-1" />
                            </div>
                            <div>
                                <label className='text-sm text-muted-foreground'>结束时间</label>
                                <Input type="month" name="endDate" onChange={(event) => handleChange(index, event)} defaultValue={resumeInfo?.experience[index]?.endDate||''} className="mt-1" />
                            </div>
                            <div className='col-span-2'>
                                <RichTextEditor
                                    index={index}
                                    onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummary', index)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-between mt-5'>
                <div className='flex gap-2'>
                    <Button onClick={AddNewExperience} variant="outline"> + 添加更多工作经验</Button>
                    {
                        experienceList.length > 1 && <Button onClick={RemoveExperience} variant="outline"> - 移除最后一条</Button>
                    }
                </div>
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin w-5 h-5' /> : '保存'}
                </Button>
            </div>
        </div>
    )
}
