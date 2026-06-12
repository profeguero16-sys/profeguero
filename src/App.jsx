import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CoursesMenu from './components/CoursesMenu';
import Trajectory from './components/Trajectory';
import SocialProof from './components/SocialProof';
import Camps from './components/Camps';
import Marketplace from './components/Marketplace';
import Footer from './components/Footer';

function App() {
  return (
    <div className="overflow-x-hidden w-full">
      <Navbar />
      <main>
        <Hero />
        <CoursesMenu />
        <Trajectory />
        <SocialProof />
        <Camps />
        <Marketplace />
      </main>
      <Footer />
    </div>
  );
}

export default App;
