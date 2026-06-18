import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function Itinerary() {
  const { api } = useContext(AppContext);
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);

  // Get itinerary by id
  const handleItinerary = async () => {
    try {
      const { data } = await api.get(`/api/itinerary/get/${id}`);
      if (data.success) {
        setItinerary(data.itinerary);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    handleItinerary();
  }, [id]);

  if (!itinerary) return <div className="text-center p-10">Loading Itinerary...</div>;

  return (
    <div className="flex flex-col justify-center items-center gap-5 p-5">
      <h1 className="text-orange-500 font-bold text-5xl bg-gray-50 p-3 rounded-lg shadow-lg">Travel Itinerary</h1>

      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md">
        {/* Header */}

        {/* Content */}
        {/* Header Summary */}
        <div className="w-full border-b pb-4 mb-4">
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div>
              <p className="text-gray-500">Traveler</p>
              <p className="font-semibold">{itinerary.extractedData?.travelerName}</p>
            </div>
            <div>
              <p className="text-gray-500">Route</p>
              <p className="font-semibold">
                {itinerary.extractedData?.from} → {itinerary.extractedData?.to}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Airline</p>
              <p className="font-semibold">{itinerary.extractedData?.airline || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">Departure</p>
              <p className="font-semibold">{itinerary.extractedData?.departureDate}</p>
            </div>
          </div>
        </div>

        {/* Daily Itinerary */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-teal-700">Daily Plan</h3>
          {itinerary.itinerary?.days?.length > 0 ? (
            itinerary.itinerary.days.map((day, index) => (
              <div key={index} className="border-l-4 border-orange-500 pl-4 py-3 bg-gray-50 rounded-r-lg shadow-sm">
                <p className="font-bold text-teal-800 uppercase tracking-wider">Day {index + 1}</p>
                <p className="text-gray-700 mt-1">{day.description || "No activities listed for this day."}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No itinerary details found.</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-2xl hover:bg-blue-500 transition-all">
            Share
          </button>
          <button className="bg-red-600 text-white font-semibold px-4 py-2 rounded-2xl hover:bg-red-700 transition-all">
            Delete
          </button>
          <div>
            <p>{shareLink ? shareLink : ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Itinerary;
