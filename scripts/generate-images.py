from google import genai
from google.genai import types
from PIL import Image
import io
import os
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

client = genai.Client(api_key="AIzaSyAXTk2CgeQnDd30N2nwZR9RLWoeUoC6QFY")

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'generated')
os.makedirs(OUTPUT_DIR, exist_ok=True)

images = [
    ("hero-main.png", (600,400), "Professional education photography: Happy diverse Asian children aged 6-10 reading colorful English books together in a bright modern classroom with bookshelves. Warm natural lighting, cheerful atmosphere, high quality."),
    ("divider-classroom.png", (1400,300), "Wide panoramic photo of modern Asian school classroom, elementary students reading English books at desks, teacher helping, natural sunlight, warm tones, professional photography."),
    ("divider-teens.png", (1400,300), "Asian teenage students 14-17 studying together in modern library, some with tablets some with books, collaborative learning, natural light, warm tones, professional photo."),
    ("divider-books.png", (1400,300), "Close-up artistic photo of children hands holding colorful open English storybooks, warm golden bokeh background, shallow depth of field, professional photography."),
    ("og-reading-pathway.png", (1200,630), "Professional social media banner: dark blue gradient background with subtle book pattern. Large white bold text Reading Pathway in center. Below: Trophy9 and Achieve3000. Clean modern corporate design."),
    ("icon-phonics.png", (200,200), "Cute flat design icon: colorful letter blocks A B C with tiny cartoon child reading a book. Minimal vector style, pastel colors, white background."),
    ("icon-reading.png", (200,200), "Flat design icon: open book with colorful pages and a glowing lightbulb above. Minimal vector illustration, education theme, white background."),
    ("icon-graduation.png", (200,200), "Flat design icon: blue graduation cap with golden tassel and diploma scroll. Minimal vector illustration, white background."),
    ("bg-pattern-dots.png", (400,400), "Seamless tileable pattern: very subtle small light blue dots arranged in grid on pure white background. Minimal geometric texture for website background."),
    ("bg-pattern-books.png", (400,400), "Seamless tileable pattern: very subtle thin gray outline drawings of small books pencils and stars on pure white background. Minimal line art texture.")
]

# Try Imagen 4.0 first, fallback to gemini-2.5-flash-image
MODELS = ["imagen-4.0-generate-001", "gemini-2.5-flash-image"]

for name, size, prompt in images:
    print(f"Generating: {name}...")
    generated = False

    for model_name in MODELS:
        try:
            if "imagen" in model_name:
                response = client.models.generate_images(
                    model=model_name,
                    prompt=prompt,
                    config=types.GenerateImagesConfig(
                        number_of_images=1
                    )
                )
                if response.generated_images:
                    img_data = response.generated_images[0].image.image_bytes
                    image = Image.open(io.BytesIO(img_data))
                    image = image.resize(size, Image.LANCZOS)
                    if image.mode != 'RGB':
                        image = image.convert('RGB')
                    filepath = os.path.join(OUTPUT_DIR, name)
                    image.save(filepath, "PNG")
                    print(f"  OK [{model_name}]: {name} ({image.size})")
                    generated = True
                    break
            else:
                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        response_modalities=["IMAGE", "TEXT"]
                    )
                )
                for part in response.candidates[0].content.parts:
                    if part.inline_data and part.inline_data.mime_type.startswith("image/"):
                        img_data = part.inline_data.data
                        image = Image.open(io.BytesIO(img_data))
                        image = image.resize(size, Image.LANCZOS)
                        if image.mode != 'RGB':
                            image = image.convert('RGB')
                        filepath = os.path.join(OUTPUT_DIR, name)
                        image.save(filepath, "PNG")
                        print(f"  OK [{model_name}]: {name} ({image.size})")
                        generated = True
                        break
                if generated:
                    break

        except Exception as e:
            err = str(e)[:150]
            print(f"  [{model_name}] Error: {err}")
            continue

    if not generated:
        print(f"  FAILED: Could not generate {name}")

print("\nDone!")
for f in os.listdir(OUTPUT_DIR):
    fpath = os.path.join(OUTPUT_DIR, f)
    print(f"  {f} ({os.path.getsize(fpath) // 1024}KB)")
