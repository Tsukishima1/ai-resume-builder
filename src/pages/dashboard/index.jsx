import AddResume from "./components/AddResume"

function DashBoardPage() {
  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl cursor-default">我的简历</h2>
      <p className="mt-3 text-muted-foreground cursor-default">
        这是您的仪表盘。您可以在这里查看您的简历，编辑它，或者创建一个新的简历。
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10">
        <AddResume />
      </div>
    </div>
  )
}

export default DashBoardPage