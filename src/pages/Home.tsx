// import heartImage from '../assets/heart.svg';
// import bowImage from '../assets/bow.svg';
// import catImage from '../assets/kitty.svg';
// import characterImage from '../assets/kuromi.svg';
// import heartOutlineImage from '../assets/heartoutline.svg';

import { AsciiImage, AsciiMorphText } from '../components/ascii';

import '../components/ascii/ascii.css';
import NavBar from '../components/ui/NavBar';
import About from '../components/sections/About';
import Experience from '../components/sections/Experience';
import Header from '../components/sections/Header';
import { Reveal } from '../components/ui/Reveal';

export function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col pt-20 pb-12 px-4 sm:px-8 gap-15">
      <NavBar />
      <Reveal><Header /></Reveal>
      
      <main className="flex flex-col gap-12 max-w-4xl">
        <div className="mt-20 mb-30">
          <Reveal><About /></Reveal>
        </div>
        <Reveal><Experience /></Reveal>

        {/* <section className="ascii-decoration-grid flex flex-wrap justify-center items-center gap-6 mt-12">
        <div className="w-24 sm:w-32 flex justify-center">
        <AsciiImage
          src={characterImage}
          alt="Black and white character illustration"
          columns={50}
          charset="█▓▒░"
          contrast={1.6}
          animation="always"
          animationDensity={0.2}
          variation={2}
          fps={7}
        /> 
          <AsciiImage
            src={heartImage}
            alt="Heart"
            columns={25}
            charset="@#*%$& "
            contrast={1.6}
            gamma={0.3}
            animation="always-and-hover"
            animationDensity={0.2}
            variation={2}
            fps={5}
          />
        </div>

        <div className="w-24 sm:w-32 flex justify-center">
          <AsciiImage
            src={bowImage}
            alt="Bow"
            columns={22}
            charset="♥♡*+=:. "
            contrast={1.3}
            animation="always-and-hover"
            animationDensity={0.18}
            variation={1}
            hoverMultiplier={3}
            fps={8}
          />
        </div>

        <div className="w-24 sm:w-32 flex justify-center">
          <AsciiImage
            src={catImage}
            alt="Cat"
            columns={28}
            charset="█▓▒░ "
            contrast={1.2}
            animation="always"
            animationDensity={0.12}
            variation={1}
            fps={7}
          />
        </div>

        <div className="w-24 sm:w-32 flex justify-center">
          <AsciiImage
            src={heartOutlineImage}
            alt="heart outline"
            columns={25}
            charset="♥♡*+=:. "
            contrast={1.2}
            animation="always"
            animationDensity={0.12}
            variation={1}
            fps={7}
          />
        </div>
      </section> */}
      </main>
    </div>
  );
}
