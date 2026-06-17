import { NavLink } from "react-router-dom";

function UploadForm() {
  return (
    <div className="text-center text-teal-700">
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="font-bold">Upload Travel Documents</h3>
          <p>[ Drag & Drop Files] or [ Select Files ]</p>
        </div>
        <div>
          <input className="border" />
          <p>Supported: PDF, JPG, PNG</p>
        </div>
        <div>
          <NavLink to="itinerary">
            <button>View Result</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default UploadForm;
