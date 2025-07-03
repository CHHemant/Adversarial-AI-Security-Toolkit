# Adversarial AI Security Toolkit

## What is this?

The **Adversarial AI Security Toolkit** is a web application that demonstrates how adversarial examples can fool AI image classifiers. It is designed for cybersecurity learning and AI robustness research. With this toolkit, you can:

- Upload any image and view its classification from a pre-trained AI model (MobileNetV2).
- Generate a subtle "adversarial" version of the image that tricks the AI into misclassifying it, even though it still looks almost identical to a human.
- Compare predictions and visualize the vulnerability of modern AI systems to adversarial attacks.

**Educational Use Only:**  
This project is intended for educational and research purposes to raise awareness of AI security issues.

---

## How it works

### High-Level Overview

- **Frontend (React):**  
  Lets users upload images, trigger attacks, and view/compare AI predictions for both the original and adversarial images.

- **Backend (Flask + TensorFlow):**  
  Receives images, classifies them using a pre-trained MobileNetV2, and generates adversarial images using the Fast Gradient Sign Method (FGSM) attack.

### Workflow

1. **User uploads an image** via the web interface.
2. **Original prediction:** The backend classifies the image and returns the top-3 predicted classes.
3. **Generate adversarial example:** When the user clicks "Attack," the backend applies FGSM to create a minimally perturbed image.
4. **Compare:** The frontend displays both images and their respective AI predictions, often showing that the adversarial image is misclassified.

---

## How to run

### Prerequisites

- Python 3.7+
- Node.js (v14 or higher)
- npm

---

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/adversarial-ai-toolkit.git
cd adversarial-ai-toolkit
```

---

### 2. Run the Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```
- The backend will start at `http://localhost:5000`

---

### 3. Run the Frontend

Open a new terminal window:

```bash
cd frontend
npm install
npm start
```
- The frontend will be available at `http://localhost:3000`

---

### 4. Using the Toolkit

1. **Open your browser and go to** [http://localhost:3000](http://localhost:3000)
2. **Upload an image** (JPG/PNG/etc).
3. **View the AI’s prediction** for the original image.
4. **Click "Attack (Generate Adversarial Example)"** to craft a subtle attack.
5. **Compare** the predictions and see how easily the AI can be fooled!

---

## Project Structure

```
adversarial-ai-toolkit/
│
├── backend/
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   └── src/
│       ├── App.js
│       ├── ImageUpload.js
│       └── ResultDisplay.js
│   └── package.json
│
├── package.json
└── README.md
```

---

## How the Adversarial Attack Works

- **Model:** MobileNetV2, pre-trained on ImageNet.
- **Attack:** FGSM (Fast Gradient Sign Method), which computes the gradient of the loss with respect to the input image and perturbs the image slightly in the direction that maximally increases the loss.
- **Effect:** The change is often imperceptible to humans but can cause the model to make a completely wrong prediction.

---

## Example Use Case

- Upload a cat image.
- Model predicts: "tabby cat" (99%).
- After attack, adversarial image looks almost the same, but model predicts: "banana" (87%).

---

## License

This project is for educational and research purposes only. Do not use it for malicious purposes.

---

## Credits

- [TensorFlow](https://www.tensorflow.org/)
- [React](https://react.dev/)
- [MobileNetV2 Paper](https://arxiv.org/abs/1801.04381)
- [FGSM Paper (Explaining and Harnessing Adversarial Examples)](https://arxiv.org/abs/1412.6572)

---

**Star the repo if you find it useful!**
