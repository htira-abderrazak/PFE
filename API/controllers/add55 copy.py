
from re import S
import tensorflow.keras as tpp
import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np
import sys 
import pymongo
import tensorflow.keras as tpp
import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np 
import scipy
import scipy.misc
import scipy.cluster
from scipy.spatial import KDTree
from scipy.spatial import KDTree
from webcolors import CSS3_HEX_TO_NAMES
from webcolors import hex_to_rgb
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
 
 
 
from google_trans_new  import google_translator 

translator = google_translator()  
translate_text = translator.translate(str,lang_tgt='ar')  



hoodie = sys.argv[1]

NUM_CLUSTERS = 5

file = tpp.utils.get_file(
    hoodie,
    "http://localhost:3000/api/lireimage/"+hoodie)
img = tpp.preprocessing.image.load_img(file, target_size=[224, 224]
                                            )
plt.imshow(img)
plt.axis('off')
ar = np.asarray(img)
shape = ar.shape
ar = ar.reshape(scipy.product(shape[:2]), shape[2]).astype(float)

codes, dist = scipy.cluster.vq.kmeans(ar, NUM_CLUSTERS)


vecs, dist = scipy.cluster.vq.vq(ar, codes)         # assign codes
counts, bins = scipy.histogram(vecs, len(codes))    # count occurrences

index_max = scipy.argmax(counts)                    # find most frequent
peak = codes[index_max]
import math
colour = ''.join(chr(math.ceil(c)) for c in peak).encode("utf-8").hex()
print ('most frequent is %s (#%s) ' % (peak, colour))
def convert_rgb_to_names(rgb_tuple):
    
    # a dictionary of all the hex and their respective names in css3
    css3_db = CSS3_HEX_TO_NAMES
    names = []
    rgb_values = []
    for color_hex, color_name in css3_db.items():
        names.append(color_name)
        rgb_values.append(hex_to_rgb(color_hex))
    
    kdt_db = KDTree(rgb_values)
    distance, index = kdt_db.query(rgb_tuple)
    return f' {names[index]}'


result= convert_rgb_to_names((int(peak[0]),int(peak[1]),int(peak[0])))




print(str)




from pymongo import MongoClient
client = MongoClient("localhost", 27017)
db = client["ProjetDB"]
employees = db["photos.files"]

employees.find_one_and_update({"filename":hoodie},{"$set":{"metadata":translate_text}})
employees.find_one_and_update({"filename":hoodie},{"$set":{"couleurDominant":result}})
print(str)