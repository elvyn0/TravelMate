import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

function PastTrips() {
  const { api, navigate } = useContext(AppContext);
  const [itineraries, setItineraries] = useState([]);

  // handle list user itineraries
  const handleListItineraries = async () => {
    try {
      const response = await api.get("/api/itinerary/list");
      if (response.data.success) {
        setItineraries(response.data.itineraries);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    handleListItineraries();
  }, []);

  return (
    <div className="flex justify-center mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {itineraries.length > 0 ? (
          itineraries.map((trip) => (
            <div
              key={trip._id}
              onClick={() => navigate(`/itinerary/${trip._id}`)}
              className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition-all cursor-pointer"
            >
              <h2 className="font-bold text-xl text-teal-700">{trip.title}</h2>

              <p className="text-lg text-gray-500 mt-2">
                {trip.extractedData?.from} → {trip.extractedData?.to}
              </p>

              <p className="text-lg text-gray-500">{trip.extractedData?.departureDate}</p>
            </div>
          ))
        ) : (
          <p className="text-teal-700  font-semibold col-span-full ">
            No trips in your backpack yet. Upload your travel documents, pack your bags, and let TravelMate handle the
            planning.
          </p>
        )}
      </div>
    </div>
  );
}

export default PastTrips;
