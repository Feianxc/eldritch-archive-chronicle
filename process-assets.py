from PIL import Image
from pathlib import Path
root = Path(r"E:\工作区\30_Resources_资料\方法与配置\最佳CODEX使用\cthulhu-chronicle-demo\assets")
# parchment: remove near-black outside into alpha
im = Image.open(root/'parchment-source.png').convert('RGBA')
p = im.load()
for y in range(im.height):
    for x in range(im.width):
        r,g,b,a = p[x,y]
        lum = 0.299*r + 0.587*g + 0.114*b
        # black outer background transparent; feather low-luminance edge
        if lum < 18:
            na = 0
        elif lum < 52:
            na = int((lum - 18) / 34 * 255)
        else:
            na = 255
        p[x,y] = (r,g,b,min(a,na))
im.save(root/'parchment.png')
# seals: crop quadrants and remove dark checkerboard background
sheet = Image.open(root/'seals-source.png').convert('RGBA')
w,h = sheet.size
boxes = [(0,0,w//2,h//2),(w//2,0,w,h//2),(0,h//2,w//2,h),(w//2,h//2,w,h)]
names = ['seal-book.png','seal-mountain.png','seal-wave.png','seal-star.png']
for box,name in zip(boxes,names):
    crop = sheet.crop(box).resize((360,360), Image.Resampling.LANCZOS).convert('RGBA')
    pix = crop.load()
    for y in range(crop.height):
        for x in range(crop.width):
            r,g,b,a = pix[x,y]
            lum = 0.299*r + 0.587*g + 0.114*b
            brass = (r > 70 and g > 45 and r > b + 16) or lum > 92
            if not brass:
                na = 0
            else:
                na = max(0, min(255, int((lum-40)*3.2)))
            pix[x,y] = (r,g,b,min(a,na))
    crop.save(root/name)
print('assets processed')
