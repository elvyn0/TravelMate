import { useContext } from "react";
import { useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Shared() {
  const { api } = useContext(AppContext);
  const { shareId } = useParams();
  const [sharedItinerary, setSharedItinerary] = useState(null);

  // Handling shared itinerary
  const handleSharedItinerary = async () => {
    try {
      const response = await api.get(`/api/itinerary/shared/${shareId}`);

      if (response.data.success) {
        setSharedItinerary(response.data.itinerary);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (shareId) {
      handleSharedItinerary();
    }
  }, [shareId]);

  return (
    <div className="flex flex-col justify-center items-center gap-5 p-5">
      <h1 className="text-orange-500 font-bold text-5xl bg-gray-50 p-3 rounded-lg shadow-lg">Shared Itinerary</h1>

      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md">
        {/* Header */}

        {/* Content */}
        {/* Header Summary */}
        <div className="w-full border-b pb-4 mb-4">
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div>
              <p className="text-gray-500">Traveler</p>
              <p className="font-semibold">{sharedItinerary?.extractedData?.travelerName}</p>
            </div>
            <div>
              <p className="text-gray-500">Route</p>
              <p className="font-semibold">
                {sharedItinerary?.extractedData?.from} → {sharedItinerary?.to}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Airline</p>
              <p className="font-semibold">{sharedItinerary?.extractedData?.airline || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">Departure</p>
              <p className="font-semibold">{sharedItinerary?.extractedData?.departureDate}</p>
            </div>
          </div>
        </div>

        {/* Daily Itinerary */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-teal-700">Daily Plan</h3>
          {sharedItinerary?.itinerary?.days?.length > 0 ? (
            sharedItinerary?.itinerary.days.map((day, index) => (
              <div key={index} className="border-l-4 border-orange-500 pl-4 py-3 bg-gray-50 rounded-r-lg shadow-sm">
                <p className="font-bold text-teal-800 uppercase tracking-wider">Day {index + 1}</p>
                <p className="text-gray-700 mt-1">{day.description || "No activities listed for this day."}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No itinerary details found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shared;
