import { AsciiMorphText } from '../ascii/AsciiMorphText';

function About() {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-4xl font-bold text-pink-200 neon-glow mb-4">
        <AsciiMorphText
          text="About Me"
          revealMode="type"
          charset="@#$%&*+-01"
          typeSpeed={70}
          scrambleSpeed={30}
          trailLength={4}
          startDelay={500}
          showCursor
          cursorCharacter="_"
        />
      </h2>
      <p className="glass-panel flex flex-col gap-6 sm:gap-8 p-4 sm:p-6 text-xl text-pink-200">
        I am a Junior Full-Stack Developer with a strong foundation in modern web technologies and
        IT infrastructure. I specialize in building end-to-end applications using TypeScript, React,
        NestJS, and Nx monorepos. With experience leading a technical team and supporting
        mission-critical systems in time-sensitive environments, I bring a practical,
        problem-solving approach to software development, focusing on clean architecture,
        maintainability, and scalability. I am passionate about creating efficient, user-friendly
        applications and continuously learning new technologies to enhance my skill set.
      </p>
    </section>
  );
}

export default About