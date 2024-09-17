import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FC, SetStateAction, useState } from "react";
interface EditContentProps {
  onChange: (a: any) => void;
  value: any;
}

const EditContent: FC<EditContentProps> = ({ onChange, value }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState: SetStateAction<EditorState>) => {
    setEditorState(newEditorState);
  };

  return (
    <div>
      <Editor
        editorState={value}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName border-2"
        onEditorStateChange={onChange}
      />
    </div>
  );
};

export default EditContent;
