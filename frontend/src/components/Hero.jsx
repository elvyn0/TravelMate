function Hero() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center py-5 text-teal-700">
      <div className="flex flex-row justify-between w-full p-5 bg-gray-100 shadow-lg">
        <div className="flex items-center">
          <h1 className="text-sm md:text-2xl font-semibold">
            Turn flight tickets, hotel reservations, and travel documents into a complete AI-powered travel plan.
          </h1>
        </div>
        <div className="w-full md:min-w-200 p-2">
          <img className="w-full rounded-4xl" src="/heroimage.jpg" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
