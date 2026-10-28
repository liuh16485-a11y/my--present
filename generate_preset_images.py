import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

assets_dir = r"c:\文件\谷歌AI\个人\礼品\assets"
os.makedirs(assets_dir, exist_ok=True)

font_path = r"C:\Windows\Fonts\msyh.ttc"
def get_font(size):
    try:
        return ImageFont.truetype(font_path, size)
    except:
        return ImageFont.load_default()

def create_gradient_bg(w, h, top_color, bottom_color):
    base = Image.new('RGBA', (w, h), top_color)
    top = Image.new('RGBA', (w, h), bottom_color)
    mask = Image.new('L', (w, h))
    mask_data = []
    for y in range(h):
        for x in range(w):
            mask_data.append(int(255 * (y / h)))
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base

def draw_pedestal(draw, cx, cy, rx, ry, color_top, color_side, height=35):
    # Shadow
    draw.ellipse([cx - rx - 20, cy + height - ry + 10, cx + rx + 20, cy + height + ry + 25], fill=(0, 0, 0, 40))
    # Side cylinder
    draw.rectangle([cx - rx, cy, cx + rx, cy + height], fill=color_side)
    draw.ellipse([cx - rx, cy + height - ry, cx + rx, cy + height + ry], fill=color_side)
    # Top ellipse
    draw.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=color_top)

