import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Intro } from "./components/sections/Intro";
import { Location } from "./components/sections/Location";
import { Residences } from "./components/sections/Residences";
import { VirtualTour } from "./components/sections/VirtualTour";
import { FloorPlans } from "./components/sections/FloorPlans";
import { ApartmentPlan } from "./components/sections/ApartmentPlan";
import { Amenities } from "./components/sections/Amenities";
import { Film } from "./components/sections/Film";
import { Ownership } from "./components/sections/Ownership";
import { Contact } from "./components/sections/Contact";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Location />
        <Ownership />
        <Residences />
        <VirtualTour />
        <FloorPlans />
        <Amenities />
        <ApartmentPlan />
        <Film />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
