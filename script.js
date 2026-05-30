/**
 * CYBORG 2077 – Human × Machine Evolution
 * Custom Interactive JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
  });

  // ==========================================
  // 1. Custom Interactive Cyber Cursor
  // ==========================================
  const cursor = document.getElementById('custom-cursor');
  const cursorOutline = document.getElementById('custom-cursor-outline');
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Position solid dot instantly
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Lerp calculation for smooth outer crosshair outline tracing
  const animateOutline = () => {
    const delay = 8; // Lower value = faster track, higher value = smoother lag
    
    cursorX += (mouseX - cursorX) / delay;
    cursorY += (mouseY - cursorY) / delay;
    
    cursorOutline.style.left = cursorX + 'px';
    cursorOutline.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateOutline);
  };
  animateOutline();

  // Highlight cursor on hoverable nodes
  const hoverElements = document.querySelectorAll('a, button, .tech-option-item, .feature-card, .form-input');
  hoverElements.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    elem.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });

  // ==========================================
  // 2. Interactive Neural Particle Canvas
  // ==========================================
  const canvas = document.getElementById('neural-canvas');
  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  const particleCount = window.innerWidth < 768 ? 40 : 100;
  const connectionDistance = 120;

  // Handle canvas sizing
  const setCanvasSize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  setCanvasSize();
  window.addEventListener('resize', setCanvasSize);

  // Mouse coordinate mapping for neural link pulls
  let mouse = {
    x: null,
    y: null,
    radius: 180
  };

  window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Particle Blueprint
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.speedY = (Math.random() - 0.5) * 0.8;
      this.color = 'rgba(0, 245, 255, 0.7)'; // Cyan
    }

    update() {
      // Bounce check
      if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
      if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;

      // Update positions
      this.x += this.speedX;
      this.y += this.speedY;

      // Magnetize particles slightly to user cursor
      if (mouse.x !== null && mouse.y !== null) {
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          this.x += dx * force * 0.02; // Attract/Repel vector scale
          this.y += dy * force * 0.02;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 5;
      ctx.shadowColor = 'rgba(0, 245, 255, 0.8)';
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow for lines speedups
    }
  }

  // Populate network nodes
  const initParticles = () => {
    particlesArray = [];
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }
  };
  initParticles();

  // Draw connectors
  const connectParticles = () => {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          // Adjust opacity based on closeness
          let alpha = (1 - (distance / connectionDistance)) * 0.25;
          ctx.strokeStyle = `rgba(138, 43, 226, ${alpha})`; // Purple lines
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  };

  // Loop runner
  const animateParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    
    connectParticles();
    requestAnimationFrame(animateParticles);
  };
  animateParticles();

  // ==========================================
  // 3. HUD Scroll Tracking
  // ==========================================
  const header = document.getElementById('hud-header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==========================================
  // 4. Mobile Navigation Toggle Drawer
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const navAnchors = document.querySelectorAll('.nav-anchor');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navAnchors.forEach(anchor => {
    anchor.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ==========================================
  // 5. Interactive Technology Showcase Laboratory
  // ==========================================
  const techOptions = document.querySelectorAll('.tech-option-item');
  const techScreens = document.querySelectorAll('.tech-display-screen');

  techOptions.forEach(option => {
    option.addEventListener('click', () => {
      // 1. Clear current active state from side list
      techOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');

      // 2. Clear current screen active displays
      const targetId = option.getAttribute('data-target');
      techScreens.forEach(screen => {
        screen.classList.remove('active');
      });

      // 3. Render matching target display
      const targetScreen = document.getElementById(targetId);
      if (targetScreen) {
        targetScreen.classList.add('active');
      }

      // Update Top HUD System Indicators dynamically
      const statusText = document.getElementById('hud-status-text');
      const headerTitle = targetScreen.querySelector('.tech-display-header h4').textContent;
      statusText.textContent = `CORE ROUTE: ${headerTitle}`;
      statusText.style.color = '#8A2BE2'; // Toggle accent colors on selection
      setTimeout(() => {
        statusText.style.color = '#00F5FF';
      }, 500);
    });
  });

  // ==========================================
  // 6. IntersectionObserver Stats Counters
  // ==========================================
  const statsSection = document.getElementById('stats');
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const countUp = (element) => {
    const target = parseFloat(element.getAttribute('data-target'));
    const isFloat = target % 1 !== 0; // Check if counter needs decimal point precision
    const speed = 100; // Counter progression velocity
    const step = target / speed;
    let current = 0;

    const updateValue = () => {
      current += step;
      if (current >= target) {
        element.textContent = formatStatText(target, isFloat, element.id);
      } else {
        element.textContent = formatStatText(current, isFloat, element.id);
        requestAnimationFrame(updateValue);
      }
    };
    updateValue();
  };

  const formatStatText = (value, isFloat, id) => {
    let roundedValue = isFloat ? value.toFixed(1) : Math.round(value);
    
    // Custom suffix maps
    if (id === 'stat-efficiency' || id === 'stat-accuracy') {
      return roundedValue + '%';
    } else if (id === 'stat-connections') {
      return roundedValue + 'M';
    } else if (id === 'stat-uptime') {
      return roundedValue + '/7';
    }
    return roundedValue;
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        statNumbers.forEach(num => countUp(num));
        animated = true;
      }
    });
  }, { threshold: 0.3 });

  statsObserver.observe(statsSection);

  // ==========================================
  // 7. Real Network Connection & Contact Form Handler
  // ==========================================
  const contactForm = document.getElementById('cyber-contact-form');
  const terminalOut = document.getElementById('terminal-response');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userName = document.getElementById('contact-name').value.toUpperCase();
    const userEmail = document.getElementById('contact-email').value.toUpperCase();
    const userMessage = document.getElementById('contact-message').value;

    terminalOut.style.display = 'block';
    terminalOut.innerHTML = `
      [SYS_TERMINAL_OUT]: INITIALIZING DEEP CONNECTION LINK...<br>
      [SYS_TERMINAL_OUT]: PARSING CONSCIOUSNESS WAVEFORMS FOR ${userName}...
    `;

    // Helper to append terminal logs sequentially for absolute immersion
    const addTerminalLine = (text, delay) => {
      return new Promise(resolve => {
        setTimeout(() => {
          terminalOut.innerHTML += `<br>${text}`;
          terminalOut.scrollTop = terminalOut.scrollHeight;
          resolve();
        }, delay);
      });
    };

    try {
      await addTerminalLine(`[SYS_TERMINAL_OUT]: BRIDGING ENCRYPTED TUNNEL TO ${userEmail}...`, 600);
      await addTerminalLine(`[SYS_TERMINAL_OUT]: QUERYING CENTRAL DHCP ADAPTER...`, 500);

      // Real network call 1: Fetch client public IP
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const userIp = ipData.ip || '127.0.0.1';

      await addTerminalLine(`[SYS_TERMINAL_OUT]: <span style="color:#00F5FF;">ACQUIRED NODE IP: ${userIp}</span>`, 400);
      await addTerminalLine(`[SYS_TERMINAL_OUT]: ESTABLISHING UPLOAD PACKET TO MAINNET HOST...`, 500);

      // Real network call 2: POST form data package
      const submitResponse = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          message: userMessage,
          ip: userIp,
          timestamp: new Date().toISOString()
        })
      });

      const responseData = await submitResponse.json();
      const submissionId = responseData.id || Math.floor(Math.random() * 1000) + 100;

      await addTerminalLine(`[SYS_TERMINAL_OUT]: ENCRYPTED CORE HANDSHAKE SUCCESSFUL.`, 600);
      await addTerminalLine(`[SYS_TERMINAL_OUT]: <span style="color:#39FF14;">PACKET TRANSFERRED. UPLOAD ID: #CY-${submissionId}</span>`, 400);
      await addTerminalLine(`[SYS_TERMINAL_OUT]: SERVER CODE: 201 CREATED (STATUS: STABLE)`, 400);
      await addTerminalLine(`[SYS_TERMINAL_OUT]: <span style="color:#00F5FF; font-weight: bold;">ESTABLISHING CORE SECURE NEURAL LINK SUCCESSFUL. Welcome to Cyborg 2077.</span>`, 700);

    } catch (error) {
      // Graceful offline fallback
      await addTerminalLine(`[SYS_TERMINAL_OUT]: <span style="color:red;">ALERT: OFFLINE MODE / ENDPOINT BLOCKED.</span>`, 400);
      await addTerminalLine(`[SYS_TERMINAL_OUT]: SWITCHING TO COMPATIBILITY STATIC OVERLAY...`, 500);
      await addTerminalLine(`[SYS_TERMINAL_OUT]: COMPATIBILITY EMULATION: SUCCESSFUL.`, 600);
      await addTerminalLine(`[SYS_TERMINAL_OUT]: <span style="color:#00F5FF; font-weight: bold;">ESTABLISHING CORE SECURE NEURAL LINK SUCCESSFUL. Welcome to Cyborg 2077.</span>`, 600);
    }

    // Reset inputs smoothly
    setTimeout(() => {
      contactForm.reset();
      const inputs = contactForm.querySelectorAll('.form-input');
      inputs.forEach(input => {
        input.dispatchEvent(new Event('change'));
      });
    }, 4000);
  });
});
