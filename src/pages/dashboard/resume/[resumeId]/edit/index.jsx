import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { FromSection } from "../../component/FromSection";
import { ResumePreview } from "../../component/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import dummy from "@/data/dummy";

function EditResume() {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState(null);
  useEffect(() => { // 这个hook会在组件挂载后执行
    setResumeInfo(dummy);
  }, [params]); // 数组中的值发生变化时，useEffect会重新执行

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10 md:px-20 lg:px-32">
        {/* Form Section */}
        <FromSection />
        {/* Preview Section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume