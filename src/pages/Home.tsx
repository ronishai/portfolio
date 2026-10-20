import '../components/ascii/ascii.css';
import NavBar from '../components/ui/NavBar';
import About from '../components/sections/About';
import Experience from '../components/sections/Experience';
import Header from '../components/sections/Header';
import { Projects } from '../components/sections/Projects';
import { Reveal } from '../components/ui/Reveal';
import Skills from '../components/sections/Skills';
import Contact from '../components/sections/Contact';

export function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-24 pb-16 px-4 sm:px-8 max-w-4xl mx-auto">
      <NavBar />

      <header className="mb-10">
        <Reveal>
          <Header />
        </Reveal>
      </header>

      <main className="flex flex-col gap-16">
        <section className="scroll-m-16" id="about">
          <Reveal>
            <About />
          </Reveal>
        </section>

        <section className="scroll-m-16" id="projects">
          <Reveal>
            <Projects />
          </Reveal>
        </section>

        <section className="scroll-m-16" id="experience">
          <Reveal>
            <Experience />
          </Reveal>
        </section>

        <section className="scroll-m-16" id="skills">
          <Reveal>
            <Skills />
          </Reveal>
        </section>

        <section className="scroll-m-16" id="contact">
          <Reveal>
            <Contact />
          </Reveal>
        </section>
      </main>
    </div>
  );
}
