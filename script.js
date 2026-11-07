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
    title: 'Wedding Muhurtham | Kerala Wedding',
    venue: 'Mankottathil Sree Dharmasastha Bhuvaneshwari Kshethram',
    start: new Date('2027-01-20T11:00:00+05:30'),
    end: new Date('2027-01-20T11:30:00+05:30'),
    timezone: 'Asia/Kolkata',
    maps: 'https://maps.app.goo.gl/MU1248SxpvKfSPux9',
  };

  const directions = `Google Maps directions: ${event.maps}`;
  const description = [
    'Join us for the wedding ceremony and Muhurtham.',
    'Muhurtham: 11:00 AM–11:30 AM IST on Wednesday, 20 January 2027.',
    `Venue: ${event.venue}.`,
    directions,
  ].join('\n\n');

  const isoUtc = (date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const escapeIcs = (value) => value
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');

  const foldIcsLine = (line) => {
    const encoder = new TextEncoder();
    let output = '';
    let current = '';
    let byteCount = 0;
    for (const character of line) {
      const size = encoder.encode(character).length;
      if (byteCount + size > 75) {
        output += `${current}\r\n `;
        current = '';
        byteCount = 1;
      }
      current += character;
      byteCount += size;
    }
    return output + current;
  };

  const buildIcs = () => {
    const stamp = isoUtc(new Date());
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Invitation//Kerala Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:wedding-muhurtham-20270120@theweddingrepo',
      `DTSTAMP:${stamp}`,
      `DTSTART:${isoUtc(event.start)}`,
      `DTEND:${isoUtc(event.end)}`,
      `SUMMARY:${escapeIcs(event.title)}`,
      `LOCATION:${escapeIcs(`${event.venue} — ${event.maps}`)}`,
      `URL:${event.maps}`,
      `DESCRIPTION:${escapeIcs(description)}`,
      'STATUS:CONFIRMED',
      'TRANSP:OPAQUE',
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      'TRIGGER:-P1D',
      `DESCRIPTION:${escapeIcs('Tomorrow is the wedding, get ready!')}`,
      'END:VALARM',
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      'TRIGGER:-PT2H',
      `DESCRIPTION:${escapeIcs('Muhurtham begins in two hours, at 11:00 AM IST.')}`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ];
    return `${lines.map(foldIcsLine).join('\r\n')}\r\n`;
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

  const googleClientId = '1067247521364-fukj8q6alg1n98t0o7ke4htsccormet1.apps.googleusercontent.com';
  const googleScope = 'https://www.googleapis.com/auth/calendar.events.owned';
  const eventId = 'a20270120muhurthamc0ffee';
  const fallbackLink = document.querySelector('#calendar-ics-fallback');
  let tokenClient = null;
  let isSaving = false;
  let isSaved = false;

  const setFallback = (message) => {
    feedback.textContent = message;
    if (fallbackLink) fallbackLink.hidden = false;
    trigger.disabled = false;
    trigger.removeAttribute('aria-busy');
    isSaving = false;
  };

  const markSaved = (message) => {
    feedback.textContent = message;
    trigger.disabled = true;
    trigger.removeAttribute('aria-busy');
    trigger.classList.add('is-saved');
    isSaving = false;
    isSaved = true;
    if (fallbackLink) fallbackLink.hidden = true;
  };

  const saveToGoogleCalendar = async (accessToken) => {
    const eventPayload = {
      id: eventId,
      summary: event.title,
      description,
      location: event.venue,
      start: { dateTime: event.start.toISOString(), timeZone: event.timezone },
      end: { dateTime: event.end.toISOString(), timeZone: event.timezone },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 1440 },
          { method: 'popup', minutes: 120 },
        ],
      },
      visibility: 'private',
    };

    try {
      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventPayload),
      });

      if (response.status === 409) {
        markSaved('This wedding is already marked in your Google Calendar.');
        return;
      }
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        const reason = error.error?.message || `Google Calendar returned ${response.status}.`;
        throw new Error(reason);
      }

      markSaved('Date marked in your Google Calendar.');
    } catch (error) {
      setFallback(`Google Calendar could not save the date. ${error.message} You can download the .ics instead.`);
    }
  };

  const handleTokenResponse = (tokenResponse) => {
    if (tokenResponse.error || !tokenResponse.access_token) {
      setFallback('Google Calendar access was not granted. You can download the .ics instead.');
      return;
    }
    void saveToGoogleCalendar(tokenResponse.access_token);
  };

  const initializeGoogleAuth = () => {
    const oauth = window.google?.accounts?.oauth2;
    if (!oauth || tokenClient) return;
    tokenClient = oauth.initTokenClient({
      client_id: googleClientId,
      scope: googleScope,
      callback: handleTokenResponse,
      error_callback: (error) => {
        setFallback(error.type === 'popup_closed'
          ? 'Google Calendar sign-in was closed. You can try again or download the .ics instead.'
          : 'Google Calendar could not open. You can try again or download the .ics instead.');
      },
    });
  };

  const googleIdentityScript = document.querySelector('#google-identity-script');
  initializeGoogleAuth();
  googleIdentityScript?.addEventListener('load', initializeGoogleAuth, { once: true });

  const downloadCalendarFile = () => {
    const blob = new Blob([buildIcs()], { type: 'text/calendar;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);
    const download = document.createElement('a');
    download.href = objectUrl;
    download.download = 'wedding-muhurtham-20-january-2027.ics';
    document.body.append(download);
    download.click();
    download.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
  };

  fallbackLink?.addEventListener('click', (clickEvent) => {
    clickEvent.preventDefault();
    downloadCalendarFile();
    const platform = getPlatform();
    feedback.textContent = platform === 'ios'
      ? 'The calendar file is ready. Open it and confirm Add on your iPhone or iPad.'
      : 'The .ics file is downloaded. Open it with your calendar app to add the event.';
  });

  trigger.addEventListener('click', () => {
    if (isSaving || isSaved) return;
    initializeGoogleAuth();
    if (!tokenClient) {
      setFallback('Google Calendar is still loading or unavailable. Try again, or download the .ics instead.');
      return;
    }

    isSaving = true;
    trigger.disabled = true;
    trigger.setAttribute('aria-busy', 'true');
    feedback.textContent = 'Connecting to Google Calendar…';
    try {
      tokenClient.requestAccessToken({ prompt: '' });
    } catch {
      setFallback('Google Calendar could not open. Try again, or download the .ics instead.');
    }
  });
})();
