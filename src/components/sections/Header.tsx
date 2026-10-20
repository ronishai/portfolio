import { AsciiMorphText } from '../ascii/AsciiMorphText';

function Header() {
  return (
    <header>
      <h1 className="text-6xl font-bold tracking-tight intense-pink-glow text-pink-200 mt-25">
        <AsciiMorphText
          text="Hi, I'm Roni"
          revealMode="type"
          charset="@#$%&*+-01"
          typeSpeed={90}
          scrambleSpeed={35}
          trailLength={4}
          startDelay={300}
          showCursor={false}
        />
      </h1>
    </header>
  );
}

export default Header;
