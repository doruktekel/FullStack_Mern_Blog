import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { app } from "../firebase";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [uploadImageError, setUploadImageError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [uploadImageProgress, setUploadImageProgress] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const uploadImage = () => {
    if (!file) {
      return setUploadImageError("Please select a file !");
    }

    try {
      const storage = getStorage(app);
      const newName = new Date().getTime() + file.name;
      const storageRef = ref(storage, "Post_Pictures/" + newName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          const newProgress = progress.toFixed(0);
          setUploadImageProgress(newProgress);
        },
        (error) => {
          setUploadImageError(error);
          setUploadImageProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData({ ...formData, postImage: downloadURL });
            setUploadImageError(null);
            setUploadImageProgress(null);
          });
        }
      );
    } catch (error) {
      setUploadImageError("Image upload failed");
      setUploadImageProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        return setPublishError(data.message);
      }

      if (res.ok) {
        navigate(`/post/${data.slug}`);
        setPublishError(null);
      }
    } catch (error) {
      setPublishError(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 min-h-lvh p-3">
      <h1 className="text-center font-semibold text-xl ">Create a post</h1>
      <form className="flex flex-col gap-2 my-4" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-2">
          <TextInput
            placeholder="Title"
            type="text"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized"> Select a category</option>
            <option value="javascript">Vanilla Js</option>
            <option value="reactjs">React Js</option>
            <option value="nextjs">React Js</option>
            <option value="vuejs">Vue Js</option>
          </Select>
        </div>
        <div className="flex flex-col sm:flex-row justify-between p-2 border border-dotted border-green-400 gap-2 sm:items-center ">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="tealToLime"
            outline
            onClick={uploadImage}
            disabled={uploadImageProgress}
          >
            {uploadImageProgress ? (
              <CircularProgressbar
                className="w-10 h-10"
                value={uploadImageProgress}
                text={`${uploadImageProgress}%`}
              />
            ) : (
              "Upload"
            )}
          </Button>
        </div>
        {uploadImageError && <Alert color="failure">{uploadImageError}</Alert>}
        {formData && formData.postImage && (
          <img
            src={formData.postImage}
            className="h-full w-full object-cover"
          />
        )}
        <ReactQuill
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          theme="snow"
          onChange={(e) => setFormData({ ...formData, content: e })}
        />

        <Button
          type="submit"
          gradientDuoTone="pinkToOrange"
          outline
          className="mt-2"
          disabled={uploadImageProgress}
        >
          Publish Post
        </Button>
        {publishError && (
          <Alert color="failure" className="mt-2">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
