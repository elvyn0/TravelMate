function PastTrips() {
  return (
    <div className="text-center flex flex-col gap-8 mt-8">
      <div>
        <h1 className="text-orange-500 text-2xl font-semibold">Recent Trips</h1>
      </div>
      {/* Horizontal scrolleble history section */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"></div>
      </div>
    </div>
  );
}

export default PastTrips;
