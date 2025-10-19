import urllib.request
import os

# The image URL (from the attachment you provided)
image_url = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop"

# The destination path
dest_path = r"c:\Users\digba\OneDrive\Desktop\BT BackendDev\BT Backend Assignment 2\Profile\profile.jpg"

# Create directories if they don't exist
os.makedirs(os.path.dirname(dest_path), exist_ok=True)

try:
    # Download the image
    urllib.request.urlretrieve(image_url, dest_path)
    print(f"Image saved successfully to {dest_path}")
except Exception as e:
    print(f"Error: {e}")
