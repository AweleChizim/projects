import face_recognition
import cv2
import os
import glob
import numpy as np

class faceRecognizer:
    def __init__(self):
        self.known_face_encodings = []
        self.known_names = []

        # Resize the frame to improve speed
        self.frame_resizing = 0.25

    def compare_faces(self, image_path):  # Face recognition in images
        image = cv2.imread(image_path)
        if image is None:
            print("Error: Unable to read image.")
            return
        
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        face_encodings = face_recognition.face_encodings(rgb_image)

        if not face_encodings:
            print("Unable to process image.\nPlease take another picture or manually upload one")
            if os.path.exists(image_path):
                os.remove(image_path)
                print(f"Deleted: {image_path}")
            return

        face_encoding = face_encodings[0]  # Take the first face found
        cv2.imshow("Image", image)

        names = []
        for i, known_encoding in enumerate(self.known_face_encodings):
            result = face_recognition.compare_faces([known_encoding], face_encoding)
            face_distance = face_recognition.face_distance([known_encoding], face_encoding)
            
            if result[0]:  # If a match is found
                names.append(self.known_names[i])

        if names:
            print(f"Face Detected: Welcome {names[0]}!")
        else:
            print("Unknown Face Detected!")

        cv2.waitKey(0)
        cv2.destroyAllWindows()

    def load_encoding_images(self, images_path):
        # Load Images
        images_path = glob.glob(os.path.join(images_path, "*.*"))

        print(f"{len(images_path)} encoding images found.\nEncoding...")

        # Store image encoding and names
        for image_path in images_path:
            image = cv2.imread(image_path)
            if image is None:
                print(f"Error loading image {image_path}. Skipping...")
                continue
            
            rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

            # Get the filename only from the initial file path
            filename = os.path.splitext(os.path.basename(image_path))[0]

            # Get encoding
            face_encodings = face_recognition.face_encodings(rgb_image)
            if face_encodings:
                image_encoding = face_encodings[0]  # Only taking the first face
                print(f"Face encoding extracted for {filename}!")
                self.known_face_encodings.append(image_encoding)
                self.known_names.append(filename)
            else:
                print(f"No faces detected in {filename}. Please use a clearer image!")

    def detect_known_faces(self, frame):  # Face recognition from the WebCam
        if not hasattr(self, "frame_resizing") or self.frame_resizing <= 0:
            self.frame_resizing = 1  # Default to 1 if not set

        small_frame = cv2.resize(frame, (0, 0), fx=self.frame_resizing, fy=self.frame_resizing)
        rgb_small_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)

        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        names = []
        for face_encoding in face_encodings:
            name = "Unknown"

            if self.known_face_encodings:  # Prevents face_distance errors
                matches = face_recognition.compare_faces(self.known_face_encodings, face_encoding)
                face_distances = face_recognition.face_distance(self.known_face_encodings, face_encoding)
                best_match_index = np.argmin(face_distances)

                if matches and matches[best_match_index]:
                    name = self.known_names[best_match_index]

            names.append(name)

        # Convert to numpy array to adjust coordinates with frame resizing
        face_locations = np.array(face_locations) / self.frame_resizing
        return face_locations.astype(int), names
