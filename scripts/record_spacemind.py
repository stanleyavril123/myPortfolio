"""Record the real SpaceMind terminal UI using disposable sample files.

Requires Pillow, ffmpeg, and a built SpaceMind executable. No file actions are
performed; a temporary scan history is used and AI is disabled for the scan.
ANSI output is rendered at 8 fps.
Usage: python3 scripts/record_spacemind.py /path/to/spacemind
"""
import codecs
import fcntl
import os
from pathlib import Path
import pty
import re
import select
import struct
import subprocess
import sys
import tempfile
import termios
import time

from PIL import Image, ImageDraw, ImageFont

COLS, ROWS = 100, 32
BG, FG = "#101719", "#e3e7ec"
FONT = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", 16)
PALETTE = ["#101719", "#e06c75", "#98c379", "#e5c07b", "#61afef", "#c678dd", "#56b6c2", "#e3e7ec"]


class Terminal:
    def __init__(self):
        self.cells = [[(" ", FG, BG) for _ in range(COLS)] for _ in range(ROWS)]
        self.x = self.y = 0
        self.fg, self.bg = FG, BG
        self.pending = ""

    def feed(self, text):
        self.pending += text
        while self.pending:
            if self.pending.startswith("\x1b["):
                match = re.match(r"\x1b\[([0-9;?]*)([ -/]*)([@-~])", self.pending)
                if not match:
                    return
                raw, _, command = match.groups()
                values = [int(v or 0) for v in raw.lstrip("?").split(";")]
                self.pending = self.pending[match.end():]
                if raw.startswith("?"):
                    continue
                first = values[0]
                if command in "Hf":
                    self.y = min(ROWS - 1, max(0, (first or 1) - 1))
                    self.x = min(COLS - 1, max(0, (values[1] if len(values) > 1 else 1) - 1))
                elif command == "J" and first in (2, 3):
                    self.cells = [[(" ", FG, BG) for _ in range(COLS)] for _ in range(ROWS)]
                elif command == "K":
                    for x in range(0 if first in (1, 2) else self.x, COLS if first != 1 else self.x + 1):
                        self.cells[self.y][x] = (" ", self.fg, self.bg)
                elif command in "ABCD":
                    amount = first or 1
                    if command == "A": self.y = max(0, self.y - amount)
                    if command == "B": self.y = min(ROWS - 1, self.y + amount)
                    if command == "C": self.x = min(COLS - 1, self.x + amount)
                    if command == "D": self.x = max(0, self.x - amount)
                elif command == "G": self.x = max(0, min(COLS - 1, (first or 1) - 1))
                elif command == "m": self.colors(values)
                continue
            if self.pending.startswith("\x1b"):
                if len(self.pending) < 2: return
                self.pending = self.pending[2:]
                continue
            char, self.pending = self.pending[0], self.pending[1:]
            if char == "\r": self.x = 0
            elif char == "\n":
                self.y += 1
                if self.y >= ROWS:
                    self.cells.pop(0)
                    self.cells.append([(" ", FG, BG) for _ in range(COLS)])
                    self.y = ROWS - 1
            elif char == "\b": self.x = max(0, self.x - 1)
            elif char >= " ":
                if self.x >= COLS:
                    self.x = 0
                    self.y = min(ROWS - 1, self.y + 1)
                self.cells[self.y][self.x] = (char, self.fg, self.bg)
                self.x += 1

    def colors(self, values):
        i = 0
        while i < len(values):
            value = values[i]
            if value == 0: self.fg, self.bg = FG, BG
            elif value == 39: self.fg = FG
            elif value == 49: self.bg = BG
            elif 30 <= value <= 37: self.fg = PALETTE[value - 30]
            elif 40 <= value <= 47: self.bg = PALETTE[value - 40]
            elif 90 <= value <= 97: self.fg = PALETTE[value - 90]
            elif value in (38, 48) and i + 1 < len(values):
                color = None
                if values[i + 1] == 2 and i + 4 < len(values):
                    color = tuple(values[i + 2:i + 5]); i += 4
                elif values[i + 1] == 5 and i + 2 < len(values):
                    n = values[i + 2]; i += 2
                    if n < 16: color = PALETTE[n % 8]
                    elif n >= 232: color = (8 + (n - 232) * 10,) * 3
                    else:
                        n -= 16
                        steps = [0, 95, 135, 175, 215, 255]
                        color = (steps[n // 36], steps[n // 6 % 6], steps[n % 6])
                if color is not None:
                    if value == 38: self.fg = color
                    else: self.bg = color
            i += 1

    def render(self):
        image = Image.new("RGB", (1064, 728), BG)
        draw = ImageDraw.Draw(image)
        draw.text((32, 14), "SpaceMind  /  sample folder walkthrough", font=FONT, fill="#9da9b1")
        draw.line((32, 46, 1032, 46), fill="#2c363e")
        for y, row in enumerate(self.cells):
            for x, (char, fg, bg) in enumerate(row):
                position = (32 + x * 10, 58 + y * 20)
                if bg != BG: draw.rectangle((*position, position[0] + 10, position[1] + 20), fill=bg)
                if char != " ": draw.text(position, char, font=FONT, fill=fg)
        return image


def record(binary):
    output = Path(__file__).resolve().parents[1] / "public/demos"
    output.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="spacemind-recording-", dir="/tmp") as temporary:
        folder = Path(temporary) / "sample-folder"
        for name in ("Downloads", "Photos", "project/node_modules", "project/src"):
            (folder / name).mkdir(parents=True, exist_ok=True)
        content = b"SpaceMind sample recording data\n" * 65536
        (folder / "Photos/landscape.raw").write_bytes(content)
        (folder / "Downloads/landscape-copy.raw").write_bytes(content)
        (folder / "project/node_modules/cache.bin").write_bytes(b"cache" * 524288)
        (folder / "project/src/main.rs").write_text('fn main() { println!("Hello, SpaceMind!"); }\n')
        database = str(Path(temporary) / "demo.sqlite")
        subprocess.run([binary, "--database", database, "scan", "sample-folder", "--no-ai", "--duplicate-min-size", "1", "--large-threshold", "1MiB"], cwd=temporary, stdout=subprocess.DEVNULL, check=True)
        master, slave = pty.openpty()
        fcntl.ioctl(slave, termios.TIOCSWINSZ, struct.pack("HHHH", ROWS, COLS, 0, 0))
        def child_terminal():
            os.setsid()
            fcntl.ioctl(0, termios.TIOCSCTTY, 0)

        recording_env = {key: value for key, value in os.environ.items() if key != "NO_COLOR"}
        process = subprocess.Popen([binary, "--database", database], stdin=slave, stdout=slave, stderr=slave, cwd=temporary, env={**recording_env, "TERM": "xterm-256color"}, preexec_fn=child_terminal)
        os.close(slave)
        encoder = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pixel_format", "rgb24", "-video_size", "1064x728", "-framerate", "8", "-i", "-", "-an", "-c:v", "libx264", "-preset", "fast", "-crf", "22", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(output / "spacemind-demo.mp4")], stdin=subprocess.PIPE)
        terminal = Terminal()
        decoder = codecs.getincrementaldecoder("utf-8")("replace")
        # Browse only: Explore, folder expansion, Review, and Duplicates.
        actions = [(0.75, b"j"), (1.25, b"\r"), (2, b"\r"), (3.5, b"2"), (4.5, b"\r"), (5.5, b"j"), (6.5, b"3"), (7.5, b"\r"), (8.5, b"\r"), (9.5, b"q"), (10.5, b"4")]
        start = time.monotonic()
        try:
            for frame in range(104):
                elapsed = frame / 8
                while actions and elapsed >= actions[0][0]:
                    os.write(master, actions.pop(0)[1])
                deadline = start + (frame + 1) / 8
                while time.monotonic() < deadline:
                    ready, _, _ = select.select([master], [], [], max(0, deadline - time.monotonic()))
                    if ready:
                        try:
                            terminal.feed(decoder.decode(os.read(master, 65536)))
                        except OSError as error:
                            screen = "\n".join("".join(cell[0] for cell in row) for row in terminal.cells)
                            raise RuntimeError(f"SpaceMind stopped early:\n{screen}") from error
                image = terminal.render()
                if frame == 24: image.save(output / "spacemind-poster.png")
                encoder.stdin.write(image.tobytes())
        finally:
            process.terminate()
            process.wait(timeout=5)
            os.close(master)
            encoder.stdin.close()
        if encoder.wait() != 0: raise RuntimeError("Video encoding failed")
    print(f"Recorded {output / 'spacemind-demo.mp4'}")


if __name__ == "__main__":
    record(sys.argv[1])
