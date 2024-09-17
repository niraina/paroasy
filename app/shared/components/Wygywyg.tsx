import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
type PropsType = {
  name: string;
  value?: any;
  onChange: (params: any) => void;
};
const Wygywyg = ({ name, value, onChange }: PropsType) => {
  return (
    <>
      <ReactQuill
        className="h-full"
        theme="snow"
        value={value}
        onChange={(e: any) => onChange({ [name]: e })}
      />
    </>
  );
};

export default Wygywyg;
