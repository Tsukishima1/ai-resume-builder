import { useEffect } from "react";
import { useParams } from "react-router-dom"

function EditResume() {
    const params=useParams();
    useEffect(()=>{ // 这个hook会在组件挂载后执行
        console.log(params);
    },[params]); // 数组中的值发生变化时，useEffect会重新执行

  return (
    <div>EditResume</div>
  )
}

export default EditResume