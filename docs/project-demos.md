# Project demos

`src/data.json` holds each project's optional media and live-demo URL. Local
assets go in `public/demos`. French and English share the same media; captions
and controls are translated by `src/locales/messages.js`.

```json
{
  "media": {
    "kind": "video",
    "src": "/demos/project-demo.mp4",
    "poster": "/demos/project-poster.png",
    "aspectRatio": "16 / 9",
    "sampleData": true
  },
  "demoUrl": "https://your-live-demo.example"
}
```

Supported kinds: `video`, `image`, and `gif`. GIFs should include a still
`poster` so reduced-motion users can see a static preview. Videos play only
when requested, with native controls and no autoplay; they preload no video
data. Clicking anywhere on a list card opens its details; cards also support
keyboard activation. List cards all keep the same graphic cover and layout.
Media, source links, and live-demo links appear only in the open project-details
panel, so interactive controls are never nested inside a clickable card.

## SpaceMind recording

The committed 13-second MP4 records the actual SpaceMind terminal application,
not an invented interface or scripted animation. It uses disposable sample
files and a temporary SQLite database in `/tmp`. A scan is run with local AI
disabled, then the recording opens its saved results and browses Explore,
Review, and Duplicates. No file actions are performed. Terminal output is
rendered from the application's ANSI stream with Pillow and encoded with
ffmpeg. The sample folder and database are removed when recording finishes.

To regenerate on Linux with Pillow and ffmpeg installed:

```sh
python3 scripts/record_spacemind.py /path/to/spacemind/target/release/spacemind
```

The CodeCell screenshot comes from that repository's documented screenshot,
`frontend/public/codecell-hero.png`. Recording real execution additionally
requires its gateway, frontend, Firecracker artifacts, and access to `/dev/kvm`.

## CodeCell collaboration recording

`codecell-demo.mp4` replaces the original screenshot in the open details panel.
It records the current frontend, actual Hocuspocus collaboration server, tRPC
gateway, and Go/Firecracker execution service. Two Firefox windows, with the
sample identities Stanley and Alex, are shown side by side. Their cursors
stay on separate lines while edits sync in both directions. The shared Python
code is executed in a real Firecracker microVM; both clients show its output
and `exit 0`. File creation is also shown in both clients. The recording
checks that source text, output, and file lists agree between the clients.

The host exposes `/dev/kvm` outside the restricted shell. The VM's writable
root filesystem is copied to `/tmp`; the original repository artifacts are
not modified. Output comes from the actual Python interpreter in the guest,
not from a mocked backend.

The frontend was run from an isolated copy in `/tmp`; only its Monaco asset
loader was configured to use the repository's installed local assets instead
of the default CDN. A recording-only reference to each actual Monaco editor
allows automation to place its cursor explicitly. The original CodeCell
checkout was not changed. Frames captured directly from both browser windows
were arranged side by side and encoded as H.264 MP4 with ffmpeg.

## SMS booking recording

`sms-booking-demo.mp4` shows the user's actual phone recording alongside a
recording of Google Calendar. Real Twilio messages, OpenAI extraction, and
Google Calendar event creation were used; conversation storage was temporary
in memory for this demo. The event appears after YES confirmation and its
details are opened. Footage is played at 2× speed, with a brief Maps-tab detour
removed. Calendar and phone footage are aligned around the booking confirmation.
The text requested 3 PM EST, so the real event is 4–6 PM Montreal time.

The private phone number and creator email in the Calendar popup are covered
before encoding. Original recordings are excluded from Git and never served
from `public`. The public video uses H.264 with fast-start MP4 metadata and
has no audio. It appears only inside the SMS project's details panel.
