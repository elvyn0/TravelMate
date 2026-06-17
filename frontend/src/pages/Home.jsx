import Header from "../components/Header";
import Hero from "../components/Hero";
import PastTrips from "../components/PastTrips";
import UploadForm from "../components/UploadForm";

function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <UploadForm />
      <PastTrips />
    </div>
  );
}

export default Home;
