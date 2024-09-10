export const PersonalDetailPreview = ({resumeInfo}) => {
  return (
    <div>
        <h2 className="font-bold text-2xl text-center">
            {resumeInfo?.fullName}
        </h2>
        <h2 className="text-center font-bold text-muted-foreground my-2" style={{
            color: resumeInfo?.themeColor
        }}>
            {resumeInfo?.jobTitle}
        </h2>
        <h2 className="text-center font-normal text-xs" style={{
            color: resumeInfo?.themeColor
        }}>
            {resumeInfo?.address}
        </h2>
        <div className="flex justify-between">
            <h2 className="font-normal text-sm" style={{
                color: resumeInfo?.themeColor
            }}>{resumeInfo?.phone}</h2>
            <h2 className="font-normal text-sm" style={{
                color: resumeInfo?.themeColor
            }}>{resumeInfo?.email}</h2>
        </div>
        <hr className="border-[1.5px] my-2" style={{
            borderColor: resumeInfo?.themeColor
        }}/>
    </div>
  )
}
