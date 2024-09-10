import React, { useEffect, useState } from 'react'
import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { ResumePreview } from '@/pages/dashboard/resume/component/ResumePreview'
import { useParams,useNavigate, Navigate } from 'react-router-dom'
import { apiGetResumeInfo } from '@/api/resume'
import { ArrowLeft } from 'lucide-react'

const ViewResume = () => {
    const { resumeId } = useParams();
    const [resumeInfo, setResumeInfo] = useState();
    const navigate = useNavigate();
    const GetResumeInfo = () => {
        // 从数据库中获取简历信息
        apiGetResumeInfo(resumeId).then((data) => {
            console.log(data);
            setResumeInfo(data);
        }).catch((err) => {
            console.log(err);
        });
    }
    useEffect(() => {
        GetResumeInfo();
    }, []);

    const handleDownload = () => {
        window.print();
    };

    const handleClick = () => {
        navigate('/dashboard/resume/'+resumeId+'/edit');
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id="no-print">
                <Header />
                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <h2 className='text-2xl font-bold text-center'>🔥 恭喜！你的简历已经成功创建好啦！🔥</h2>
                    <p className='text-muted-foreground text-center mt-2'>现在你可以下载你的简历，或者分享你的简历地址给朋友们~</p>
                    <div className='flex justify-between px-44 my-10'>
                        {/* 返回上一步 */}
                        <Button onClick={handleClick}><ArrowLeft /></Button>
                        <Button onClick={handleDownload}>下载</Button>
                    </div>
                </div>
            </div>
            <div className='mx-10 md:mx-20 lg:mx-36 md:px-28 lg:px-44 mb-20' id="print-area">
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume;
