from ultralytics import YOLO

import cv2
import easyocr
import time

from vietocr.tool.predictor import Predictor
from vietocr.tool.config import Cfg
from PIL import Image

config = Cfg.load_config_from_name('vgg_transformer')
config['cnn']['pretrained']=False
config['device'] = 'cpu'
detector = Predictor(config)


image_path = 'data/test/test.jpg'

img = cv2.imread(image_path)
print(img.shape)
reader = easyocr.Reader(['vi'], gpu= False)
# Load a model
model = YOLO("best-2.pt") 
#  tên của nhãn
names = model.names
# print(names)



def remove_noise (img):
    timestamp = int(time.time())
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # blur
    blur = cv2.GaussianBlur(gray, (0,0), sigmaX=33, sigmaY=33)
    # divide
    divide = cv2.divide(gray, blur, scale=255)
    # otsu threshold
    thresh = cv2.threshold(divide, 0, 255, cv2.THRESH_BINARY+cv2.THRESH_OTSU)[1]
    # apply morphology
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3,3))
    morph = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
    
    return morph


def get_ocr_results(x1,y1,x2,y2,name):
    # print(x1,x2)
    # print(y1,y2)
    crop = img[y1:y2, x1:x2, : ]
    # cv2.imwrite(f'results/{int(time.time())}-{name}.png',crop)
    image_prcs = remove_noise(crop)
    results = reader.readtext(crop)
    result = ''

    for (bbox, text, prob) in results:
        result = result + ' '+ text

    print('text:', result)
    return result




def get_ocr_results2(x1,y1,x2,y2,name):
    # print(x1,x2)
    # print(y1,y2)
    crop = img[y1:y2, x1:x2, : ]
    # image_prcs = remove_noise(crop)
    color_coverted = cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)
    pil_img = Image.fromarray(color_coverted)

    result = detector.predict(pil_img)
    print(name, result)
    return result


def process_data(data):
    process_data = {}
    # giu lai type
    process_data['type'] = data['type']
    del data['type']
    for key in data:
        data[key].sort(key=lambda x: x[0])
        join_text = ''
        for item in data[key]:
            join_text = join_text + item[1] + ' '

        print('key: ', key)
        print('text: ', join_text)
        process_data[key] = join_text.rstrip()

    print('process_data : ', process_data)




results = model.predict(image_path, save=True, save_txt=True)
for r in results:
    boxs = r.boxes
    classes = boxs.cls
    data = {

    }
    for idx, box in enumerate(boxs.xyxy):
        x1,y1,x2,y2 = box.tolist()
        name = names[int(classes[idx])]
        if(name == 'chip_front' or name == '12so_font'):
            data['type'] = 'Căn cược công dân mặt trước'
            continue
        if(name == '12so_back'):
            data['type'] = 'Căn cược công dân mặt sau'
            continue
        if(name == '9so_front' ):
            data['type'] = 'CMND mặt trước'
            continue
        if(name == '9so_back'):
            data['type'] = 'CMND mặt sau'
            continue
        # text = get_ocr_results(int(x1), int(y1), int(x2), int(y2), name)
        print(int(x1), int(y1), int(x2), int(y2))
        text = get_ocr_results2(int(x1), int(y1), int(x2), int(y2), name)

        if name in data:
            data[name].append([int(y1), text])
        else:
            data[name] = [[int(y1), text]]
    
    process_data(data)
import json

from docx import Document
import os

# Mở tài liệu Word

path = r'word_form/xinduong.docx'

def check_exists(path):
    exists = os.path.exists(path)
    if exists:
        return True
    else:
        return False

def template(json_string):
    data = json.loads(json_string)

    print(data['type'])

def main():
    return 0


# doc.save('bang_lai_da_dien_thong_tin.docx')

if __name__ == '__main__':
    json_string = '{"type": "Mặt sau", "name": "PHAM DUY LONG", "recent_location": "S Trà Co, Thanh Cái, Qung NInh phó Móng Khu Trang Ginl Trà Co, Thanh Móng Cál, phó", "birth_day": "03/12/2006", "id": "022206004066", "expire_date": "0v12/2031", "nationality": "Việt Nam", "origin_location": "Hải Xuan, Thành phố Móng Cái, Quảng Ninh Hải Xuán, Thành phó Móng Cá", "gender": "Nam"}'
    template(json_string)

from ultralytics import YOLO
from PIL import Image
import cv2
import easyocr

image_path = 'data/val/15.jpg'

img = cv2.imread(image_path)
print(img.shape)
reader = easyocr.Reader(['vi'], gpu= False)
# Load a model
model = YOLO("best-2.pt") 
#  tên của nhãn
names = model.names
# print(names)
results = model.predict(image_path, save=True, save_txt=True)


def get_ocr_results(x1,y1,x2,y2,name):
    # print(x1,x2)
    # print(y1,y2)
    crop = img[y1:y2, x1:x2, : ]
    results = reader.readtext(crop)
    result = ''

    for (bbox, text, prob) in results:
        result = result + ' '+ text

    print('text:', result)
    return result
for r in results:
    boxs = r.boxes
    classes = boxs.cls
    # print('shape',r.orig_shape)
    # print('normalize',boxs_nomalize)
    data ={

    }
    for idx, box in enumerate(boxs.xyxy):
        x1,y1,x2,y2 = box.tolist()
        name = names[int(classes[idx])]
        if(name == 'chip_front'):
            data['type'] = 'Mặt trước'
            continue
        text = get_ocr_results(int(x1), int(y1), int(x2), int(y2), name)
        if name in data:
            data[name] = data[name] + ' ' + text
        else:
            data[name] = text
    
    print(data)
