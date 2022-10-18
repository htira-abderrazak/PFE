
from re import S
import tensorflow.keras as tpp
import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np
import sys 



hoodie = sys.argv[1]
file = tpp.utils.get_file(
    hoodie,
    "http://localhost:3000/api/lireimage/"+hoodie)
img = tpp.preprocessing.image.load_img(file, target_size=[224, 224]
                                            )
plt.imshow(img)
plt.axis('off')
x = tpp.preprocessing.image.img_to_array(img)

x = tf.keras.applications.mobilenet.preprocess_input(
    x[tf.newaxis,...])

labels_path = tpp.utils.get_file(
    'ImageNetLabels.txt',
    'https://storage.googleapis.com/download.tensorflow.org/data/ImageNetLabels.txt')
labels = np.array(open(labels_path).read().splitlines())


model = tpp.applications.MobileNetV2()
predictions = model(x)


top_5_classes_index = np.argsort(predictions)[0 , ::-1][:1]+1



top_5_classes = labels[top_5_classes_index]


str = ''.join(top_5_classes)
 
 
from googletrans import Translator

translator = Translator()
result = translator.translate(str, src='en', dest='ar')

#"""ch=''.join(reversed(translate_text))"""
text=result.pronunciation
print("text")