from faceRecognition import faceRecognizer
import time
import cv2

facesDetected = []

print(f"Welcome to Group 2 Facial Recognition System!")
    
def startSystem():
    userType = int(input("\nEnter 1 for Face Recognition\nEnter 2 for Testing\nEnter 3 to Exit\n"))
    if userType == 1:
        dataCollection()
        exit()
    elif userType == 2:
        testing()
        startSystem()
    elif userType == 3:
        exit()
    else:
        print("Invalid Input!\n")
        startSystem()

import cv2
import os
import time

def dataCollection():
    imageCap = cv2.VideoCapture(0)  # Connect to webcam
    faceDetection = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    label = input("Enter Username: ").strip()
    if not label:
        print("Invalid Username!")
        return

    # Ensure images directory exists
    images_dir = 'images'
    if not os.path.exists(images_dir):
        os.makedirs(images_dir)

    imagePath = os.path.join(images_dir, f"{label}.jpg")

    print(f"Collecting image. \nPlease look into the camera.")
    time.sleep(3)

    ret, frame = imageCap.read()  # Capture frame
    if not ret:
        print("Error: Could not capture image from camera.")
        return

    faces = faceDetection.detectMultiScale(frame, 1.3, 5)  # Detect faces

    if len(faces) == 0:
        print("No face detected. \nPlease check your camera and lighting, and try again.")
        imageCap.release()
        cv2.destroyAllWindows()
        return    
    else:
        for x, y, w, h in faces:
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 0), 3)
            cv2.imshow('frame', frame)
            cv2.imwrite(imagePath, frame[y:y + h, x:x + w])  # Save cropped face
            print(f"Image saved as {imagePath}")
            facesDetected.append(imagePath)
            # Wait for user to press 'a' to exit
            cv2.waitKey(0)
            imageCap.release()
            cv2.destroyAllWindows()
            faceVerification()

def faceVerification():
    # Enconding faces from our image dataset
    faceRec = faceRecognizer() 
    faceRec.load_encoding_images("dataset/")

    for i in facesDetected:
        faceRec.compare_faces(i)

def testing():
    # Enconding faces from our image dataset
    faceRec = faceRecognizer() 
    faceRec.load_encoding_images("dataset\\")

    folder_path = "testImages\\"

    # List all files and directories in the folder
    file_names = os.listdir(folder_path)

    # Print only files (excluding directories)
    files_only = [f for f in file_names if os.path.isfile(os.path.join(folder_path, f))]

    for i in files_only:
        faceRec.compare_faces("testImages/"+i)

startSystem()
