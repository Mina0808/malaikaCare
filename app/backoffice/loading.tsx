import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="flex flex-row gap-2">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
        <ClipLoader color="#1190ba" />
      </div>      
    </div>
  );
}