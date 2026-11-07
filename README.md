# Wedding invitation

This is a lightweight, responsive static website. Its opening screen features a gold Ganesh line illustration, with a tap or three-second timer triggering a particle and smoke dissolve into the invitation. The invitation photos and art are local; it does not need a remote renderer.

The ceremony's one-tap calendar button detects Android, iOS/iPadOS, and other devices. Android opens a prefilled Google Calendar event; iOS/iPadOS and desktop download a generated `.ics` with 1-day and 2-hour `VALARM` reminders and the temple Maps link. Calendar apps control whether imported alarms become device notifications, and Google Calendar asks the guest to tap Save.

To preview from this folder, run `python -m http.server 8000` and open `http://localhost:8000`.

Tailwind utilities used by the calendar button are compiled locally into `tailwind.css`. Rebuild them with `npm install` followed by `npm run build:css`.

The ceremony time is shown as supplied: 11:00 PM–11:30 PM on 20 January 2027. The reception is listed from 4:30 PM onwards based on the supplied start time. The invitation omits couple names because none were included in the details.
