(() => {
  const splash = document.querySelector('#intro-splash');
  const siteContent = document.querySelector('#site-content');

  if (splash && siteContent) {
    const canvas = splash.querySelector('.splash-particles');
    const context = canvas.getContext('2d');
    let hasEntered = false;
    let animationFrame = 0;
    let particles = [];
    let startTime = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const seedParticles = () => {
      const count = width < 600 ? 72 : 116;
      particles = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.35 + Math.random() * 2.7;
        return {
          x: width / 2 + (Math.random() - 0.5) * 26,
          y: height / 2 - 24 + (Math.random() - 0.5) * 34,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.42,
          size: 0.8 + Math.random() * 2.7,
          life: 680 + Math.random() * 1050,
          delay: Math.random() * 220,
        };
      });
    };

    const paintSmoke = (progress) => {
      const x = width / 2;
      const y = height / 2 - 12;
      const radius = 35 + progress * Math.min(width, height) * 0.38;
      const alpha = Math.max(0, 0.15 * (1 - progress));
      const smoke = context.createRadialGradient(x, y, 3, x, y, radius);
      smoke.addColorStop(0, `rgba(255, 229, 176, ${alpha})`);
      smoke.addColorStop(0.33, `rgba(194, 162, 116, ${alpha * 0.58})`);
      smoke.addColorStop(1, 'rgba(194, 162, 116, 0)');
      context.fillStyle = smoke;
      context.fillRect(0, 0, width, height);
    };

    const drawParticles = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(1, elapsed / 1750);
      context.clearRect(0, 0, width, height);
      paintSmoke(progress);

      for (const particle of particles) {
        const age = elapsed - particle.delay;
        if (age <= 0 || age >= particle.life) continue;
        const fade = 1 - age / particle.life;
        const seconds = age / 16.67;
        const x = particle.x + particle.vx * seconds * 1.8;
        const y = particle.y + particle.vy * seconds * 1.8 + 0.015 * seconds * seconds;
        context.beginPath();
        context.fillStyle = `rgba(255, ${212 + Math.round(fade * 26)}, ${138 + Math.round(fade * 61)}, ${fade * 0.86})`;
        context.shadowColor = '#e9bd71';
        context.shadowBlur = particle.size * 5;
        context.arc(x, y, particle.size * (0.42 + fade * 0.55), 0, Math.PI * 2);
        context.fill();
      }
      context.shadowBlur = 0;

      if (progress < 1) animationFrame = requestAnimationFrame(drawParticles);
      else context.clearRect(0, 0, width, height);
    };

    const enterInvitation = () => {
      if (hasEntered) return;
      hasEntered = true;
      window.clearTimeout(autoEnter);
      splash.classList.add('is-dissolving');
      splash.setAttribute('aria-hidden', 'true');
      splash.removeAttribute('role');
      splash.removeAttribute('tabindex');
      siteContent.inert = false;
      siteContent.removeAttribute('aria-hidden');
      siteContent.classList.add('is-revealed');
      document.body.classList.remove('intro-pending');
      resizeCanvas();
      seedParticles();
      startTime = performance.now();
      animationFrame = requestAnimationFrame(drawParticles);
      window.setTimeout(() => splash.remove(), 1900);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    splash.addEventListener('click', enterInvitation);
    splash.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        enterInvitation();
      }
    });
    const autoEnter = window.setTimeout(enterInvitation, 3000);
  }

  const target = new Date('2027-01-20T11:00:00+05:30').getTime();
  const countdown = document.querySelector('#countdown');
  const fields = {
    days: countdown?.querySelector('[data-days]'),
    hours: countdown?.querySelector('[data-hours]'),
    minutes: countdown?.querySelector('[data-minutes]'),
    seconds: countdown?.querySelector('[data-seconds]'),
  };
  let timer = null;

  function updateCountdown() {
    if (!countdown) return;
    const remaining = Math.max(0, target - Date.now());
    const days = Math.floor(remaining / 86_400_000);
    const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
    const minutes = Math.floor((remaining % 3_600_000) / 60_000);
    const seconds = Math.floor((remaining % 60_000) / 1_000);
    fields.days.textContent = String(days).padStart(2, '0');
    fields.hours.textContent = String(hours).padStart(2, '0');
    fields.minutes.textContent = String(minutes).padStart(2, '0');
    fields.seconds.textContent = String(seconds).padStart(2, '0');
    if (remaining === 0 && timer !== null) clearInterval(timer);
  }

  updateCountdown();
  timer = window.setInterval(updateCountdown, 1000);

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();

