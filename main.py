import json

from docx import Document
import os

# Mở tài liệu Word

path = r'app/handle/word_form/xinduong.docx'

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

