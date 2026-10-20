import { AsciiMorphText } from '../ascii/AsciiMorphText';
import TerminalCard from '../ui/TerminalCard';

function About() {
  return (
    <section className="flex flex-col gap-8 max-w-4xl">
      <h2 className="text-4xl font-bold text-pink-200 neon-glow mb-4">
        <AsciiMorphText
          text="About Me"
          revealMode="type"
          charset="@#$%&*+-01"
          typeSpeed={70}
          scrambleSpeed={30}
          trailLength={4}
          startDelay={500}
          showCursor={false}
        />
      </h2>

      <TerminalCard title="roni@portfolio:~">
        <p className="mb-4">
          <span className="text-pink-300">$&gt;</span> I am a Junior Full-Stack Developer with a
          strong foundation in modern web technologies and IT infrastructure.
        </p>
        <p>
          <span className="text-pink-300">$&gt;</span> Specializing in TypeScript, React, NestJS,
          and Nx monorepos, with a background as a System Administrator, and experience leading a
          technical team in operational environments.
        </p>
      </TerminalCard>
    </section>
  );
}

export default About