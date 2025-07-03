import io
import numpy as np
from PIL import Image
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import tensorflow as tf

app = Flask(__name__)
CORS(app)

MODEL = tf.keras.applications.mobilenet_v2.MobileNetV2(weights="imagenet")
IMG_SIZE = (224, 224)

def preprocess(img):
    img = img.resize(IMG_SIZE)
    arr = tf.keras.preprocessing.image.img_to_array(img)
    arr = tf.keras.applications.mobilenet_v2.preprocess_input(arr)
    return np.expand_dims(arr, axis=0)

def decode_preds(preds):
    decoded = tf.keras.applications.mobilenet_v2.decode_predictions(preds, top=3)[0]
    return [{"label": c, "desc": d, "prob": float(p)} for c, d, p in decoded]

@app.route('/classify', methods=['POST'])
def classify():
    file = request.files['image']
    img = Image.open(file.stream).convert('RGB')
    x = preprocess(img)
    preds = MODEL.predict(x)
    decoded = decode_preds(preds)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    return jsonify({
        "predictions": decoded
    })

# FGSM Attack
def fgsm(image, epsilon=0.04):
    image = tf.convert_to_tensor(image)
    image = tf.cast(image, tf.float32)
    with tf.GradientTape() as tape:
        tape.watch(image)
        prediction = MODEL(image)
        loss = tf.keras.losses.categorical_crossentropy(
            tf.one_hot([np.argmax(prediction.numpy())], 1000), prediction
        )
    gradient = tape.gradient(loss, image)
    signed_grad = tf.sign(gradient)
    adv_img = image + epsilon * signed_grad
    adv_img = tf.clip_by_value(adv_img, -1, 1)
    return adv_img.numpy()

@app.route('/attack', methods=['POST'])
def attack():
    file = request.files['image']
    img = Image.open(file.stream).convert('RGB')
    x = preprocess(img)
    # Original prediction
    orig_preds = MODEL.predict(x)
    orig_decoded = decode_preds(orig_preds)
    # FGSM adversarial example
    adv_x = fgsm(x)
    adv_preds = MODEL.predict(adv_x)
    adv_decoded = decode_preds(adv_preds)
    # Convert adversarial image back to bytes
    adv_img_arr = adv_x[0]
    adv_img_arr = ((adv_img_arr + 1.0) * 127.5).astype(np.uint8)
    adv_img_pil = Image.fromarray(adv_img_arr)
    buf = io.BytesIO()
    adv_img_pil.save(buf, format="PNG")
    buf.seek(0)
    adv_img_b64 = "data:image/png;base64," + \
        (np
         .base64
         .b64encode(buf.getvalue())
         .decode("utf-8"))
    return jsonify({
        "original_predictions": orig_decoded,
        "adv_predictions": adv_decoded,
        "adv_image": adv_img_b64
    })

if __name__ == "__main__":
    app.run(port=5000)
