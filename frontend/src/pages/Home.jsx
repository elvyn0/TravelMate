import Header from "../components/Header";
import Hero from "../components/Hero";
import PastTrips from "../components/PastTrips";
import UploadForm from "../components/UploadForm";

function Home() {
  return (
    <div className="flex flex-col gap-3">
      <Header />
      <Hero />
      <UploadForm />
      <PastTrips />
    </div>
  );
}

export default Home;
