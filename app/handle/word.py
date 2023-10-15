import json
from docx import Document
import os
from docx.shared import Pt, RGBColor


def check_exists(path):
    exists = os.path.exists(path)
    if exists:
        print('true')
        return True
    else:
        print('false')
        return False

def so_yeu_ly_lich(json_string):
    doc = Document(r'handle/word_form/so-yeu-ly-lich.docx')
    style = doc.styles['Normal']
    font = style.font
    font.name = 'Time New Roman'
    font.size = Pt(12)
    data = json.loads(json_string)
    birth_day = data['birth_day'].split('/')
    expire_date = data['expire_date'].split('/') # this is expride_date,

    for para in doc.paragraphs:
        for run in para.runs:
            if run.bold is not True:
                para.text = para.text.replace('Số chứng minh…………………..', 'Số chứng minh……' + data['id']+ '.....')

                para.text = para.text.replace('Họ và tên (chữ in hoa)………………………………………', 'Họ và tên (chữ in hoa).....'+ data['name']+ '...')
                para.text = para.text.replace('. Sinh ngày……tháng …..năm …………', '. Sinh ngày ' +
                               birth_day[0] + ' tháng ' + birth_day[1] + ' năm ' + birth_day[2] + '   ')
                para.text = para.text.replace('Nam/ Nữ ….…….……........', 'Nam/ Nữ …..' + data['gender'])
                para.text = para.text.replace('Nguyên quán……', 'Nguyên quán…' + data['origin_location'])
                para.text = para.text.replace('Chỗ ở hiện nay ……', 'Chỗ ở hiện nay...' + data['recent_location'])
                # # test expire_data == issued_data
                para.text = para.text.replace('cấp ngày .…/…./……',
                               'cấp ngày ' + expire_date[0] + '/' + expire_date[1] + '/' + expire_date[2])
                # # para.text = para.text.replace('cấp ngày .…/…./……', 'cấp ngày '+ issued_date[0]+'/'+issued_date[1]+'/'+ issued_date[2])
    doc.save(f'handle/dir_save/so-yeu-ly-lich-{data["name"]}.docx')

def don_xin_dk_tam_tru(json_string):
    doc = Document(r'handle/word_form/don_xin_dk_tam_tru.docx')
    # style = doc.styles['Normal']
    # font = style.font
    # font.name = 'Time New Roman'
    # font.size = Pt(12)
    data = json.loads(json_string)

    birth_day = data['birth_day'].split('/')
    expire_date = data['expire_date'].split('/')  # this is expride_date,

    for para in doc.paragraphs:
        for run in para.runs:
            if run.bold is not True:
                para.text = para.text.replace('Số CCCD: ................................. ', 'Số CMND: ..' + data['id']+ '...')
                para.text = para.text.replace('Tôi tên là: ....', 'Tôi tên là: ..' + data['name'])
                para.text = para.text.replace('Ngày sinh:....', 'Ngày sinh:..' +
                                              birth_day[0] + '/' + birth_day[1] + '/' + birth_day[2] + '   ')
                para.text = para.text.replace('Địa chỉ thường trú......',
                                              'Địa chỉ thường trú......' + data['recent_location'])
                # test expire_data == issued_data
                para.text = para.text.replace('Ngày:..................................................',
                                              'Ngày:...' + expire_date[0] + '/' + expire_date[1] + '/' + expire_date[2])
                # para.text = para.text.replace('Cấp tại:.....', 'Cấp tại:.....'+ issued_place[0]+'/'+issued_place[1]+'/'+ issued_date[2])
    doc.save(f'handle/dir_save/don_xin_dk_tam_tru-{data["name"]}.docx')

def don_xin_tam_vang(json_string):
    doc = Document(r'handle/word_form/don_xin_tam_vang.docx')
    style = doc.styles['Normal']
    font = style.font
    font.name = 'Time New Roman'
    font.size = Pt(12)
    data = json.loads(json_string)
    birth_day = data['birth_day'].split('/')
    expire_date = data['expire_date'].split('/')  # this is expride_date,

    for para in doc.paragraphs:
        for para in doc.paragraphs:
            for run in para.runs:
                if run.bold is not True:
                    para.text = para.text.replace('Số CCCD:................',
                                                  'Số CCCD: ....' + data['id'])
                    para.text = para.text.replace('Tôi tên là: ....', 'Tôi tên là: ..' + data['name'])
                    para.text = para.text.replace('Ngày sinh:....', 'Ngày sinh:..' +
                                                  birth_day[0] + '/' + birth_day[1] + '/' + birth_day[2] + '   ')
                    para.text = para.text.replace('Địa chỉ thường trú:.....',
                                                  'Địa chỉ thường trú:...' + data['recent_location'])
                    # test expire_data == issued_data
                    para.text = para.text.replace('Ngày:.....',
                                                  'Ngày:...' + expire_date[0] + '/' + expire_date[1] + '/' +
                                                  expire_date[2])
                    # para.text = para.text.replace('Cấp tại:.....', 'Cấp tại:.....'+ issued_place[0]+'/'+issued_place[1]+'/'+ issued_date[2])
    doc.save(f'handle/dir_save/don_xin_tam_vang-{data["name"]}.docx')

json_string = ('{"type": "Mặt sau", '
               '"name": "PHAM DUY LONG", '
               '"recent_location": "S Trà Co, Thanh Cái, '
               'Qung NInh phó Móng Khu Trang Ginl Trà Co, Thanh Móng Cál, phó", '
               '"birth_day": "03/12/2006", '
               '"id": "022206004066", '
               '"expire_date": "01/12/2031", '
               '"nationality": "Việt Nam", '
               '"origin_location": "Hải Xuan, Thành phố Móng Cái, Quảng Ninh Hải Xuán, Thành phó Móng Cá", '
               '"gender": "Nam"}')

json_string2 = json.dumps({'type': 'Căn cược công dân mặt trước', 'recent_location': '8, Văn Thân 103/28, Văn Thân 103/28 Phường 08, Quận 6, TP. Hồ Chí Minh', 'name': 'PHAN NGỌC TRÂM', 'id': '079192019848', 'expire_date': '06/06/2032', 'birth_day': '06/06/1992', 'origin_location': 'Phường 08, Quận 6, TP.Hồ Chí Minh Phường 08, Quận 6, TP', 'nationality': 'Việt Nam', 'gender': 'Nữ'})


# ======PATH=====

# ======Call Function=====
so_yeu_ly_lich(json_string2)
# don_xin_dk_tam_tru(json_string2)
# don_xin_tam_vang(json_string2)

