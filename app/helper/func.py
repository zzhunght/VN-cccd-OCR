import base64
import cv2
import numpy as np
def img_process_b64_to_rgb(base_64_img: str):
    image_data = base64.b64decode(base_64_img)
    np_array = np.frombuffer(image_data, np.uint8)
    image_bgr = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)

    return image_rgb