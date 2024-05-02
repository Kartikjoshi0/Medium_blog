interface BlogProp{
    date: String;
    title: String;
    desc: String;
    authorName: String
}

export function Card({date,title,desc,authorName}: BlogProp){
    return <div  className="w-1 mt-20 ml-8 overflow-hidden p-4 border-b border-slate-200 w-full md:w-3/6 md:border md:border-gray-50 bg-white shadow-lg">
    <div className="flex items-center gap-4">
        
      <div>
        <span className="font-extralight">{authorName}</span> · <span className="font-thin text-slate-600">{date}</span>
      </div>
    </div>
    <div className="text-xl font-bold pt-4">{title}</div>
    <div className="text-md py-4 text-slate-600">
    </div>
    <div>{desc}</div>
  </div>
}

