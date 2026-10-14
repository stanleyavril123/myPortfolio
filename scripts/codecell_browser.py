import base64
import json
import socket
from pathlib import Path

class Browser:
    def __init__(self):
        self.socket = socket.create_connection(("127.0.0.1", 2828), timeout=30)
        self.buffer = b""
        self.sequence = 0
        self.read()
        self.call("WebDriver:NewSession", {"capabilities": {"alwaysMatch": {"acceptInsecureCerts": True}}})

    def read(self):
        while b":" not in self.buffer:
            self.buffer += self.socket.recv(65536)
        prefix, self.buffer = self.buffer.split(b":", 1)
        length = int(prefix)
        while len(self.buffer) < length:
            self.buffer += self.socket.recv(65536)
        payload, self.buffer = self.buffer[:length], self.buffer[length:]
        return json.loads(payload)

    def call(self, name, params=None):
        self.sequence += 1
        payload = json.dumps([0, self.sequence, name, params or {}]).encode()
        self.socket.sendall(str(len(payload)).encode() + b":" + payload)
        response = self.read()
        if response[2]: raise RuntimeError(response[2])
        return response[3]

    def execute(self, script, args=None):
        return self.call("WebDriver:ExecuteScript", {"script": script, "args": args or [], "newSandbox": False, "sandbox": None})["value"]

    def screenshot(self, path):
        result = self.call("WebDriver:TakeScreenshot", {"id": None, "full": False, "scroll": False})
        Path(path).write_bytes(base64.b64decode(result["value"]))
