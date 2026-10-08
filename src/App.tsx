import './App.css';
import { Home } from './pages/Home';
import Galaxy from './components/Galaxy';

function App() {
  return (
    <>
      <div className="fixed inset-0 z-0">
        <Galaxy
          mouseRepulsion={false}
          mouseInteraction={false}
          density={1.5}
          glowIntensity={0.2}
          saturation={0}
          hueShift={30}
          twinkleIntensity={0.2}
          rotationSpeed={0.05}
          repulsionStrength={1}
          autoCenterRepulsion={0}
          starSpeed={0.4}
          speed={0.4}
        />
      </div>
      <div className="relative z-10">
        <Home />
      </div>
    </>
  );
}

export default App;