# 1. 商务保温杯礼盒 (Business Vacuum Flask)
def gen_flask():
    img = create_gradient_bg(800, 800, (26, 32, 44, 255), (15, 20, 28, 255))
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Background soft glow
    draw.ellipse([200, 200, 600, 600], fill=(212, 175, 55, 25))
    
    # Pedestal
    draw_pedestal(draw, 400, 620, 240, 45, (45, 55, 72, 255), (30, 38, 50, 255), 40)
    # Gold rim on pedestal
    draw.arc([160, 620 - 45, 640, 620 + 45], 0, 180, fill=(212, 175, 55, 200), width=3)
    
    # Gift Box in background
    box_x, box_y, box_w, box_h = 240, 260, 320, 360
    draw.rounded_rectangle([box_x, box_y, box_x + box_w, box_y + box_h], radius=16, fill=(20, 24, 33, 255), outline=(212, 175, 55, 180), width=3)
    # Gold ribbon on box
    draw.rectangle([box_x + 140, box_y, box_x + 180, box_y + box_h], fill=(212, 175, 55, 220))
    draw.rectangle([box_x, box_y + 160, box_x + box_w, box_y + 195], fill=(212, 175, 55, 220))
    
    # Vacuum Flask main subject
    fx, fy, fw, fh = 360, 220, 120, 380
    # Flask body
    draw.rounded_rectangle([fx, fy + 70, fx + fw, fy + fh], radius=24, fill=(35, 40, 48, 255), outline=(230, 195, 90, 255), width=4)
    # Metallic gradient highlight on flask
    draw.rectangle([fx + 25, fy + 75, fx + 45, fy + fh - 10], fill=(255, 255, 255, 40))
    # Flask lid / cap
    draw.rounded_rectangle([fx + 10, fy + 20, fx + fw - 10, fy + 70], radius=12, fill=(212, 175, 55, 255))
    # Smart temperature display screen
    draw.ellipse([fx + fw//2 - 22, fy + 33, fx + fw//2 + 22, fy + 57], fill=(15, 15, 20, 255))
    draw.text((fx + fw//2 - 12, fy + 37), "55°", font=get_font(16), fill=(0, 230, 180, 255))
    
    # Accompanying pen
    px, py = 505, 340
    draw.rounded_rectangle([px, py, px + 22, py + 260], radius=8, fill=(20, 20, 25, 255), outline=(212, 175, 55, 255), width=2)
    draw.rectangle([px + 3, py + 50, px + 19, py + 65], fill=(212, 175, 55, 255))
    
    # Label badge
    draw.rounded_rectangle([270, 700, 530, 750], radius=25, fill=(212, 175, 55, 230))
    draw.text((400, 725), "商务尊享 · 高级定制礼盒", font=get_font(22), fill=(15, 20, 28, 255), anchor="mm")
    
    img.save(os.path.join(assets_dir, "flask.png"))

# 2. 科技无线充电底座 (Wireless Charger)
def gen_charger():
    img = create_gradient_bg(800, 800, (15, 23, 42, 255), (30, 41, 59, 255))
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Tech neon ring glow
    draw.ellipse([180, 180, 620, 620], fill=(56, 189, 248, 20))
    draw_pedestal(draw, 400, 610, 250, 40, (30, 41, 59, 255), (15, 23, 42, 255), 35)
    
    # Charger stand base
    draw.rounded_rectangle([250, 500, 550, 570], radius=20, fill=(30, 35, 45, 255), outline=(56, 189, 248, 160), width=3)
    # LED indicator line
    draw.rounded_rectangle([340, 550, 460, 556], radius=3, fill=(56, 189, 248, 240))
    
    # Slanted stand pillar
    draw.polygon([(360, 500), (440, 500), (430, 330), (370, 330)], fill=(45, 55, 72, 255))
    
    # Charging Pad (angled/circle)
    cx, cy = 400, 340
    draw.ellipse([cx - 130, cy - 130, cx + 130, cy + 130], fill=(24, 29, 39, 255), outline=(56, 189, 248, 220), width=4)
    # Inner MagSafe ring
    draw.ellipse([cx - 85, cy - 85, cx + 85, cy + 85], outline=(148, 163, 184, 180), width=4)
    # Lightning power symbol
    draw.polygon([(cx, cy - 40), (cx - 20, cy + 5), (cx + 5, cy + 5), (cx - 10, cy + 45), (cx + 25, cy - 5), (cx, cy - 5)], fill=(56, 189, 248, 255))
    
    # Tech badge
    draw.rounded_rectangle([270, 700, 530, 750], radius=25, fill=(56, 189, 248, 230))
    draw.text((400, 725), "三合一 · 磁吸极速快充底座", font=get_font(22), fill=(10, 15, 30, 255), anchor="mm")
    
    img.save(os.path.join(assets_dir, "charger.png"))

# 3. 宫廷红茶尊享礼盒 (Tea Gift Box)
def gen_tea():
    img = create_gradient_bg(800, 800, (60, 15, 20, 255), (35, 10, 12, 255))
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Warm amber glow
    draw.ellipse([220, 220, 580, 580], fill=(245, 158, 11, 30))
    draw_pedestal(draw, 400, 620, 260, 45, (80, 20, 25, 255), (45, 10, 15, 255), 40)
    
    # Main Tea Gift Box
    bx, by, bw, bh = 220, 300, 360, 280
    draw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=16, fill=(153, 27, 27, 255), outline=(245, 158, 11, 230), width=4)
    # Traditional Chinese frame pattern
    draw.rectangle([bx + 15, by + 15, bx + bw - 15, by + bh - 15], outline=(245, 158, 11, 120), width=2)
    # Center emblem
    draw.ellipse([bx + bw//2 - 60, by + bh//2 - 60, bx + bw//2 + 60, by + bh//2 + 60], fill=(127, 29, 29, 255), outline=(245, 158, 11, 255), width=3)
    draw.text((bx + bw//2, by + bh//2), "御茶", font=get_font(36), fill=(245, 158, 11, 255), anchor="mm")
    
    # Two tea cans in front
    # Can 1
    draw.rounded_rectangle([150, 420, 250, 590], radius=18, fill=(30, 30, 30, 255), outline=(245, 158, 11, 240), width=3)
    draw.rounded_rectangle([160, 400, 240, 425], radius=6, fill=(245, 158, 11, 255))
    draw.text((200, 500), "金\n骏\n眉", font=get_font(20), fill=(245, 158, 11, 255), anchor="mm")
    
    # Can 2
    draw.rounded_rectangle([550, 420, 650, 590], radius=18, fill=(30, 30, 30, 255), outline=(245, 158, 11, 240), width=3)
    draw.rounded_rectangle([560, 400, 640, 425], radius=6, fill=(245, 158, 11, 255))
    draw.text((600, 500), "正\n山\n小\n种", font=get_font(18), fill=(245, 158, 11, 255), anchor="mm")
    
    # Label badge
    draw.rounded_rectangle([270, 700, 530, 750], radius=25, fill=(245, 158, 11, 240))
    draw.text((400, 725), "匠心国韵 · 金丝红茶尊享礼盒", font=get_font(20), fill=(50, 10, 15, 255), anchor="mm")
    
    img.save(os.path.join(assets_dir, "tea.png"))

# 4. 极简真皮手账本礼盒 (Leather Notebook)
def gen_notebook():
    img = create_gradient_bg(800, 800, (44, 34, 28, 255), (28, 20, 16, 255))
    draw = ImageDraw.Draw(img, 'RGBA')
    
    draw.ellipse([200, 200, 600, 600], fill=(217, 119, 6, 25))
    draw_pedestal(draw, 400, 620, 250, 40, (55, 42, 34, 255), (32, 24, 18, 255), 35)
    
    # Leather Notebook
    nx, ny, nw, nh = 260, 240, 260, 370
    draw.rounded_rectangle([nx, ny, nx + nw, ny + nh], radius=18, fill=(138, 75, 42, 255), outline=(180, 110, 70, 255), width=3)
    # Spine and strap
    draw.rectangle([nx, ny, nx + 30, ny + nh], fill=(105, 55, 30, 255))
    draw.rounded_rectangle([nx + 100, ny + 170, nx + nw + 15, ny + 205], radius=6, fill=(80, 40, 20, 255), outline=(212, 175, 55, 255), width=2)
    # Metallic bookmark charm
    draw.line([nx + nw - 50, ny + 10, nx + nw - 50, ny + nh + 30], fill=(212, 175, 55, 255), width=4)
    draw.ellipse([nx + nw - 58, ny + nh + 25, nx + nw - 42, ny + nh + 45], fill=(212, 175, 55, 255))
    
    # Premium Brass Fountain Pen
    px, py = 555, 260
    draw.rounded_rectangle([px, py, px + 24, py + 330], radius=8, fill=(212, 175, 55, 255), outline=(180, 140, 30, 255), width=2)
    draw.polygon([(px + 4, py), (px + 20, py), (px + 12, py - 20)], fill=(225, 225, 230, 255))
    
    # Label badge
    draw.rounded_rectangle([270, 700, 530, 750], radius=25, fill=(180, 120, 70, 240))
    draw.text((400, 725), "文心匠意 · 意式真皮手账礼盒", font=get_font(20), fill=(255, 255, 255, 255), anchor="mm")
    
    img.save(os.path.join(assets_dir, "notebook.png"))

# 5. 智能降噪耳机 (ANC Headphones)
def gen_headphones():
    img = create_gradient_bg(800, 800, (17, 24, 39, 255), (31, 41, 55, 255))
    draw = ImageDraw.Draw(img, 'RGBA')
    
    draw.ellipse([200, 200, 600, 600], fill=(99, 102, 241, 30))
    draw_pedestal(draw, 400, 620, 250, 40, (40, 48, 65, 255), (20, 25, 35, 255), 35)
    
    # Headphone Headband Arch
    cx, cy = 400, 320
    draw.arc([230, 170, 570, 470], 190, 350, fill=(75, 85, 99, 255), width=28)
    # Cushion on headband
    draw.arc([250, 175, 550, 460], 210, 330, fill=(31, 41, 55, 255), width=20)
    
    # Left Ear Cup
    draw.rounded_rectangle([210, 360, 290, 500], radius=38, fill=(31, 41, 55, 255), outline=(99, 102, 241, 255), width=4)
    draw.rounded_rectangle([190, 380, 225, 480], radius=15, fill=(55, 65, 81, 255))
    
    # Right Ear Cup
    draw.rounded_rectangle([510, 360, 590, 500], radius=38, fill=(31, 41, 55, 255), outline=(99, 102, 241, 255), width=4)
    draw.rounded_rectangle([575, 380, 610, 480], radius=15, fill=(55, 65, 81, 255))
    
    # Sound wave accents
    for r, op in [(110, 80), (135, 50), (160, 30)]:
        draw.arc([cx - r, cy + 60 - r, cx + r, cy + 60 + r], 0, 360, fill=(99, 102, 241, op), width=2)
        
    # Label badge
    draw.rounded_rectangle([270, 700, 530, 750], radius=25, fill=(99, 102, 241, 240))
    draw.text((400, 725), "纯净原声 · 旗舰无线降噪耳机", font=get_font(20), fill=(255, 255, 255, 255), anchor="mm")
    
    img.save(os.path.join(assets_dir, "headphones.png"))

# 6. 活力元气鲜果礼篮 (Vitality Fruit Hamper)
def gen_fruit_hamper():
    img = create_gradient_bg(800, 800, (255, 241, 230, 255), (254, 215, 170, 255))
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Vibrant warm glow
    draw.ellipse([180, 180, 620, 620], fill=(251, 146, 60, 40))
    draw_pedestal(draw, 400, 620, 260, 42, (254, 243, 199, 255), (245, 158, 11, 180), 35)
    
    # Woven Hamper Basket
    draw.polygon([(240, 440), (560, 440), (510, 590), (290, 590)], fill=(180, 83, 9, 255))
    # Basket weave lines
    for y in range(460, 580, 22):
        draw.line([250 + (y-440)*0.3, y, 550 - (y-440)*0.3, y], fill=(245, 158, 11, 160), width=3)
    # Basket rim
    draw.ellipse([230, 425, 570, 460], fill=(217, 119, 6, 255), outline=(146, 64, 14, 255), width=3)
    
    # Juicy Oranges & Apples & Berries
    # Big Orange
    draw.ellipse([320, 340, 440, 460], fill=(249, 115, 22, 255))
    draw.ellipse([340, 360, 360, 380], fill=(255, 255, 255, 70))
    # Apple
    draw.ellipse([420, 360, 520, 460], fill=(239, 68, 68, 255))
    # Green pear / kiwi
    draw.ellipse([270, 380, 350, 465], fill=(132, 204, 22, 255))
    # Big Festive Bow Ribbon
    draw.polygon([(400, 450), (330, 420), (350, 470)], fill=(239, 68, 68, 255))
    draw.polygon([(400, 450), (470, 420), (450, 470)], fill=(239, 68, 68, 255))
    draw.ellipse([385, 435, 415, 465], fill=(220, 38, 38, 255))
    
    # Label badge
    draw.rounded_rectangle([270, 700, 530, 750], radius=25, fill=(249, 115, 22, 240))
    draw.text((400, 725), "四季元气 · 环球鲜果伴手礼", font=get_font(21), fill=(255, 255, 255, 255), anchor="mm")
    
    img.save(os.path.join(assets_dir, "fruit_hamper.png"))

if __name__ == '__main__':
    gen_flask()
    gen_charger()
    gen_tea()
    gen_notebook()
    gen_headphones()
    gen_fruit_hamper()
    print("All preset gift assets generated successfully!")
