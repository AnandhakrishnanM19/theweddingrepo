# Wedding invitation

This is a lightweight, responsive static website. Its opening screen features a gold Ganesh line illustration, with a tap or three-second timer triggering a particle and smoke dissolve into the invitation. The invitation photos and art are local; it does not need a remote renderer.

The ceremony section has a calendar dialog with a prefilled Google Calendar event and a generated `.ics` download for Apple, Outlook, and compatible calendar apps. The `.ics` includes 1-day and 2-hour `VALARM` reminders and the temple Maps link. Calendar apps control whether imported alarms become device notifications; Google Calendar requires tapping Save on the prefilled event.

To preview from this folder, run `python -m http.server 8000` and open `http://localhost:8000`.

Tailwind utilities used by the calendar dialog are compiled locally into `tailwind.css`. Rebuild them with `npm install` followed by `npm run build:css`.

The ceremony time is shown as supplied: 11:00 PM–11:30 PM on 20 January 2027. The reception is listed from 4:30 PM onwards based on the supplied start time. The invitation omits couple names because none were included in the details.
