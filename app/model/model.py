from typing import List
from PIL import Image
import cv2
import easyocr
from ultralytics import YOLO
from vietocr.tool.predictor import Predictor
from vietocr.tool.config import Cfg
from PIL import Image

config = Cfg.load_config_from_name('vgg_transformer')
config['cnn']['pretrained']=False
config['device'] = 'cpu'

class OCRProcessor:
    def __init__(self, img):
        self.reader = easyocr.Reader(['vi'], gpu=False)
        self.model = YOLO("assets/best-2.pt")
        self.names = self.model.names
        self.detector = Predictor(config)
        self.img = img


    def get_ocr_results(self,x1,y1,x2,y2,name):
        crop = self.img[y1:y2, x1:x2, : ]
        color_coverted = cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)
        pil_img = Image.fromarray(color_coverted)

        result = self.detector.predict(pil_img)
        print(name, result)
        return result

    def process_data(self,data):
        process_data = {}
        # giu lai type
        process_data['type'] = data['type']


        del data['type']
        for key in data:
            data[key].sort(key=lambda x: x[0])
            join_text = ''
            for item in data[key]:
                join_text = join_text + item[1] + ' '

            # print('key: ', key)
            # print('text: ', join_text)
            process_data[key] = join_text.rstrip()

        if process_data['type'] == 'Căn cược công dân mặt sau':
            # print('>>>>>>>>>>>>>>>>>>>>>>------------------------------>>>>>>>>>>>>>>')
            process_data['issue_place']= 'CỤC TRƯỞNG CỤC CẢNH SÁT QUẢN LÝ HÀNH CHÍNH VỀ TRẬT TỰ XÃ HỘI'
        return process_data

    def predict(self, image_path=None):
        # img = cv2.imread(image_path)
        results = self.model.predict(self.img)
        data = {}
        for r in results:
            boxs = r.boxes
            classes = boxs.cls
            data = {

            }
            for idx, box in enumerate(boxs.xyxy):
                x1,y1,x2,y2 = box.tolist()
                name = self.names[int(classes[idx])]
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
                if(name == 'chip_back'):
                    data['type'] = 'Căn cược công dân mặt sau'
                    continue
                # text = get_ocr_results(int(x1), int(y1), int(x2), int(y2), name)
                # print(int(x1), int(y1), int(x2), int(y2))
                text = self.get_ocr_results(int(x1), int(y1), int(x2), int(y2), name)

                if name in data:
                    data[name].append([int(y1), text])
                else:
                    data[name] = [[int(y1), text]]
            print(data)
            
            return self.process_data(data)