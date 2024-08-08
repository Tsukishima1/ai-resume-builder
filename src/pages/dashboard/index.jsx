import { useUser } from "@clerk/clerk-react"
import AddResume from "./components/AddResume"
import { apiGetUserResume } from "@/api/resume";
import { useEffect, useState } from "react";
import ResumeCardItem from "./components/ResumeCardItem";

function DashBoardPage() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]); // 保存用户简历列表

  const GetResumesList = async () => {
    try {
      const result = await apiGetUserResume(user?.primaryEmailAddress?.emailAddress);
      console.log('User resumes:', result);
      setResumeList(result);
    } catch (error) {
      console.error('Failed to get user resumes:', error);
    }
  };

  useEffect(() => {
    user && GetResumesList(); // 当user存在时，调用GetResumesList函数
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); // 当user发生变化时，重新执行useEffect

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl cursor-default">我的简历</h2>
      <p className="mt-3 text-muted-foreground cursor-default">
        这是您的仪表盘。您可以在这里查看您的简历，编辑它，或者创建一个新的简历。
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {
          resumeList.length > 0 && resumeList.map((resume, index) => (
            <ResumeCardItem resume={resume} key={index} />
          ))
        }
      </div>
    </div>
  )
}

export default DashBoardPage