import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Loader2Icon, PlusSquare } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/clerk-react'
import { apiCreateNewResume } from '@/api/resume';


function AddResume() {
    const [openDialog, setOpenDialog] = useState(false); // 设置对话框的状态
    const [resumeTitle, setResumeTitle] = useState(''); // 设置简历标题的状态
    const [loading, setLoading] = useState(false); // 设置加载状态
    const { user } = useUser(); // 使用useUser hook获取当前用户信息

    const onCreate = async () => {
        const uuid = uuidv4(); // 生成一个uuid
        const resumeData = {
            resumeId: uuid,
            title: resumeTitle,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName
        };
        setLoading(true);
    
        try {
            const result = await apiCreateNewResume(resumeData);
            console.log('Created resume:', result);
            setOpenDialog(false); // 关闭对话框
        } catch (error) {
            console.error('Failed to create resume:', error);
        }finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-sm cursor-pointer border-dashed'
                onClick={() => setOpenDialog(true)}
            >
                <PlusSquare />
            </div>
            <Dialog open={openDialog}>
                <DialogTrigger></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>创建一份新简历</DialogTitle>
                        <DialogDescription>
                            <p className='mt-2'>请输入简历名称</p>
                            <Input className="my-2" placeholder="例如：全栈工程师简历" onChange={(e) => { setResumeTitle(e.target.value) }} />
                        </DialogDescription>
                        <div className='flex justify-end gap-4'>
                            <Button onClick={() => setOpenDialog(false)} variant="ghost">取消</Button>
                            <Button onClick={() => { onCreate() }} disabled={!resumeTitle||loading}>
                                {loading ? 
                                <Loader2Icon className="animate-spin" size={20} />
                                : '确认'}
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddResume