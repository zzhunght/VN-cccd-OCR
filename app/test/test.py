import cv2

# img_path = 'data/val/15.jpg'


# img = cv2.imread(img_path)
# img = cv2.resize(img,(768,640))
# img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# img = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)[1]
# img = cv2.GaussianBlur(img, (1, 1), 0)
# cv2.imshow('img',img)
# cv2.imwrite('result.jpg',img)
# cv2.imshow('img',img)

# cv2.waitKey(0)

# cv2.destroyAllWindows()

data = {
    'origin_location': [[230, 'Quảng Ninh']],
    'id': [[98, '272863403']],
    'recent_location': [[318, 'Sông Ray, Cầm Mỹ, Đồng Nai'], [289, 'Ấp 1']],
    'name': [[128, 'TRẦN THỊ THU PHƯƠNG']],
    'birth_day': [[196, '26-09-2001']]
}

# Sắp xếp lại từng mảng trong từng key theo thứ tự tăng dân số
for key in data:
    data[key].sort(key=lambda x: x[0])

print(data)