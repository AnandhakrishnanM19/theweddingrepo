# Wedding invitation

This is a lightweight, responsive static website. Its opening screen features a gold Ganesh line illustration, with a tap or three-second timer triggering a particle and smoke dissolve into the invitation. The invitation photos and art are local; it does not need a remote renderer.

The ceremony's “Mark the Date” button opens a prefilled Google Calendar event on Android and desktop. On iPhone/iPad it downloads an `.ics` file with 1-day and 2-hour reminders; the file can also be downloaded from the link below the button. Guests must confirm the event in their calendar app. Calendar apps control whether imported alarms become device notifications. The invitation does not use Google OAuth credentials.

To preview from this folder, run `python -m http.server 8000` and open `http://localhost:8000`.

Tailwind utilities used by the calendar button are compiled locally into `tailwind.css`. Rebuild them with `npm install` followed by `npm run build:css`.

The ceremony time is 11:00 AM–11:30 AM on 20 January 2027. The reception is listed from 4:30 PM onwards based on the supplied start time. The invitation is for Vishnu and Meenakshi.
