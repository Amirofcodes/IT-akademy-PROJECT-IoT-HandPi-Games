import cv2

cap = cv2.VideoCapture(0)  # Use default camera index
if not cap.isOpened():
    print("Error: Could not open default camera")
else:
    print("Default camera opened successfully")

while True:
    success, frame = cap.read()
    if not success:
        print("Error: Failed to capture frame")
        break
    cv2.imshow('Frame', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
