import cv2
import easyocr
import pytesseract
from vietocr.tool.predictor import Predictor
from vietocr.tool.config import Cfg
from PIL import Image

config = Cfg.load_config_from_name('vgg_transformer')
config['cnn']['pretrained']=False
config['device'] = 'cpu'
detector = Predictor(config)


image_path = 'results/1694537219-name.png'
img2 = Image.open(image_path)
img2.show()
img = cv2.imread(image_path)
# img = cv2.threshold(img, 100, 255, cv2.THRESH_BINARY)[1]
reader = easyocr.Reader(['vi'], gpu=False)

results = reader.readtext(img)

for (bbox, text, prob) in results:
    print(text)

s = detector.predict(img2)
print('s', s)