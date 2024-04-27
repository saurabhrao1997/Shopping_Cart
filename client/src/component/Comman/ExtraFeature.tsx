
import { MdDelete } from "react-icons/md";

export default function ExtraFeature({onDelete}:any) {
  return (
    <div className="flex justify-center">
    <MdDelete fill="red" className="w-6 h-6" onClick={onDelete}/>
    </div>
  )
}
