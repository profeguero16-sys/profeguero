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
    <>
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
    </>
  );
}

export default App;
