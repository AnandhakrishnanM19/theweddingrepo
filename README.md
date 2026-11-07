# Wedding invitation

This is a lightweight, responsive static website. Its opening screen features a gold Ganesh line illustration, with a tap or three-second timer triggering a particle and smoke dissolve into the invitation. The invitation photos and art are local; it does not need a remote renderer.

The ceremony's “Mark the Date” button requests Google Calendar access and creates the event in the visitor's primary calendar. It confirms success only after Google Calendar accepts the event. Visitors who do not use Google Calendar, or who decline access, can download an `.ics` file with 1-day and 2-hour reminders and the temple Maps link; they must confirm the import in their calendar app. Google Calendar API access must be enabled for the OAuth project, and the deployed site origin must be listed as an authorized JavaScript origin. Apple and other calendar apps control whether imported alarms become device notifications.

To preview from this folder, run `python -m http.server 8000` and open `http://localhost:8000`.

Tailwind utilities used by the calendar button are compiled locally into `tailwind.css`. Rebuild them with `npm install` followed by `npm run build:css`.

The ceremony time is shown as updated: 11:00 AM–11:30 AM on 20 January 2027. The reception is listed from 4:30 PM onwards based on the supplied start time. The invitation omits couple names because none were included in the details.
