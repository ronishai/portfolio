
import { AsciiMorphText } from '../ascii';
import SkillsTerminal from '../ui/SkillsTerminal';

function Skills() {
  return (
    <section id="skills" className="flex flex-col gap-8 max-w-4xl">
      <h2 className="text-3xl font-bold text-pink-200 neon-glow mb-4">
        <AsciiMorphText
          text="Skills"
          revealMode="type"
          charset="@#$%&*+-01"
          typeSpeed={70}
          scrambleSpeed={30}
          trailLength={4}
          startDelay={500}
          showCursor={false}
        />
      </h2>

      <SkillsTerminal />
    </section>
  );
}

export default Skills;
