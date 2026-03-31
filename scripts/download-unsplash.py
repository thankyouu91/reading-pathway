import urllib.request
import os
import sys

sys.stdout = open(sys.stdout.fileno(), mode='w', encoding='utf-8', buffering=1)

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'generated')
os.makedirs(OUT, exist_ok=True)

images = [
    # Hero
    ("hero-main.jpg", "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=85&fit=crop"),
    # Hero accent
    ("hero-accent-1.jpg", "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?w=400&q=80&fit=crop"),
    ("hero-accent-2.jpg", "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&q=80&fit=crop"),
    # Photo dividers
    ("divider-classroom.jpg", "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1400&h=300&q=80&fit=crop&crop=center"),
    ("divider-students.jpg", "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1400&h=300&q=80&fit=crop&crop=center"),
    ("divider-books.jpg", "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1400&h=300&q=80&fit=crop&crop=center"),
    # Section backgrounds
    ("bg-kids-reading.jpg", "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=600&q=75&fit=crop"),
    ("bg-teens-studying.jpg", "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=75&fit=crop"),
    ("bg-graduation.jpg", "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=600&q=75&fit=crop"),
    ("bg-classroom-wide.jpg", "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=75&fit=crop"),
    # Pathway stage illustrations
    ("stage-kindergarten.jpg", "https://images.unsplash.com/photo-1587654780301-9e2c67e34a94?w=300&q=80&fit=crop"),
    ("stage-elementary.jpg", "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&q=80&fit=crop"),
    ("stage-middle.jpg", "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=300&q=80&fit=crop"),
    ("stage-highschool.jpg", "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=300&q=80&fit=crop"),
    ("stage-university.jpg", "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&q=80&fit=crop"),
    # OG image for social sharing
    ("og-social.jpg", "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=630&q=85&fit=crop&crop=center"),
]

for name, url in images:
    filepath = os.path.join(OUT, name)
    if os.path.exists(filepath):
        print(f"  Skip (exists): {name}")
        continue
    print(f"Downloading: {name}...")
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
            with open(filepath, 'wb') as f:
                f.write(data)
            print(f"  OK: {name} ({len(data)//1024}KB)")
    except Exception as e:
        print(f"  Error: {str(e)[:100]}")

print("\nDone!")
for f in sorted(os.listdir(OUT)):
    print(f"  {f} ({os.path.getsize(os.path.join(OUT, f))//1024}KB)")
