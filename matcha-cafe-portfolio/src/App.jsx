import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import CafeScene from './cafe.jsx';

export default function App() {
  const [colorScheme, setColorScheme] = useState('light dark');
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Load color scheme from localStorage
    if (localStorage.colorScheme) {
      setColorScheme(localStorage.colorScheme);
      document.documentElement.style.setProperty('color-scheme', localStorage.colorScheme);
    }

    // Detect current page from hash
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setCurrentPage(hash);
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(newHash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleColorSchemeChange = (e) => {
    const value = e.target.value;
    setColorScheme(value);
    localStorage.colorScheme = value;
    document.documentElement.style.setProperty('color-scheme', value);
  };

  const navItems = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'resume', label: 'Resume', href: '#resume' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'contact', label: 'Contact', href: '#contact' },
    { id: 'github', label: 'GitHub', href: 'https://github.com/hannahskyg', external: true }
  ];

  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      {/* Updated Navbar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '10px 40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1px',
        zIndex: 100,
        background: '#ffffff',
        fontFamily: '"Quicksand", sans-serif',
        fontSize: '16px'
      }}>
        <div style={{
          display: 'flex',
          gap: '2px',
          alignItems: 'center'
        }}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            onClick={() => !item.external && setCurrentPage(item.id)}
            style={{
              textAlign: 'center',
              color: '#888888',
              backgroundColor: 'transparent',
              textDecoration: 'none',
              padding: '0.2em 1em',
              borderBottom: currentPage === item.id ? '0.4em solid #a5d6a7' : 'none',
              paddingBottom: currentPage === item.id ? '0.1em' : '0.5em',
              fontWeight: currentPage === item.id ? 'bold' : 'normal',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderBottom = '0.4em solid #5C7650';
              e.target.style.paddingBottom = '0.1em';
              e.target.style.backgroundColor = 'rgba(92, 118, 80, 0.15)';
            }}
            onMouseLeave={(e) => {
              if (currentPage !== item.id) {
                e.target.style.borderBottom = 'none';
                e.target.style.paddingBottom = '0.5em';
              } else {
                e.target.style.borderBottom = '0.4em solid #a5d6a7';
                e.target.style.paddingBottom = '0.1em';
              }
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            {item.label}
          </a>
        ))}
        </div>
        
      </nav>

      {/* Hero Section - Fixed */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 0
      }}>
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
          {/* Left 40% - Intro Text */}
          <div style={{
            width: '40%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #5C7650 0%, #5C7650 100%)',
            padding: '60px',
            fontFamily: '"Quicksand", sans-serif'
          }}>
            <div style={{ textAlign: 'center', color: '#fff' }}>
              <h1 style={{ 
                fontSize: '56px', 
                margin: '0 0 20px 0',
                fontWeight: '600'
              }}>
                Hi, I'm Hannah
              </h1>
              <p style={{ fontSize: '22px', margin: 0, opacity: 0.9 }}>
                Welcome to my matcha café ☕
              </p>
            </div>
          </div>

          {/* Right 60% - 3D Café */}
          <div style={{ width: '60%', background: '#d4d4d4ff' }}>
            <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
              <CafeScene />
            </Canvas>
          </div>
        </div>
      </div>

      {/* Scrollable Content - Starts below viewport */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        marginTop: '100vh',
        background: '#ffffff'
      }}>
        {/* About Section */}
        <section id="about" style={{
          minHeight: '100vh',
          padding: '100px 80px',
          background: '#ffffff'
        }}>
          <h2 style={{
            fontSize: '48px',
            color: '#5C7650',
            fontFamily: '"Quicksand", sans-serif',
            marginBottom: '30px'
          }}>About Me</h2>
          <p style={{
            fontSize: '20px',
            lineHeight: '1.8',
            color: '#333',
            fontFamily: '"Quicksand", sans-serif',
            maxWidth: '800px'
          }}>
            Your about me content goes here. Tell your story, share your passions,
            and let visitors know what makes you unique!
          </p>
        </section>

        {/* Resume Section */}
        <section id="resume" style={{
          minHeight: '100vh',
          padding: '100px 80px',
          background: '#f9f9f9'
        }}>
          <h2 style={{
            fontSize: '48px',
            color: '#5C7650',
            fontFamily: '"Quicksand", sans-serif',
            marginBottom: '30px'
          }}>Resume</h2>
          <p style={{
            fontSize: '20px',
            lineHeight: '1.8',
            color: '#333',
            fontFamily: '"Quicksand", sans-serif'
          }}>
            Your resume content goes here.
          </p>
        </section>

        {/* Experience Section */}
        <section id="experience" style={{
          minHeight: '100vh',
          padding: '100px 80px',
          background: '#ffffff'
        }}>
          <h2 style={{
            fontSize: '48px',
            color: '#5C7650',
            fontFamily: '"Quicksand", sans-serif',
            marginBottom: '30px'
          }}>Experience</h2>
          <p style={{
            fontSize: '20px',
            lineHeight: '1.8',
            color: '#333',
            fontFamily: '"Quicksand", sans-serif'
          }}>
            Your experience content goes here.
          </p>
        </section>

        {/* Projects Section */}
        <section id="projects" style={{
          minHeight: '100vh',
          padding: '100px 80px',
          background: '#f9f9f9'
        }}>
          <h2 style={{
            fontSize: '48px',
            color: '#5C7650',
            fontFamily: '"Quicksand", sans-serif',
            marginBottom: '30px'
          }}>Projects</h2>
          <p style={{
            fontSize: '20px',
            lineHeight: '1.8',
            color: '#333',
            fontFamily: '"Quicksand", sans-serif'
          }}>
            Your projects content goes here.
          </p>
        </section>

        {/* Hobbies Section */}
        <section id="hobbies" style={{
          minHeight: '100vh',
          padding: '100px 80px',
          background: '#ffffff'
        }}>
          <h2 style={{
            fontSize: '48px',
            color: '#5C7650',
            fontFamily: '"Quicksand", sans-serif',
            marginBottom: '30px'
          }}>Hobbies</h2>
          <p style={{
            fontSize: '20px',
            lineHeight: '1.8',
            color: '#333',
            fontFamily: '"Quicksand", sans-serif'
          }}>
            Your hobbies content goes here.
          </p>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{
          minHeight: '100vh',
          padding: '100px 80px',
          background: '#f9f9f9'
        }}>
          <h2 style={{
            fontSize: '48px',
            color: '#5C7650',
            fontFamily: '"Quicksand", sans-serif',
            marginBottom: '30px'
          }}>Contact</h2>
          <p style={{
            fontSize: '20px',
            lineHeight: '1.8',
            color: '#333',
            fontFamily: '"Quicksand", sans-serif'
          }}>
            Email • LinkedIn • GitHub • Instagram
          </p>
        </section>
      </div>
    </div>
  );
}