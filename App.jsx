import { useState, useEffect } from 'react';

const Hooks = () => {
  const [count, setCount] = useState(0);
  const [particles, setParticles] = useState([]);
  const [isIncrement, setIsIncrement] = useState(true);

  // Create particle explosion effect
  const createParticles = (isPositive) => {
    const newParticles = [];
    for (let i = 0; i < 12; i++) {
      newParticles.push({
        id: Date.now() + i,
        emoji: isPositive ? '✨' : '💫',
        left: 50 + (Math.random() - 0.5) * 30,
        rotation: Math.random() * 360
      });
    }
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  };

  const handleIncrement = () => {
    setCount(count + 1);
    setIsIncrement(true);
    createParticles(true);
  };

  const handleDecrement = () => {
    setCount(count - 1);
    setIsIncrement(false);
    createParticles(false);
  };

  const handleReset = () => {
    setCount(0);
    createParticles(true);
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* App Container with Cosmic Background */
        .app-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, 
            #0f0c29 0%, 
            #302b63 25%, 
            #24243e 50%, 
            #0f2027 75%, 
            #203a43 100%
          );
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        /* Animated cosmic gradient background */
        @keyframes cosmicShift {
          0% { 
            background-position: 0% 50%;
            filter: hue-rotate(0deg);
          }
          50% { 
            background-position: 100% 50%;
            filter: hue-rotate(30deg);
          }
          100% { 
            background-position: 0% 50%;
            filter: hue-rotate(0deg);
          }
        }

        .app-container::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, 
            #1a0033, #2d1b69, #1e3a5f, #0a2540, 
            #4a1c6b, #2c0735, #1a0033
          );
          background-size: 400% 400%;
          animation: cosmicShift 20s ease infinite;
          opacity: 0.7;
        }

        /* Starfield effect */
        .app-container::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, white, transparent),
            radial-gradient(2px 2px at 60px 70px, white, transparent),
            radial-gradient(1px 1px at 50px 50px, white, transparent),
            radial-gradient(1px 1px at 130px 80px, white, transparent),
            radial-gradient(2px 2px at 90px 10px, white, transparent);
          background-size: 200px 200px;
          animation: starTwinkle 8s linear infinite;
          opacity: 0.4;
        }

        @keyframes starTwinkle {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }

        /* Particle System */
        .particle {
          position: absolute;
          font-size: 1.5rem;
          pointer-events: none;
          animation: explode 1s ease-out forwards;
          z-index: 100;
        }

        @keyframes explode {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1.5) rotate(var(--rotation));
            opacity: 0;
          }
        }

        .particle:nth-child(1) { --tx: 80px; --ty: -80px; }
        .particle:nth-child(2) { --tx: -80px; --ty: -80px; }
        .particle:nth-child(3) { --tx: 80px; --ty: 80px; }
        .particle:nth-child(4) { --tx: -80px; --ty: 80px; }
        .particle:nth-child(5) { --tx: 100px; --ty: 0px; }
        .particle:nth-child(6) { --tx: -100px; --ty: 0px; }
        .particle:nth-child(7) { --tx: 0px; --ty: -100px; }
        .particle:nth-child(8) { --tx: 0px; --ty: 100px; }
        .particle:nth-child(9) { --tx: 60px; --ty: -60px; }
        .particle:nth-child(10) { --tx: -60px; --ty: 60px; }
        .particle:nth-child(11) { --tx: 70px; --ty: 40px; }
        .particle:nth-child(12) { --tx: -40px; --ty: -70px; }

        /* Floating Web Dev Icons Background */
        .floating-icons {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .floating-icon {
          position: absolute;
          font-size: 3rem;
          opacity: 0.5;
          animation: floatIcon 18s infinite ease-in-out, iconGlow 3s ease-in-out infinite;
          filter: drop-shadow(0 0 20px rgba(147, 112, 219, 1)) 
                  drop-shadow(0 0 40px rgba(30, 144, 255, 0.8));
          background: radial-gradient(circle, rgba(147, 112, 219, 0.3), transparent);
          padding: 15px;
          border-radius: 50%;
        }

        .floating-icon:nth-child(1) { left: 10%; top: 20%; animation-delay: 0s; }
        .floating-icon:nth-child(2) { left: 80%; top: 30%; animation-delay: 2s; font-size: 3.5rem; }
        .floating-icon:nth-child(3) { left: 15%; top: 70%; animation-delay: 4s; font-size: 2.5rem; }
        .floating-icon:nth-child(4) { left: 85%; top: 60%; animation-delay: 6s; }
        .floating-icon:nth-child(5) { left: 50%; top: 10%; animation-delay: 8s; font-size: 4rem; }
        .floating-icon:nth-child(6) { left: 30%; top: 85%; animation-delay: 10s; font-size: 2.8rem; }
        .floating-icon:nth-child(7) { left: 70%; top: 15%; animation-delay: 12s; font-size: 3.2rem; }
        .floating-icon:nth-child(8) { left: 5%; top: 50%; animation-delay: 14s; }
        .floating-icon:nth-child(9) { left: 90%; top: 80%; animation-delay: 16s; font-size: 3.5rem; }
        .floating-icon:nth-child(10) { left: 45%; top: 90%; animation-delay: 18s; font-size: 2.5rem; }
        .floating-icon:nth-child(11) { left: 25%; top: 40%; animation-delay: 3s; font-size: 3rem; }
        .floating-icon:nth-child(12) { left: 65%; top: 75%; animation-delay: 7s; font-size: 2.8rem; }
        .floating-icon:nth-child(13) { left: 35%; top: 25%; animation-delay: 11s; font-size: 3.3rem; }
        .floating-icon:nth-child(14) { left: 75%; top: 45%; animation-delay: 15s; font-size: 2.6rem; }

        @keyframes floatIcon {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translateY(-40px) rotate(90deg) scale(1.1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg) scale(1.05);
            opacity: 0.6;
          }
          75% {
            transform: translateY(-50px) rotate(270deg) scale(1.15);
            opacity: 0.8;
          }
        }

        @keyframes iconGlow {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(147, 112, 219, 1)) 
                    drop-shadow(0 0 40px rgba(30, 144, 255, 0.8));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(147, 112, 219, 1.5)) 
                    drop-shadow(0 0 60px rgba(30, 144, 255, 1.2))
                    drop-shadow(0 0 80px rgba(32, 178, 170, 0.8));
          }
        }

        /* Animated Background Nebula Shapes */
        .background-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.12;
          animation: float 25s infinite ease-in-out;
          filter: blur(60px);
        }

        .shape-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #6a0dad, #4b0082);
          top: -150px;
          left: -150px;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #1e90ff, #000080);
          bottom: -100px;
          right: -100px;
          animation-delay: 8s;
        }

        .shape-3 {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, #9370db, #483d8b);
          top: 50%;
          right: 10%;
          animation-delay: 16s;
        }

        .shape-4 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, #20b2aa, #008b8b);
          top: 20%;
          left: 40%;
          animation-delay: 12s;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          33% {
            transform: translate(60px, 60px) rotate(120deg) scale(1.15);
          }
          66% {
            transform: translate(-40px, 90px) rotate(240deg) scale(0.95);
          }
        }

        /* Counter Card */
        .counter-card {
          background: rgba(20, 20, 40, 0.85);
          border-radius: 40px;
          padding: 60px 50px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6),
                      inset 0 0 60px rgba(147, 112, 219, 0.1);
          position: relative;
          z-index: 10;
          max-width: 500px;
          width: 100%;
          backdrop-filter: blur(20px);
          animation: fadeIn 0.8s ease-out;
          border: 2px solid rgba(147, 112, 219, 0.3);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .glow-effect {
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          background: linear-gradient(45deg, 
            #9370db, #6a0dad, #1e90ff, #20b2aa, #4169e1, #9370db
          );
          border-radius: 40px;
          z-index: -1;
          filter: blur(25px);
          opacity: 0.8;
          animation: cosmicGlow 5s linear infinite;
          background-size: 400% 400%;
        }

        @keyframes cosmicGlow {
          0% {
            background-position: 0% 50%;
            filter: blur(25px) hue-rotate(0deg);
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
            filter: blur(25px) hue-rotate(360deg);
          }
        }

        /* Title */
        .title {
          text-align: center;
          font-size: 3rem;
          font-weight: 900;
          background: linear-gradient(135deg, #9370db 0%, #00bfff 50%, #20b2aa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 50px;
          letter-spacing: -2px;
          animation: titleGlow 3s ease-in-out infinite;
          filter: drop-shadow(0 0 20px rgba(147, 112, 219, 0.6));
        }

        @keyframes titleGlow {
          0%, 100% {
            filter: drop-shadow(0 0 15px rgba(147, 112, 219, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(147, 112, 219, 0.9));
          }
        }

        .title-icon {
          display: inline-block;
          animation: bounce 2s infinite, rotate360 5s linear infinite;
          font-size: 3.2rem;
          filter: drop-shadow(0 5px 15px rgba(147, 112, 219, 0.6));
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.15);
          }
        }

        @keyframes rotate360 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Count Display */
        .count-display {
          display: flex;
          justify-content: center;
          margin: 50px 0;
          perspective: 1000px;
        }

        .count-circle {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6a0dad 0%, #1e90ff 50%, #20b2aa 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 15px 50px rgba(106, 13, 173, 0.6),
                      0 0 50px rgba(30, 144, 255, 0.4);
          position: relative;
          animation: pulse 2.5s infinite, rotate3d 8s linear infinite;
          border: 4px solid rgba(147, 112, 219, 0.4);
        }

        .count-circle.increment {
          animation: pulse 2.5s infinite, rotate3d 8s linear infinite, scaleUp 0.3s ease;
        }

        .count-circle.decrement {
          animation: pulse 2.5s infinite, rotate3d 8s linear infinite, scaleDown 0.3s ease;
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 15px 50px rgba(106, 13, 173, 0.6),
                        0 0 50px rgba(30, 144, 255, 0.4);
          }
          50% {
            box-shadow: 0 20px 60px rgba(106, 13, 173, 0.9),
                        0 0 80px rgba(30, 144, 255, 0.7);
          }
        }

        @keyframes rotate3d {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }

        @keyframes scaleUp {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        @keyframes scaleDown {
          0% { transform: scale(1); }
          50% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }

        .count-number {
          font-size: 5rem;
          font-weight: 900;
          color: white;
          text-shadow: 0 5px 20px rgba(0, 0, 0, 0.5),
                       0 0 30px rgba(147, 112, 219, 0.8);
          animation: numberPop 0.3s ease;
        }

        @keyframes numberPop {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }

        /* Button Container */
        .button-container {
          display: flex;
          gap: 20px;
          margin-bottom: 25px;
        }

        /* Counter Buttons */
        .counter-button {
          flex: 1;
          padding: 22px 35px;
          border: none;
          border-radius: 20px;
          font-size: 1.2rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .counter-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .counter-button:hover::before {
          width: 400px;
          height: 400px;
        }

        .counter-button:active {
          transform: translateY(2px) scale(0.95);
        }

        .increment-btn {
          background: linear-gradient(135deg, #1e90ff 0%, #00bfff 100%);
          color: white;
        }

        .increment-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 35px rgba(30, 144, 255, 0.6);
        }

        .decrement-btn {
          background: linear-gradient(135deg, #9370db 0%, #6a0dad 100%);
          color: white;
        }

        .decrement-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 35px rgba(147, 112, 219, 0.6);
        }

        .button-icon {
          font-size: 2rem;
          position: relative;
          z-index: 1;
          animation: iconBounce 1s ease-in-out infinite;
        }

        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        .button-text {
          position: relative;
          z-index: 1;
        }

        /* Reset Button */
        .reset-button {
          width: 100%;
          padding: 18px;
          border: 3px solid transparent;
          background: linear-gradient(rgba(20, 20, 40, 0.9), rgba(20, 20, 40, 0.9)) padding-box,
                      linear-gradient(135deg, #9370db, #1e90ff, #20b2aa) border-box;
          border-radius: 20px;
          font-size: 1.1rem;
          font-weight: 800;
          color: #9370db;
          cursor: pointer;
          transition: all 0.4s ease;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .reset-button:hover {
          background: linear-gradient(135deg, #9370db, #1e90ff, #20b2aa);
          color: white;
          transform: scale(1.03);
          box-shadow: 0 10px 40px rgba(147, 112, 219, 0.5);
        }

        .reset-button:active {
          transform: scale(0.97);
        }

        .reset-icon {
          font-size: 1.4rem;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Counter Info */
        .counter-info {
          text-align: center;
          min-height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .info-text {
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0;
          animation: slideIn 0.4s ease-out;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          border-radius: 30px;
          background: rgba(147, 112, 219, 0.2);
          color: #9370db;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .info-text.positive {
          color: #00bfff;
          background: rgba(0, 191, 255, 0.2);
        }

        .info-text.negative {
          color: #9370db;
          background: rgba(147, 112, 219, 0.2);
        }

        .status-icon {
          font-size: 1.5rem;
          animation: statusPulse 1s infinite;
        }

        @keyframes statusPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .counter-card {
            padding: 45px 35px;
          }
          
          .title {
            font-size: 2.2rem;
          }

          .title-icon {
            font-size: 2.5rem;
          }
          
          .count-circle {
            width: 170px;
            height: 170px;
          }
          
          .count-number {
            font-size: 3.5rem;
          }
          
          .button-container {
            flex-direction: column;
          }

          .floating-icon {
            font-size: 2.5rem;
          }
        }
      `}</style>
      
      <div className="app-container">
        {/* Floating Web Dev Icons Background */}
        <div className="floating-icons">
          <div className="floating-icon">💻</div>
          <div className="floating-icon">🌐</div>
          <div className="floating-icon">⚛️</div>
          <div className="floating-icon">🎨</div>
          <div className="floating-icon">📱</div>
          <div className="floating-icon">🔧</div>
          <div className="floating-icon">⚡</div>
          <div className="floating-icon">🚀</div>
          <div className="floating-icon">💡</div>
          <div className="floating-icon">🎯</div>
          <div className="floating-icon">🖥️</div>
          <div className="floating-icon">📊</div>
          <div className="floating-icon">🛠️</div>
          <div className="floating-icon">🌟</div>
        </div>

        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
        
        <div className="counter-card">
          <div className="glow-effect"></div>
          
          <h1 className="title">
            <span className="title-icon">💻</span>
            Dev Counter
            <span className="title-icon">💻</span>
          </h1>
          
          <div className="count-display">
            <div className={`count-circle ${isIncrement ? 'increment' : 'decrement'}`}>
              <span className="count-number" key={count}>{count}</span>
              {particles.map((particle) => (
                <div
                  key={particle.id}
                  className="particle"
                  style={{
                    left: `${particle.left}%`,
                    top: '50%',
                    '--rotation': `${particle.rotation}deg`
                  }}
                >
                  {particle.emoji}
                </div>
              ))}
            </div>
          </div>
          
          <div className="button-container">
            <button 
              className="counter-button increment-btn"
              onClick={handleIncrement}
            >
              <span className="button-icon">⬆️</span>
              <span className="button-text">Add</span>
            </button>
            
            <button 
              className="counter-button decrement-btn"
              onClick={handleDecrement}
            >
              <span className="button-icon">⬇️</span>
              <span className="button-text">Remove</span>
            </button>
          </div>
          
          <button 
            className="reset-button"
            onClick={handleReset}
          >
            <span className="reset-icon">🔄</span>
            <span>Reset Counter</span>
          </button>
          
          <div className="counter-info">
            {count === 0 && (
              <p className="info-text">
                <span className="status-icon">💻</span>
                Start counting!
              </p>
            )}
            {count > 0 && (
              <p className="info-text positive">
                <span className="status-icon">🚀</span>
                Going up! Keep it up!
              </p>
            )}
            {count < 0 && (
              <p className="info-text negative">
                <span className="status-icon">📉</span>
                Going down!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hooks;