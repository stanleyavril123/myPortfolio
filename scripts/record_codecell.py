"""Capture two real CodeCell clients and execute Python in Firecracker."""
import base64
import io
import json
import subprocess
import shutil
import tempfile
import time
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from codecell_browser import Browser

destination=Path(__file__).resolve().parents[1] / 'public/demos'
output=Path(tempfile.mkdtemp(prefix='codecell-split-output-', dir='/tmp'))
b=Browser()
room='split-demo-'+str(int(time.time()))
url='http://127.0.0.1:5173/?pad='+room+'&user='
first=b.call('WebDriver:GetWindowHandle')['value']
b.call('WebDriver:SetWindowRect',{'x':0,'y':0,'width':1012,'height':1137})
b.call('WebDriver:Navigate',{'url':url+'Stanley'})
time.sleep(2)
r=b.call('WebDriver:NewWindow',{'type':'window'})
second=r.get('value',r)['handle']
b.call('WebDriver:SwitchToWindow',{'handle':second})
b.call('WebDriver:SetWindowRect',{'x':0,'y':0,'width':1012,'height':1137})
b.call('WebDriver:Navigate',{'url':url+'Alex'})
time.sleep(2)

code='# Shared Python workspace\n\ndef greet(name):\n    return f"Hello, {name}!"\n\nteam = ["Stanley", "Alex"]\nfor name in team:\n    print(greet(name))\n\n# Collaborators edit different lines.\n'
b.call('WebDriver:SwitchToWindow',{'handle':first})
b.execute('window.__recordingEditor.getModel().setValue(arguments[0]);',[code])
time.sleep(0.6)

def activate(handle):
    b.call('WebDriver:SwitchToWindow',{'handle':handle})

def cursor(line,column):
    b.execute('const e=window.__recordingEditor; e.setPosition({lineNumber:arguments[0],column:arguments[1]}); e.focus();',[line,column])

activate(first); cursor(4,15)
activate(second); cursor(8,5)
assert b.execute('return document.body.innerText.includes("2 online")'), 'Second user did not connect'
assert b.execute('return window.__recordingEditor.getValue()')==code, 'Initial code did not sync'
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf',18)
encoder=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','rawvideo','-pixel_format','rgb24','-video_size','1920x1080','-framerate','6','-i','-','-an','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',str(output/'codecell-demo.mp4')],stdin=subprocess.PIPE)
count=0
phase='Two users. One shared Python workspace.'

def frame():
    global count
    image=Image.new('RGB',(1920,1080),'#101719')
    draw=ImageDraw.Draw(image)
    draw.text((24,10),'Stanley / editor 1',font=font,fill='#60a5fa')
    draw.text((984,10),'Alex / editor 2',font=font,fill='#f59e0b')
    for index,handle in enumerate([first,second]):
        activate(handle)
        raw=b.call('WebDriver:TakeScreenshot',{'id':None,'full':False,'scroll':False})
        screenshot=Image.open(io.BytesIO(base64.b64decode(raw['value']))).convert('RGB')
        assert screenshot.size==(960,1000), screenshot.size
        image.paste(screenshot,(index*960,40))
    draw.line((960,0,960,1040),fill='#56636c',width=2)
    draw.text((24,1050),phase,font=font,fill='#d5dde3')
    encoder.stdin.write(image.tobytes())
    count+=1
    time.sleep(0.04)
    return image

def hold(seconds):
    image=None
    for _ in range(round(seconds*6)): image=frame()
    return image

def click(selector):
    b.execute('const e=document.querySelector(arguments[0]); if(!e) throw new Error(arguments[0]); e.click();',[selector])

def edit(line,start,end,text):
    b.execute('const e=window.__recordingEditor; e.executeEdits("demo",[{range:new monaco.Range(arguments[0],arguments[1],arguments[0],arguments[2]),text:arguments[3]}]); e.setPosition({lineNumber:arguments[0],column:arguments[1]+arguments[3].length}); e.focus();',[line,start,end,text])

try:
    hold(2)
    for handle in [first,second]:
        activate(handle); click('[aria-label="Hide sidebar"]')
    hold(1)
    phase='Stanley edits the greeting. Alex sees it immediately.'
    activate(first); edit(4,14,19,'')
    for index,letter in enumerate('Welcome'):
        activate(first); edit(4,14+index,14+index,letter); hold(0.33)
    hold(1.5)
    phase='Alex adds a print statement. Both editors stay in sync.'
    activate(second); end=b.execute('return window.__recordingEditor.getModel().getLineMaxColumn(10)'); edit(10,1,end,'')
    line='print("Built together, in real time.")'
    for index in range(0,len(line),6):
        activate(second); edit(10,index+1,index+1,line[index:index+6]); hold(0.33)
    hold(1.5)
    activate(first)
    left=b.execute('return window.__recordingEditor.getValue()')
    activate(second)
    right=b.execute('return window.__recordingEditor.getValue()')
    assert left==right and 'Welcome' in left and line in left, 'Edits did not sync'
    compile(left, '<demo>', 'exec')
    activate(first); cursor(4,21)
    activate(second); cursor(10,len(line)+1)
    phase='Run Python in Firecracker. Output is shared with both users.'
    activate(first)
    b.execute('Array.from(document.querySelectorAll("button")).find(e=>e.textContent.trim()==="Run").click()')
    finished=False
    for _ in range(72):
        image=frame()
        texts=[]
        for handle in [first,second]:
            activate(handle); texts.append(b.execute('return document.querySelector(".output-console").textContent'))
        if all('Welcome, Stanley!' in text and 'Welcome, Alex!' in text and 'Built together, in real time.' in text and 'exit 0' in text for text in texts):
            finished=True
            break
    assert finished, texts
    phase='Both users receive the real Python output / exit 0.'
    image=hold(4)
    image.save(output/'codecell-poster.png')
    phase='Shared files, shared edits, shared execution.'
    activate(first); click('[aria-label="Show sidebar"]')
    activate(second); click('[aria-label="Show sidebar"]')
    hold(2)
    activate(first); click('[aria-label="New file"]')
    b.execute('const e=document.querySelector("#file-draft-name"); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value").set.call(e,"helpers.py"); e.dispatchEvent(new Event("input",{bubbles:true}));')
    hold(0.75)
    activate(first); click('[aria-label="Save file name"]'); hold(1)
    for handle in [first,second]:
        activate(handle)
        assert 'helpers.py' in b.execute('return document.body.innerText'), 'Shared file did not appear'
    activate(first); b.execute('document.querySelector(".file-row").click()')
    hold(2)
    print(json.dumps({'duration':count/6,'frames':count,'execution':'real Firecracker Python','verified':['two-way-editing','separate-cursor-lines','matching-output-on-both-clients','exit-0','shared-file-creation']}))
finally:
    encoder.stdin.close()
    if encoder.wait()!=0: raise RuntimeError('Encoding failed')
    b.call('WebDriver:DeleteSession')

# Publish only after all real collaboration and execution checks succeed.
for name in ("codecell-demo.mp4", "codecell-poster.png"):
    shutil.copy2(output / name, destination / name)
shutil.rmtree(output)
