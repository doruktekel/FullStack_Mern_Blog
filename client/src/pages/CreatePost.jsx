import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  return (
    <div className="max-w-3xl mx-auto py-6 min-h-lvh p-3">
      <h1 className="text-center font-semibold text-xl ">Create a post</h1>
      <form className="flex flex-col gap-2 my-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <TextInput
            placeholder="Title"
            type="text"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized"> Select a category</option>
            <option value="javascript">Vanilla Js</option>
            <option value="reactjs">React Js</option>
            <option value="nextjs">React Js</option>
            <option value="vuejs">Vue Js</option>
          </Select>
        </div>
        <div className="flex flex-col sm:flex-row justify-between p-4 border border-dotted border-slate-100">
          <FileInput type="file" accept="image/*" />
          <Button type="button" gradientDuoTone="tealToLime" outline>
            Upload Image
          </Button>
        </div>
        <ReactQuill
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          theme="snow"
        />

        <Button
          type="submit"
          gradientDuoTone="pinkToOrange"
          outline
          className="mt-2"
        >
          Publish Post
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
