import os
import requests
from PIL import Image
import pytesseract
from fpdf import FPDF
import openai

# Set up API key
#openai_key = "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"
openai_key = "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"
openai.api_key = openai_key
pytesseract.pytesseract.tesseract_cmd = "C:\\Users\\Praktikant\\AppData\\Local\\Programs\\Tesseract-OCR\\tesseract.exe"

# Function to extract text from an image
def extract_text_from_image(image_path):
    image = Image.open(image_path)
    text = pytesseract.image_to_string(image, lang='deu+eng')
    return text

# Function to make an API request to OpenAI GPT-4
def make_gpt_request(prompt, max_tokens=256, model="gpt-4-0613", temperature=1.0, text=""):
    endpoint = f"https://api.openai.com/v1/chat/completions"
    
    response = openai.Completion.create(
    #endpoint = "https://api.openai.com/v1/chat/completions",
    model = "gpt-4-0613",
    prompt="extrachiere Artikelname (ohne bofrost), Artikelnummer, MHD, (LAX or Produktionscode or Batch or LOT) von:\n" + text + "\n Nutze folgendes Format:\nArtikelname: <Artikelname>; Artikelnummer: <Artikelnummer>; MHD: <MDG>; usw...",
    temperature=1,
    max_tokens=256,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )
    # Define parameters for API request
    params = {
        "prompt": prompt,
        "max_tokens": max_tokens,
        "temperature": temperature
    }

    # Make API request with authentication header
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {openai_key}"
    }

    #response = requests.post(endpoint, json=params, headers=headers)
    print("Test")
    print(response)

    # Return response
    return response.json()["choices"][0]["text"]

# Create the PDF document
pdf = FPDF()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.add_page()

# German Section
pdf.set_font('Arial', 'B', 16)
pdf.multi_cell(0, 10, 'German Section', align='L')
pdf.ln(10)
pdf.set_font('Arial', '', 12)

# Traverse through the image directories, extract text, and process the information
image_dir = "S:\\user\\Praktikant(in)\\Wadih Achkar\\image analyser project\\images"

for subdir, dirs, files in os.walk(image_dir):
    for file in files:
        if file.endswith(".jpg") or file.endswith(".png"):
            image_path = os.path.join(subdir, file)
            extracted_text = extract_text_from_image(image_path)

            # Process the extracted text and extract required information using GPT-4
            prompt = f"extrachiere Artikelname (ohne bofrost), Artikelnummer, MHD, (LAX or Produktionscode or Batch or LOT) von:\n{extracted_text}\n Nutze folgendes Format:\nArtikelname: <Artikelname>; Artikelnummer: <Artikelnummer>; MHD: <MDG>; usw..."
            processed_text = make_gpt_request(prompt, model="gpt-4-0613", max_tokens=256, temperature=1.0, text=extracted_text)

            # Add the extracted information to the PDF (German Section)
            pdf.cell(0, 10, f"Image: {file}", ln=True)
            pdf.multi_cell(0, 10, processed_text, ln=True)

            # Get current position and add the image next to the text
            x = pdf.get_x()
            y = pdf.get_y()
            pdf.image(image_path, x=x + 10, y=y + 15, w=80)
            pdf.set_xy(x, y + 100)

            pdf.ln(10)

# Add a page break
pdf.add_page()

# English Section
pdf.set_font('Arial', 'B', 16)
pdf.multi_cell(0, 10, 'English Section', align='L')
pdf.ln(10)
pdf.set_font('Arial', '', 12)

# Traverse through the image directories again
for subdir, dirs, files in os.walk(image_dir):
    for file in files:
        if file.endswith(".jpg") or file.endswith(".png"):
            image_path = os.path.join(subdir, file)
            extracted_text = extract_text_from_image(image_path)

            # Process the extracted text and extract required information using GPT-4
            prompt = f"extract Artikelname (without bofrost), Artikelnummer, MHD, (LAX or production code or batch or LOT) from:\n{extracted_text}\n Use the following format:\nArtikelname: <Artikelname>; Artikelnummer: <Artikelnummer>; MHD: <MDG>; etc..."
            processed_text = make_gpt_request(prompt, model="gpt-4-0613", max_tokens=256, temperature=1.0)

            # Add the extracted information to the PDF (English Section)
            pdf.cell(0, 10, f"Image: {file}", ln=True)
            pdf.multi_cell(0, 10, processed_text, ln=True)

            # Get current position and add the image next to the text
            x = pdf.get_x()
            y = pdf.get_y()
            pdf.image(image_path, x=x + 10, y=y + 15, w=80)
            pdf.set_xy(x, y + 100)

            pdf.ln(10)

# Save the PDF document
pdf.output("image_information.pdf")

######################################################################################################################################################

import os
from PIL import Image

jpg_folder = "S:\\user\\Praktikant(in)\\Florian Arndt\\chat_gpt\\bild_erkennung\\img\\jpg"
png_folder = "S:\\user\\Praktikant(in)\\Florian Arndt\\chat_gpt\\bild_erkennung\\img\\png"

for jpg_file in os.listdir(jpg_folder):
    # Open the JPG file
    jpg_image = Image.open(jpg_folder + "\\" + jpg_file)

    # Convert the image to PNG format
    png_image = jpg_image.convert('RGB')

    # Save the PNG image
    png_image.save(png_folder + "\\" + jpg_file.replace(".JPG", ".png"))
    print(jpg_file + " -> " + jpg_file.replace(".JPG", ".png"))

######################################################################################################################################################

import requests

# Set up API key
openai_key = "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"

def make_request(prompt: str, max_token: int= 250, model: str = "text-davinci-003", temperature:float = 0.7):
    endpoint = f"https://api.openai.com/v1/engines/{model}/completions"

    # Define parameters for API request
    params = {
        "prompt": prompt,
        "max_tokens": max_token,
        "temperature": temperature
    }

    # Make API request with authentication header
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {openai_key}"
    }

    response = requests.post(endpoint, json=params, headers=headers)

    # Print response
    return response.json()["choices"][0]["text"]
    
print(make_request("Wer ist Mojang?", 250))