(() => {
  const trigger = document.querySelector('#calendar-trigger');
  const feedback = document.querySelector('#calendar-feedback');
  if (!trigger || !feedback) return;

  const event = {
    title: 'Vishnu & Meenakshi — Wedding Muhurtham',
    venue: 'Mankottathil Sree Dharmasastha Bhuvaneshwari Kshethram',
    start: new Date('2027-01-20T11:00:00+05:30'),
    end: new Date('2027-01-20T11:30:00+05:30'),
    timezone: 'Asia/Kolkata',
    maps: 'https://maps.app.goo.gl/MU1248SxpvKfSPux9',
  };

  const getPlatform = () => {
    const userAgent = navigator.userAgent || '';
    const platform = navigator.platform || '';
    const isAppleMobile = /iPhone|iPad|iPod/i.test(userAgent)
      || (platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isAppleMobile) return 'ios';
    if (/Android/i.test(userAgent)) return 'android';
    return 'other';
  };

  const fallbackLink = document.querySelector('#calendar-ics-fallback');
  const googleUrl = new URL('https://calendar.google.com/calendar/render');
  const isoUtc = (date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const description = [
    'Join Vishnu and Meenakshi for their wedding Muhurtham.',
    'Muhurtham: 11:00 AM–11:30 AM IST on Wednesday, 20 January 2027.',
    `Venue: ${event.venue}.`,
    `Google Maps directions: ${event.maps}`,
  ].join('\n\n');
  googleUrl.searchParams.set('action', 'TEMPLATE');
  googleUrl.searchParams.set('text', event.title);
  googleUrl.searchParams.set('dates', `${isoUtc(event.start)}/${isoUtc(event.end)}`);
  googleUrl.searchParams.set('ctz', event.timezone);
  googleUrl.searchParams.set('location', event.venue);
  googleUrl.searchParams.set('details', description);

  const platform = getPlatform();
  const inAppBrowser = /WhatsApp|FBAN|FBAV|Instagram|; wv\)/i.test(navigator.userAgent || '');
  const icsUrl = new URL('assets/vishnu-meenakshi-wedding.ics', window.location.href);

  if (fallbackLink) {
    if (platform === 'android') {
      fallbackLink.href = googleUrl.href;
      fallbackLink.textContent = 'If the calendar app does not open, use Google Calendar';
    } else if (platform === 'ios') {
      fallbackLink.href = icsUrl.href;
      fallbackLink.textContent = 'Open calendar file (.ics)';
    } else {
      fallbackLink.href = icsUrl.href;
      fallbackLink.textContent = 'Download calendar file (.ics)';
    }
  }

  if (platform === 'ios') {
    feedback.textContent = 'Opens a ready-filled calendar file. Review it and confirm Add to Calendar.';
  } else if (platform === 'android') {
    feedback.textContent = 'Opens your calendar with the wedding details filled in. Review and tap Save.';
  }

  trigger.addEventListener('click', () => {
    if (platform === 'ios') {
      feedback.textContent = 'Opening the wedding calendar file. Review it and confirm Add to Calendar.';
      window.location.href = icsUrl.href;
      return;
    }

    if (platform === 'android' && !inAppBrowser) {
      const encodeIntentValue = (value) => encodeURIComponent(value);
      const androidIntentUrl = [
        'intent://com.android.calendar/events#Intent',
        'scheme=content',
        'action=android.intent.action.INSERT',
        'type=vnd.android.cursor.dir/event',
        `S.title=${encodeIntentValue(event.title)}`,
        `l.beginTime=${event.start.getTime()}`,
        `l.endTime=${event.end.getTime()}`,
        `S.eventLocation=${encodeIntentValue(`${event.venue} — ${event.maps}`)}`,
        `S.description=${encodeIntentValue(description)}`,
        `S.browser_fallback_url=${encodeIntentValue(googleUrl.href)}`,
        'end',
      ].join(';');
      feedback.textContent = 'Opening your calendar. Review the wedding details and tap Save.';
      window.location.href = androidIntentUrl;
      return;
    }

    feedback.textContent = 'Opening Google Calendar with the wedding details filled in. Review and tap Save.';
    window.location.href = googleUrl.href;
  });
})();
