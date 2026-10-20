import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { AsciiMorphText } from '../ascii/AsciiMorphText';
import TerminalCard from '../ui/TerminalCard';

function Contact() { 
    return (
      <section id="contact" className="flex flex-col gap-8 max-w-4xl">
        <h2 className="text-3xl font-bold text-pink-200 neon-glow mb-4">
          <AsciiMorphText
            text="Contact"
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

        <TerminalCard title="roni@portfolio:~/contact">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b border-pink-300/20 pb-3">
            <div>
              <p className="text-pink-300">$&gt; initialize connection --target "roni"</p>
            </div>
          </div>

          <ul className="space-y-3 text-sm text-neutral-300">
            <li className="flex items-center gap-2">
              <FaGithub size={16} className="text-pink-300" />
              <a
                href="https://github.com/ronishai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-200 hover:text-pink-100"
              >
                GitHub
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaLinkedin size={16} className="text-pink-300" />
              <a
                href="https://linkedin.com/in/ronishai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-200 hover:text-pink-100"
              >
                LinkedIn
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaInstagram size={16} className="text-pink-300" />
              <a
                href="https://instagram.com/ronishai_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-200 hover:text-pink-100"
              >
                Instagram
              </a>
            </li>
          </ul>
        </TerminalCard>
      </section>
    );
}

export default Contact;