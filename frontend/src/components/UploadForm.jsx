import { useState } from "react";
import { Upload } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

function UploadForm() {
  const { user, navigate, api } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);

  // Upload handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      // Priventing actions without login
      if (!user) {
        return toast.error("Please SingIn") && navigate("/login");
      }

      // Getting documents
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("documents", file);
      });

      const response = await api.post("/api/itinerary/", formData);

      if (response.data.success) {
        navigate(`/itinerary/${response.data.itineraryId}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center px-4">
      <h3 className="font-bold text-2xl md:text-3xl text-orange-500">Upload Travel Documents</h3>

      <div className="flex flex-col items-center gap-6 mt-6">
        <div className="w-full max-w-lg border-4 border-dashed border-blue-600 rounded-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <p className="text-sm text-gray-500 mb-6">Drag & Drop Files or Select Files</p>

            <label htmlFor="files" className="cursor-pointer flex flex-col items-center">
              {files.length > 0 ? (
                <p>{files.length} file(s) selected</p>
              ) : (
                <Upload className="size-14 md:size-16 text-blue-600" />
              )}

              <input
                id="files"
                className="hidden"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setFiles([...e.target.files])}
              />
            </label>

            <p className="text-sm text-gray-500 my-6">Supported: PDF, JPG, PNG</p>

            <button
              type="submit"
              className="w-full sm:w-auto font-bold bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-400 hover:text-black transition-all duration-300 cursor-pointer"
            >
              Upload
            </button>
          </form>
        </div>

        <p className={`${isLoading ? "text-red-600 text-sm font-semibold border px-4 py-2 rounded-lg" : ""}`}>
          {isLoading ? "Your travel plan is being prepared; please wait." : ""}
        </p>
      </div>
    </div>
  );
}

export default UploadForm;
