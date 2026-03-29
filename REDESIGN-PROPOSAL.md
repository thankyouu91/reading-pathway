# DE XUAT THIET KE LAI TOAN DIEN - READING PATHWAY LANDING PAGE

**Tai lieu:** Senior UI/UX Design Consultant Report
**Du an:** Reading Pathway - B2B Education SaaS Landing Page
**Doi tuong:** Hieu truong, chu trung tam ngoai ngu, giam doc giao duc tai Viet Nam, Lao, Campuchia
**Ngay:** 29/03/2026

---

## MUC LUC

1. [Phan Tich Hien Trang & Van De](#1-phan-tich-hien-trang)
2. [He Thong Mau Sac Moi](#2-he-thong-mau-sac)
3. [He Thong Typography](#3-he-thong-typography)
4. [Thu Vien Component](#4-thu-vien-component)
5. [Thiet Ke Tung Section](#5-thiet-ke-tung-section)
6. [Chien Luoc Mobile-First](#6-mobile-first)
7. [Chien Luoc Minh Hoa](#7-minh-hoa)
8. [Chien Luoc Animation](#8-animation)
9. [Toi Uu Chuyen Doi](#9-toi-uu-chuyen-doi)

---

## 1. PHAN TICH HIEN TRANG

### Cac Van De Nghiem Trong

**A. Kien Truc CSS Bi Pha Vo**
- `premium.css` ghi de `styles.css` voi 20+ xung dot truc tiep (vi du: `.hero`, `.btn-primary`, `.program-card`, `.stage-card`, `.activity-card`...)
- Moi file tu dinh nghia lai cung selector, tao ra specificity wars
- Giai phap: Gop thanh 1 file `design-system.css` duy nhat

**B. 17+ Mau Hardcode Khong Co Token**
- Tim thay cac mau hardcode: `#10B981`, `#059669`, `#F59E0B`, `#D97706`, `#991B1B`, `#7F1D1D`, `#FECACA`, `#FEF2F2`, `#FFF7ED`, `#E85D4A`, `#1a7fd4`, `#4F46E5`, `#9333EA`, `#0EA5E9`, `#006ACC`, `#002B55`, `#0C1220`, `#131D2E`
- Khong co he thong semantic colors

**C. 8 Kieu Card Khac Nhau**
- `.program-card`, `.activity-card`, `.level-card`, `.stage-card`, `.achieve-card`, `.why-card`, `.b2b-card`, `.pillar-card` - moi loai co style rieng, khong dong nhat

**D. Hero Bi An Tren Mobile**
- `line 1561 styles.css: .hero-visual { display: none; }` - mat hoan toan phan visual tren mobile

**E. Brand Red (#C8372D) Bi Dung Thieu**
- Chi xuat hien o Achieve3000 sections, trong khi do la brand color chinh

**F. CTA Khong Noi Bat**
- `.btn-primary` co gradient animation lien tuc (`gradientShift`) gay mat tap trung
- Khong co visual hierarchy ro rang giua primary va secondary CTA

---

## 2. HE THONG MAU SAC MOI

### Design Tokens - Thay The Toan Bo Hardcode Colors

```css
:root {
    /* ===== PRIMARY PALETTE ===== */
    --color-primary-50:  #EBF5FF;
    --color-primary-100: #D6EBFF;
    --color-primary-200: #ADD6FF;
    --color-primary-300: #6FB5FF;
    --color-primary-400: #2E8CE6;
    --color-primary-500: #0056A6;  /* Trophy Blue - Main */
    --color-primary-600: #004A8F;
    --color-primary-700: #003D75;
    --color-primary-800: #002D57;
    --color-primary-900: #001F3D;

    /* ===== SECONDARY PALETTE (Brand Red) ===== */
    --color-secondary-50:  #FFF5F4;
    --color-secondary-100: #FFE8E6;
    --color-secondary-200: #FFCCC8;
    --color-secondary-300: #F5918A;
    --color-secondary-400: #E05549;
    --color-secondary-500: #C8372D;  /* Achieve Red - Main */
    --color-secondary-600: #A02920;
    --color-secondary-700: #7F1D1D;
    --color-secondary-800: #5C1515;
    --color-secondary-900: #3D0E0E;

    /* ===== ACCENT PALETTE (IELTS Purple) ===== */
    --color-accent-50:  #F8F5FF;
    --color-accent-100: #F0EBFF;
    --color-accent-200: #DDD3FF;
    --color-accent-300: #B89EFF;
    --color-accent-400: #9B6FFF;
    --color-accent-500: #7C3AED;  /* IELTS Purple */
    --color-accent-600: #6525D4;
    --color-accent-700: #5120A8;
    --color-accent-800: #3D1880;
    --color-accent-900: #2B1159;

    /* ===== SEMANTIC COLORS ===== */
    --color-success-50:  #ECFDF5;
    --color-success-100: #D1FAE5;
    --color-success-500: #10B981;
    --color-success-600: #059669;
    --color-success-700: #047857;

    --color-warning-50:  #FFFBEB;
    --color-warning-100: #FEF3C7;
    --color-warning-500: #F59E0B;
    --color-warning-600: #D97706;

    --color-error-50:  #FEF2F2;
    --color-error-500: #EF4444;
    --color-error-600: #DC2626;

    /* ===== NEUTRAL PALETTE ===== */
    --color-neutral-0:   #FFFFFF;
    --color-neutral-25:  #FCFCFD;
    --color-neutral-50:  #F8FAFC;
    --color-neutral-100: #F1F5F9;
    --color-neutral-200: #E2E8F0;
    --color-neutral-300: #CBD5E1;
    --color-neutral-400: #94A3B8;
    --color-neutral-500: #64748B;
    --color-neutral-600: #475569;
    --color-neutral-700: #334155;
    --color-neutral-800: #1E293B;
    --color-neutral-900: #0F172A;
    --color-neutral-950: #0C1220;

    /* ===== SURFACE & BACKGROUND ===== */
    --surface-primary:   var(--color-neutral-0);
    --surface-secondary: var(--color-neutral-50);
    --surface-tertiary:  var(--color-neutral-100);
    --surface-inverse:   var(--color-neutral-900);
    --surface-brand:     var(--color-primary-50);

    /* ===== TEXT SEMANTIC ===== */
    --text-primary:   var(--color-neutral-800);
    --text-secondary: var(--color-neutral-500);
    --text-tertiary:  var(--color-neutral-400);
    --text-inverse:   var(--color-neutral-0);
    --text-brand:     var(--color-primary-500);
    --text-link:      var(--color-primary-500);

    /* ===== BORDER ===== */
    --border-default:  var(--color-neutral-200);
    --border-subtle:   var(--color-neutral-100);
    --border-strong:   var(--color-neutral-300);
    --border-brand:    var(--color-primary-200);

    /* ===== SHADOWS (thong nhat) ===== */
    --shadow-xs:  0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-sm:  0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md:  0 4px 6px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.04);
    --shadow-lg:  0 10px 15px rgba(0, 0, 0, 0.06), 0 4px 6px rgba(0, 0, 0, 0.04);
    --shadow-xl:  0 20px 25px rgba(0, 0, 0, 0.08), 0 8px 10px rgba(0, 0, 0, 0.04);
    --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.12);
    --shadow-brand: 0 4px 14px rgba(0, 86, 166, 0.25);
    --shadow-brand-lg: 0 8px 25px rgba(0, 86, 166, 0.3);

    /* ===== BORDER RADIUS ===== */
    --radius-xs:   4px;
    --radius-sm:   8px;
    --radius-md:   12px;
    --radius-lg:   16px;
    --radius-xl:   20px;
    --radius-2xl:  24px;
    --radius-full: 9999px;

    /* ===== SPACING SCALE (8px base) ===== */
    --space-1:  4px;
    --space-2:  8px;
    --space-3:  12px;
    --space-4:  16px;
    --space-5:  20px;
    --space-6:  24px;
    --space-8:  32px;
    --space-10: 40px;
    --space-12: 48px;
    --space-16: 64px;
    --space-20: 80px;
    --space-24: 96px;

    /* ===== TRANSITIONS ===== */
    --ease-default: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --ease-bounce:  cubic-bezier(0.34, 1.56, 0.64, 1);
    --duration-fast: 150ms;
    --duration-base: 250ms;
    --duration-slow: 400ms;
}
```

### Quy Tac Su Dung Mau

1. **Trophy9 sections**: Dung `--color-primary-*` lam chu dao
2. **Achieve3000 sections**: Dung `--color-secondary-*` lam chu dao
3. **IELTS sections**: Dung `--color-accent-*` lam chu dao
4. **CTA buttons**: Luon dung `--color-secondary-500` (Brand Red) - day la mau co contrast cao nhat, thu hut su chu y
5. **Khong bao gio hardcode**: Moi mau phai tham chieu tu token

---

## 3. HE THONG TYPOGRAPHY

### Font Scale (Major Third - 1.25 ratio)

```css
:root {
    /* ===== FONT FAMILIES ===== */
    --font-display: 'Quicksand', 'Inter', -apple-system, sans-serif;
    --font-body:    'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono:    'JetBrains Mono', 'Fira Code', monospace;

    /* ===== FONT SIZES ===== */
    --text-xs:   0.75rem;    /* 12px - captions, meta */
    --text-sm:   0.875rem;   /* 14px - secondary text */
    --text-base: 1rem;       /* 16px - body */
    --text-lg:   1.125rem;   /* 18px - lead text */
    --text-xl:   1.25rem;    /* 20px - small heading */
    --text-2xl:  1.5rem;     /* 24px - section subheading */
    --text-3xl:  1.875rem;   /* 30px - section heading */
    --text-4xl:  2.25rem;    /* 36px - page heading */
    --text-5xl:  3rem;       /* 48px - hero heading */
    --text-6xl:  3.75rem;    /* 60px - hero display (desktop) */

    /* ===== LINE HEIGHTS ===== */
    --leading-none:    1;
    --leading-tight:   1.15;
    --leading-snug:    1.3;
    --leading-normal:  1.5;
    --leading-relaxed: 1.65;
    --leading-loose:   1.8;

    /* ===== FONT WEIGHTS ===== */
    --weight-regular:  400;
    --weight-medium:   500;
    --weight-semibold: 600;
    --weight-bold:     700;
    --weight-extrabold:800;

    /* ===== LETTER SPACING ===== */
    --tracking-tighter: -0.03em;
    --tracking-tight:   -0.02em;
    --tracking-normal:  0;
    --tracking-wide:    0.02em;
    --tracking-wider:   0.05em;
    --tracking-widest:  0.1em;
}
```

### Typography Utilities

```css
/* Display - Hero heading */
.text-display {
    font-family: var(--font-display);
    font-size: var(--text-5xl);
    font-weight: var(--weight-extrabold);
    line-height: var(--leading-tight);
    letter-spacing: var(--tracking-tighter);
}

/* H1 - Page heading */
.text-h1 {
    font-family: var(--font-display);
    font-size: var(--text-4xl);
    font-weight: var(--weight-extrabold);
    line-height: var(--leading-tight);
    letter-spacing: var(--tracking-tight);
}

/* H2 - Section heading */
.text-h2 {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    font-weight: var(--weight-extrabold);
    line-height: var(--leading-snug);
    letter-spacing: var(--tracking-tight);
}

/* H3 - Card heading */
.text-h3 {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: var(--weight-bold);
    line-height: var(--leading-snug);
    letter-spacing: var(--tracking-normal);
}

/* H4 - Sub heading */
.text-h4 {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: var(--weight-bold);
    line-height: var(--leading-snug);
}

/* Body */
.text-body {
    font-family: var(--font-body);
    font-size: var(--text-base);
    font-weight: var(--weight-regular);
    line-height: var(--leading-relaxed);
}

/* Body Small */
.text-body-sm {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: var(--weight-regular);
    line-height: var(--leading-relaxed);
}

/* Caption */
.text-caption {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
    line-height: var(--leading-normal);
    letter-spacing: var(--tracking-wide);
}

/* Overline (Section Tag) */
.text-overline {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: var(--weight-bold);
    line-height: var(--leading-normal);
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
}

/* Responsive typography */
@media (max-width: 768px) {
    .text-display { font-size: var(--text-4xl); }
    .text-h1      { font-size: var(--text-3xl); }
    .text-h2      { font-size: var(--text-2xl); }
    .text-h3      { font-size: var(--text-lg);  }
}

@media (max-width: 480px) {
    .text-display { font-size: var(--text-3xl); }
    .text-h1      { font-size: var(--text-2xl); }
    .text-h2      { font-size: var(--text-xl);  }
}
```

---

## 4. THU VIEN COMPONENT

### 4.1 UNIFIED CARD SYSTEM

Thay vi 8 kieu card khac nhau, tao 1 base card voi variants:

```css
/* ===== BASE CARD ===== */
.card {
    background: var(--surface-primary);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-xl);
    padding: var(--space-8);
    transition: all var(--duration-base) var(--ease-default);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--card-accent, var(--color-primary-500));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform var(--duration-slow) var(--ease-default);
}

.card:hover {
    border-color: var(--border-brand);
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
}

.card:hover::before {
    transform: scaleX(1);
}

/* Card Variants */
.card--trophy   { --card-accent: var(--color-primary-500); }
.card--achieve   { --card-accent: var(--color-secondary-500); }
.card--ielts     { --card-accent: var(--color-accent-500); }
.card--success   { --card-accent: var(--color-success-500); }
.card--warning   { --card-accent: var(--color-warning-500); }

/* Card Sizes */
.card--sm { padding: var(--space-5); border-radius: var(--radius-lg); }
.card--lg { padding: var(--space-10); border-radius: var(--radius-2xl); }

/* Card on Dark Background */
.card--dark {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
}

.card--dark:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
}

/* Card with Featured Accent Bar (always visible) */
.card--featured::before {
    transform: scaleX(1);
    height: 4px;
}

/* Card Inner Elements */
.card__icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin-bottom: var(--space-4);
    background: var(--color-primary-50);
}

.card__title {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: var(--weight-bold);
    margin-bottom: var(--space-2);
    color: var(--text-primary);
}

.card__desc {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-4);
}

.card__footer {
    margin-top: auto;
    padding-top: var(--space-4);
    border-top: 1px solid var(--border-subtle);
}
```

### 4.2 BUTTON SYSTEM

```css
/* ===== BASE BUTTON ===== */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    font-family: var(--font-body);
    font-weight: var(--weight-semibold);
    font-size: var(--text-sm);
    line-height: 1;
    padding: 12px 24px;
    border-radius: var(--radius-full);  /* Pill shape - hien dai */
    border: 2px solid transparent;
    cursor: pointer;
    transition: all var(--duration-base) var(--ease-default);
    text-decoration: none;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
}

/* PRIMARY CTA - Brand Red (noi bat nhat) */
.btn--primary {
    background: var(--color-secondary-500);
    color: var(--text-inverse);
    border-color: var(--color-secondary-500);
    box-shadow: 0 4px 14px rgba(200, 55, 45, 0.3);
}

.btn--primary:hover {
    background: var(--color-secondary-600);
    border-color: var(--color-secondary-600);
    box-shadow: 0 6px 20px rgba(200, 55, 45, 0.4);
    transform: translateY(-2px);
}

/* SECONDARY - Trophy Blue (phu) */
.btn--secondary {
    background: var(--color-primary-500);
    color: var(--text-inverse);
    border-color: var(--color-primary-500);
    box-shadow: var(--shadow-brand);
}

.btn--secondary:hover {
    background: var(--color-primary-600);
    box-shadow: var(--shadow-brand-lg);
    transform: translateY(-2px);
}

/* OUTLINE */
.btn--outline {
    background: transparent;
    color: var(--text-primary);
    border-color: var(--border-strong);
}

.btn--outline:hover {
    background: var(--color-primary-50);
    border-color: var(--color-primary-500);
    color: var(--color-primary-500);
}

/* GHOST */
.btn--ghost {
    background: transparent;
    color: var(--color-primary-500);
    border-color: transparent;
}

.btn--ghost:hover {
    background: var(--color-primary-50);
}

/* SIZES */
.btn--sm { padding: 8px 16px;  font-size: var(--text-xs); }
.btn--lg { padding: 16px 32px; font-size: var(--text-base); }
.btn--xl { padding: 18px 40px; font-size: var(--text-lg); }

/* FULL WIDTH */
.btn--block { width: 100%; }

/* ICON BUTTON */
.btn__icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
}

/* BUTTON TRÊN HERO - dac biet noi bat */
.btn--hero {
    padding: 18px 40px;
    font-size: var(--text-base);
    font-weight: var(--weight-bold);
    letter-spacing: var(--tracking-wide);
    background: var(--color-secondary-500);
    color: white;
    box-shadow: 0 8px 30px rgba(200, 55, 45, 0.35);
}

.btn--hero:hover {
    background: var(--color-secondary-400);
    box-shadow: 0 12px 40px rgba(200, 55, 45, 0.45);
    transform: translateY(-3px);
}
```

**Ly do dung Brand Red cho CTA chinh:**
- Red co tinh cap bach (urgency) cao nhat trong mau sac marketing
- Tao tuong phan manh voi noi dung Trophy Blue xung quanh
- Phu hop voi doi tuong B2B giao duc - can hanh dong nhanh

### 4.3 BADGE & CHIP SYSTEM

```css
/* ===== SECTION TAG / BADGE ===== */
.badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    padding: 6px 14px;
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: var(--weight-bold);
    letter-spacing: var(--tracking-wider);
    text-transform: uppercase;
}

.badge--primary { background: var(--color-primary-50); color: var(--color-primary-600); }
.badge--secondary { background: var(--color-secondary-50); color: var(--color-secondary-600); }
.badge--accent  { background: var(--color-accent-50); color: var(--color-accent-600); }
.badge--success { background: var(--color-success-50); color: var(--color-success-600); }
.badge--warning { background: var(--color-warning-50); color: var(--color-warning-600); }
.badge--neutral { background: var(--color-neutral-100); color: var(--color-neutral-600); }

/* ===== CHIP (info tag nho) ===== */
.chip {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    padding: 4px 12px;
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
    background: var(--surface-secondary);
    color: var(--text-secondary);
    border: 1px solid var(--border-default);
}

.chip--active {
    background: var(--color-primary-50);
    color: var(--color-primary-600);
    border-color: var(--color-primary-200);
}
```

### 4.4 SECTION HEADER (thong nhat nhung phan biet)

```css
/* ===== SECTION HEADER MOI ===== */
.section-header {
    text-align: center;
    max-width: 680px;
    margin: 0 auto var(--space-16);
    position: relative;
}

/* Tag tren heading - phan biet tung section */
.section-header .badge {
    margin-bottom: var(--space-4);
}

/* Heading voi accent line ben trai (thay vi center underline) */
.section-header__title {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    font-weight: var(--weight-extrabold);
    line-height: var(--leading-snug);
    letter-spacing: var(--tracking-tight);
    color: var(--text-primary);
    margin-bottom: var(--space-4);
    position: relative;
}

/* Thay doi: Moi section co accent mau KHAC NHAU */
.section-header--trophy .section-header__title::after {
    content: '';
    display: block;
    width: 48px;
    height: 4px;
    background: var(--color-primary-500);
    border-radius: var(--radius-full);
    margin: var(--space-4) auto 0;
}

.section-header--achieve .section-header__title::after {
    content: '';
    display: block;
    width: 48px;
    height: 4px;
    background: var(--color-secondary-500);
    border-radius: var(--radius-full);
    margin: var(--space-4) auto 0;
}

.section-header--ielts .section-header__title::after {
    content: '';
    display: block;
    width: 48px;
    height: 4px;
    background: var(--color-accent-500);
    border-radius: var(--radius-full);
    margin: var(--space-4) auto 0;
}

.section-header--mixed .section-header__title::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500));
    border-radius: var(--radius-full);
    margin: var(--space-4) auto 0;
}

.section-header__desc {
    font-size: var(--text-lg);
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    max-width: 560px;
    margin: 0 auto;
}

/* Light variant cho dark sections */
.section-header--light .section-header__title { color: var(--text-inverse); }
.section-header--light .section-header__desc {
    color: rgba(255, 255, 255, 0.7);
}
.section-header--light .section-header__title::after {
    background: rgba(255, 255, 255, 0.4);
}
```

---

## 5. THIET KE TUNG SECTION

### 5.1 HERO SECTION

**Van de hien tai:**
- Hero visual hoan toan bien mat tren mobile
- Journey path SVG + flip cards phuc tap, khong truyen tai thong diep
- Gradient animation tren CTA gay xao nhang

**Giai phap:**

```css
/* ===== HERO REDESIGN ===== */
.hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding-top: 80px;
    background:
        radial-gradient(ellipse 70% 50% at 30% 40%, rgba(0, 86, 166, 0.06) 0%, transparent 60%),
        radial-gradient(ellipse 50% 40% at 70% 60%, rgba(200, 55, 45, 0.04) 0%, transparent 50%),
        var(--surface-primary);
    overflow: hidden;
}

/* Subtle dot pattern - nhe nhang hon hien tai */
.hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
        circle at 1px 1px,
        var(--color-neutral-200) 1px,
        transparent 0
    );
    background-size: 48px 48px;
    opacity: 0.4;
    pointer-events: none;
}

.hero__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
    align-items: center;
    position: relative;
    z-index: 2;
    padding: var(--space-16) 0;
}

.hero__text {
    max-width: 560px;
}

.hero__badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: 8px 18px;
    background: var(--surface-primary);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    color: var(--color-secondary-500);
    margin-bottom: var(--space-6);
    box-shadow: var(--shadow-sm);
}

.hero__title {
    font-family: var(--font-display);
    font-size: var(--text-5xl);
    font-weight: var(--weight-extrabold);
    line-height: var(--leading-tight);
    letter-spacing: var(--tracking-tighter);
    color: var(--text-primary);
    margin-bottom: var(--space-6);
}

.hero__title-highlight {
    background: linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero__subtitle {
    font-size: var(--text-lg);
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-8);
}

/* Logos - Trophy9 + Achieve3000 */
.hero__logos {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-8);
}

.hero__logo-divider {
    width: 1px;
    height: 32px;
    background: var(--border-default);
}

/* Stats - horizontal pills */
.hero__stats {
    display: flex;
    gap: var(--space-6);
    margin-bottom: var(--space-10);
}

.hero__stat {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.hero__stat-number {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: var(--weight-extrabold);
    color: var(--color-primary-500);
}

.hero__stat-label {
    font-size: var(--text-xs);
    color: var(--text-tertiary);
    font-weight: var(--weight-medium);
}

/* CTA - Red primary, Blue outline secondary */
.hero__cta {
    display: flex;
    gap: var(--space-4);
    flex-wrap: wrap;
}

/* === HERO VISUAL (RIGHT SIDE) === */
/* Thay journey-path bang illustration cards don gian hon */
.hero__visual {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Stack of 3 themed preview cards */
.hero__preview-stack {
    position: relative;
    width: 100%;
    max-width: 480px;
    aspect-ratio: 4/3;
}

.hero__preview-card {
    position: absolute;
    background: var(--surface-primary);
    border-radius: var(--radius-xl);
    border: 1px solid var(--border-default);
    box-shadow: var(--shadow-lg);
    padding: var(--space-6);
    transition: transform var(--duration-slow) var(--ease-default);
}

/* Card 1: Trophy9 interface mockup */
.hero__preview-card:nth-child(1) {
    width: 85%;
    top: 0;
    left: 0;
    z-index: 3;
    border-top: 4px solid var(--color-primary-500);
}

/* Card 2: Achieve3000 interface mockup */
.hero__preview-card:nth-child(2) {
    width: 75%;
    top: 15%;
    right: 0;
    z-index: 2;
    border-top: 4px solid var(--color-secondary-500);
    transform: rotate(2deg);
}

/* Card 3: IELTS score preview */
.hero__preview-card:nth-child(3) {
    width: 60%;
    bottom: 5%;
    left: 10%;
    z-index: 1;
    border-top: 4px solid var(--color-accent-500);
    transform: rotate(-2deg);
}

.hero__preview-stack:hover .hero__preview-card:nth-child(1) {
    transform: translateY(-8px);
}
.hero__preview-stack:hover .hero__preview-card:nth-child(2) {
    transform: rotate(0deg) translateY(-4px);
}
.hero__preview-stack:hover .hero__preview-card:nth-child(3) {
    transform: rotate(0deg) translateY(-4px);
}

/* ===== HERO MOBILE ===== */
@media (max-width: 768px) {
    .hero__content {
        grid-template-columns: 1fr;
        text-align: center;
        padding: var(--space-10) 0;
    }

    .hero__title {
        font-size: var(--text-4xl);
    }

    .hero__subtitle {
        margin-left: auto;
        margin-right: auto;
    }

    .hero__stats {
        justify-content: center;
    }

    .hero__cta {
        justify-content: center;
    }

    .hero__logos {
        justify-content: center;
    }

    /* THAY DOI QUAN TRONG: Khong an hero visual tren mobile */
    /* Thu nho va dat ben duoi */
    .hero__visual {
        order: -1; /* Dat len tren text tren mobile */
        max-height: 250px;
        overflow: hidden;
    }

    .hero__preview-stack {
        max-width: 320px;
        margin: 0 auto;
    }

    /* Chi hien card chinh */
    .hero__preview-card:nth-child(2),
    .hero__preview-card:nth-child(3) {
        display: none;
    }

    .hero__preview-card:nth-child(1) {
        position: relative;
        width: 100%;
    }
}

@media (max-width: 480px) {
    .hero__title { font-size: var(--text-3xl); }
    .hero__stats { gap: var(--space-4); }
    .hero__stat-number { font-size: var(--text-xl); }
}
```

### 5.2 PROGRAM OVERVIEW

```css
/* ===== PROGRAM CARDS - 2 columns, featured style ===== */
.program__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8);
    align-items: stretch;
}

.program-card {
    /* Dung base .card + --featured */
    composes: card card--featured card--lg;
}

.program-card--trophy { --card-accent: var(--color-primary-500); }
.program-card--achieve { --card-accent: var(--color-secondary-500); }

.program-card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-5);
    padding-bottom: var(--space-5);
    border-bottom: 1px solid var(--border-subtle);
}

.program-card__age {
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    color: var(--text-tertiary);
    padding: 4px 12px;
    background: var(--surface-secondary);
    border-radius: var(--radius-full);
}

/* Feature list voi icons thay vi checkmarks */
.program-card__features {
    list-style: none;
    margin-bottom: var(--space-6);
    flex: 1;
}

.program-card__features li {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-2) 0;
    font-size: var(--text-sm);
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
}

.program-card__features li::before {
    content: '';
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border-radius: var(--radius-full);
    background: var(--color-success-50);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M10 3L4.5 8.5L2 6' stroke='%2310B981' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    margin-top: 2px;
}

@media (max-width: 768px) {
    .program__grid { grid-template-columns: 1fr; }
}
```

### 5.3 9 ACTIVITIES (Trophy9 Blue Section)

```css
/* ===== ACTIVITIES SECTION ===== */
.section--trophy-blue {
    background: linear-gradient(135deg,
        var(--color-primary-900) 0%,
        var(--color-primary-700) 50%,
        var(--color-primary-500) 100%
    );
    position: relative;
    overflow: hidden;
}

/* Dot pattern overlay */
.section--trophy-blue::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
        circle at 2px 2px,
        rgba(255, 255, 255, 0.04) 1px,
        transparent 0
    );
    background-size: 32px 32px;
    pointer-events: none;
}

.activities__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-5);
}

.activity-card {
    /* Base card--dark + custom */
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    backdrop-filter: blur(8px);
    transition: all var(--duration-base) var(--ease-default);
    position: relative;
}

.activity-card:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

/* So thu tu - tron, gradient nhieu hon */
.activity-card__number {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-full);
    background: linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.08));
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-weight: var(--weight-extrabold);
    font-size: var(--text-base);
    color: white;
    margin-bottom: var(--space-4);
}

.activity-card__title {
    font-family: var(--font-display);
    color: white;
    font-size: var(--text-base);
    font-weight: var(--weight-bold);
    margin-bottom: var(--space-2);
}

.activity-card__desc {
    font-size: var(--text-sm);
    color: rgba(255, 255, 255, 0.65);
    line-height: var(--leading-relaxed);
}

@media (max-width: 1024px) {
    .activities__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
    .activities__grid { grid-template-columns: 1fr; }
    /* Tren mobile: hien thi nhu list thay vi grid */
    .activity-card {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: var(--space-4);
    }
    .activity-card__number { margin-bottom: 0; flex-shrink: 0; }
}
```

### 5.4 T1-T6 LEVELS (Progression Visualization)

```css
/* ===== LEVELS - HORIZONTAL PROGRESS BAR + CARDS ===== */
.levels__progress {
    display: flex;
    align-items: center;
    gap: 0;
    margin-bottom: var(--space-12);
    padding: 0 var(--space-4);
}

/* Progress bar connecting levels */
.levels__bar {
    flex: 1;
    height: 4px;
    border-radius: var(--radius-full);
}

.levels__bar--walk { background: linear-gradient(90deg, var(--color-success-500), var(--color-success-500)); }
.levels__bar--run  { background: linear-gradient(90deg, var(--color-primary-500), var(--color-primary-500)); }
.levels__bar--sprint { background: linear-gradient(90deg, var(--color-secondary-500), var(--color-secondary-500)); }

/* Level dots on the bar */
.levels__dot {
    width: 16px;
    height: 16px;
    border-radius: var(--radius-full);
    background: var(--color-primary-500);
    border: 3px solid white;
    box-shadow: var(--shadow-sm);
    flex-shrink: 0;
    z-index: 2;
}

/* Level Group Cards */
.level-group {
    background: var(--surface-primary);
    border-radius: var(--radius-xl);
    overflow: hidden;
    border: 1px solid var(--border-default);
    box-shadow: var(--shadow-md);
    margin-bottom: var(--space-8);
    transition: box-shadow var(--duration-base) var(--ease-default);
}

.level-group:hover {
    box-shadow: var(--shadow-xl);
}

.level-group__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-4) var(--space-6);
    color: white;
}

.level-group__header--walk   { background: linear-gradient(135deg, var(--color-success-500), var(--color-success-600)); }
.level-group__header--run    { background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700)); }
.level-group__header--sprint { background: linear-gradient(135deg, var(--color-secondary-500), var(--color-secondary-600)); }

.level-group__cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-5);
    padding: var(--space-6);
}

@media (max-width: 640px) {
    .level-group__cards { grid-template-columns: 1fr; }
}
```

### 5.5 LEARNING PATHWAY

```css
/* ===== PATHWAY TIMELINE REDESIGN ===== */
/* Thay doi: Timeline duong thang -> Stepped cards voi connector */
.pathway__timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
}

/* Vertical connector line */
.pathway__timeline::before {
    content: '';
    position: absolute;
    left: 24px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg,
        var(--color-success-500) 0%,
        var(--color-primary-500) 30%,
        var(--color-warning-500) 50%,
        var(--color-secondary-500) 75%,
        var(--color-accent-500) 100%
    );
}

.pathway__stage {
    display: flex;
    gap: var(--space-6);
    padding-bottom: var(--space-10);
    position: relative;
}

/* Dot on timeline */
.pathway__dot {
    width: 20px;
    height: 20px;
    border-radius: var(--radius-full);
    flex-shrink: 0;
    z-index: 2;
    margin-top: var(--space-6);
    margin-left: 15px; /* center on the 2px line */
}

.pathway__dot--trophy {
    background: var(--color-primary-500);
    box-shadow: 0 0 0 4px var(--color-primary-100);
}

.pathway__dot--achieve {
    background: var(--color-secondary-500);
    box-shadow: 0 0 0 4px var(--color-secondary-100);
}

/* Stage card */
.pathway__card {
    flex: 1;
    background: var(--surface-primary);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    border: 1px solid var(--border-default);
    box-shadow: var(--shadow-md);
    transition: all var(--duration-base) var(--ease-default);
    position: relative;
    overflow: hidden;
}

.pathway__card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateX(4px);
}

/* Detail chips */
.pathway__chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-top: var(--space-4);
}

/* Bridge element giua Trophy9 va Achieve3000 */
.pathway__bridge {
    margin-left: 56px;
    padding: var(--space-5) var(--space-6);
    background: linear-gradient(135deg, var(--color-primary-50), var(--color-secondary-50));
    border: 2px dashed var(--color-primary-200);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-10);
}

@media (max-width: 640px) {
    .pathway__timeline::before { left: 12px; }
    .pathway__dot { margin-left: 3px; width: 18px; height: 18px; }
    .pathway__stage { gap: var(--space-4); }
    .pathway__bridge { margin-left: 40px; }
}
```

### 5.6 ACHIEVE3000 (Dark Section)

```css
/* ===== ACHIEVE3000 DARK SECTION ===== */
.section--dark {
    background:
        radial-gradient(ellipse 60% 40% at 20% 50%, rgba(200, 55, 45, 0.06) 0%, transparent 60%),
        radial-gradient(ellipse 50% 50% at 80% 30%, rgba(0, 86, 166, 0.05) 0%, transparent 50%),
        linear-gradient(180deg,
            var(--color-neutral-950) 0%,
            var(--color-neutral-900) 50%,
            var(--color-neutral-950) 100%
        );
    position: relative;
    overflow: hidden;
}

/* Subtle grid overlay */
.section--dark::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
        circle at 1px 1px,
        rgba(255, 255, 255, 0.02) 1px,
        transparent 0
    );
    background-size: 48px 48px;
}

/* Lexile Meter - animation toi gian hon */
.lexile-meter__bar {
    height: 12px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: var(--radius-full);
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.06);
}

.lexile-meter__fill {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg,
        var(--color-success-500),
        var(--color-primary-500),
        var(--color-secondary-500),
        var(--color-accent-500)
    );
    border-radius: var(--radius-full);
    transition: width 2s ease;
}

/* Achieve cards tren dark bg */
.achieve-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    backdrop-filter: blur(12px);
    transition: all var(--duration-base) var(--ease-default);
}

.achieve-card:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}
```

### 5.7 IELTS SECTION

```css
/* ===== IELTS SCORE VISUALIZATION ===== */
/* Thay doi: Horizontal bar chart thay vi list */
.ielts__pathway {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
}

.ielts__stage {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: var(--space-6);
    background: var(--surface-primary);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    border: 1px solid var(--border-default);
    box-shadow: var(--shadow-sm);
    transition: all var(--duration-base) var(--ease-default);
    position: relative;
    overflow: hidden;
}

/* Progress bar overlay */
.ielts__stage::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--color-accent-500), var(--color-secondary-500));
    border-radius: 0 var(--radius-full) var(--radius-full) 0;
}

.ielts__stage:nth-child(1)::before { width: 25%; }
.ielts__stage:nth-child(2)::before { width: 50%; }
.ielts__stage:nth-child(3)::before { width: 75%; }
.ielts__stage:nth-child(4)::before { width: 100%; }

.ielts__stage:hover {
    border-color: var(--color-accent-200);
    box-shadow: var(--shadow-lg);
    transform: translateX(4px);
}

.ielts__score {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    font-weight: var(--weight-extrabold);
    background: linear-gradient(135deg, var(--color-accent-500), var(--color-secondary-500));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
}

.ielts__skills {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
}

.ielts__skill-tag {
    padding: 4px 12px;
    background: var(--color-accent-50);
    color: var(--color-accent-600);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    border: 1px solid var(--color-accent-100);
}

@media (max-width: 640px) {
    .ielts__stage {
        grid-template-columns: 1fr;
        gap: var(--space-3);
    }
    .ielts__score { text-align: left; font-size: var(--text-2xl); }
}
```

### 5.8 COMPARISON TABLE

```css
/* ===== COMPARISON - Table tren desktop, Cards tren mobile ===== */
.comparison__table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: var(--surface-primary);
    border-radius: var(--radius-xl);
    overflow: hidden;
    border: 1px solid var(--border-default);
    box-shadow: var(--shadow-md);
}

.comparison__table thead th {
    padding: var(--space-4) var(--space-6);
    font-family: var(--font-display);
    font-weight: var(--weight-bold);
    font-size: var(--text-sm);
    text-align: left;
    background: var(--surface-tertiary);
    border-bottom: 2px solid var(--border-default);
}

.comparison__table thead th:nth-child(2) {
    color: var(--color-primary-500);
}

.comparison__table thead th:nth-child(3) {
    color: var(--color-secondary-500);
}

.comparison__table tbody td {
    padding: var(--space-4) var(--space-6);
    font-size: var(--text-sm);
    color: var(--text-secondary);
    border-bottom: 1px solid var(--border-subtle);
}

.comparison__table tbody td:first-child {
    font-weight: var(--weight-semibold);
    color: var(--text-primary);
}

.comparison__table tbody tr:hover {
    background: var(--color-primary-50);
}

.comparison__table tbody tr:last-child td {
    border-bottom: none;
}

/* Mobile: chuyen sang card layout */
@media (max-width: 768px) {
    .comparison__table,
    .comparison__table thead,
    .comparison__table tbody,
    .comparison__table th,
    .comparison__table td,
    .comparison__table tr {
        display: block;
    }

    .comparison__table thead {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
    }

    .comparison__table tbody tr {
        margin-bottom: var(--space-4);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-lg);
        padding: var(--space-4);
        box-shadow: var(--shadow-sm);
    }

    .comparison__table tbody td {
        display: flex;
        justify-content: space-between;
        padding: var(--space-2) 0;
        border-bottom: 1px solid var(--border-subtle);
    }

    .comparison__table tbody td::before {
        content: attr(data-label);
        font-weight: var(--weight-semibold);
        color: var(--text-primary);
        flex-shrink: 0;
        margin-right: var(--space-4);
    }
}
```

### 5.9 SOLUTIONS SECTION

```css
/* ===== SOLUTIONS - Problem > Solution flow ===== */
.section--solutions {
    background: linear-gradient(180deg,
        var(--surface-primary) 0%,
        var(--color-primary-50) 50%,
        var(--surface-primary) 100%
    );
}

/* Problem box - giu nguyen concept nhung tinh te hon */
.solutions__problem {
    background: var(--color-error-50);
    border: 1px solid rgba(239, 68, 68, 0.15);
    border-radius: var(--radius-xl);
    padding: var(--space-8);
    margin-bottom: var(--space-6);
}

.solutions__problem-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
}

.solutions__problem-item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-4);
    background: rgba(255, 255, 255, 0.7);
    border-radius: var(--radius-md);
    border: 1px solid rgba(239, 68, 68, 0.08);
}

/* Arrow connector */
.solutions__arrow {
    display: flex;
    justify-content: center;
    padding: var(--space-2) 0;
}

.solutions__arrow svg {
    width: 40px;
    height: 40px;
    color: var(--color-success-500);
    animation: bounceDown 2s ease-in-out infinite;
}

@keyframes bounceDown {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(6px); }
}

/* 3 Pillars */
.solutions__pillars {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-5);
    margin-bottom: var(--space-12);
}

.pillar {
    background: var(--surface-primary);
    border-radius: var(--radius-xl);
    overflow: hidden;
    border: 1px solid var(--border-default);
    box-shadow: var(--shadow-md);
    display: flex;
    flex-direction: column;
    transition: all var(--duration-base) var(--ease-default);
}

.pillar:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-xl);
}

.pillar__header {
    padding: var(--space-6);
    border-top: 4px solid var(--card-accent);
}

.pillar--trophy  { --card-accent: var(--color-primary-500); }
.pillar--bridge  { --card-accent: var(--color-warning-500); }
.pillar--achieve { --card-accent: var(--color-secondary-500); }

.pillar__number {
    position: absolute;
    top: var(--space-4);
    right: var(--space-5);
    font-family: var(--font-display);
    font-size: var(--text-4xl);
    font-weight: var(--weight-extrabold);
    opacity: 0.05;
}

/* Result badge at bottom */
.pillar__result {
    background: var(--surface-secondary);
    border-radius: var(--radius-md);
    padding: var(--space-3) var(--space-4);
    margin-top: auto;
}

/* Why grid */
.solutions__why-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-5);
    margin-bottom: var(--space-12);
}

.why-card {
    composes: card card--sm;
    text-align: left;
}

.why-card:hover {
    border-color: var(--color-success-300);
}

/* Proof stats bar */
.solutions__proof {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-5);
    background: linear-gradient(135deg,
        var(--color-primary-700),
        var(--color-primary-500),
        var(--color-secondary-500)
    );
    border-radius: var(--radius-xl);
    padding: var(--space-10) var(--space-8);
}

.proof__stat {
    text-align: center;
}

.proof__number {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    font-weight: var(--weight-extrabold);
    color: white;
    margin-bottom: var(--space-1);
}

.proof__label {
    font-size: var(--text-sm);
    color: rgba(255, 255, 255, 0.8);
    line-height: var(--leading-snug);
}

.proof__source {
    font-size: var(--text-xs);
    color: rgba(255, 255, 255, 0.4);
    font-style: italic;
    margin-top: var(--space-1);
}

@media (max-width: 1024px) {
    .solutions__pillars { grid-template-columns: 1fr; }
    .solutions__why-grid { grid-template-columns: repeat(2, 1fr); }
    .solutions__proof { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
    .solutions__problem-grid { grid-template-columns: 1fr; }
    .solutions__why-grid { grid-template-columns: 1fr; }
    .solutions__proof { grid-template-columns: 1fr; padding: var(--space-6); }
}
```

### 5.10 B2B SECTION

```css
/* ===== B2B - Clean, professional ===== */
.section--b2b {
    background:
        radial-gradient(ellipse 60% 40% at 30% 60%, rgba(16, 185, 129, 0.04) 0%, transparent 50%),
        linear-gradient(180deg, var(--surface-secondary), var(--color-success-50), var(--surface-secondary));
}

.b2b__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
    margin-bottom: var(--space-12);
}

.b2b-card {
    composes: card;
    --card-accent: var(--color-success-500);
}

.b2b-card:hover {
    border-color: var(--color-success-300);
}

/* Testing Framework - timeline style */
.b2b__testing {
    background: var(--surface-primary);
    border-radius: var(--radius-2xl);
    padding: var(--space-10);
    border: 1px solid var(--border-default);
    box-shadow: var(--shadow-md);
    margin-bottom: var(--space-10);
    position: relative;
    overflow: hidden;
}

/* Top gradient accent */
.b2b__testing::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg,
        var(--color-primary-500),
        var(--color-warning-500),
        var(--color-accent-500),
        var(--color-secondary-500)
    );
}

.b2b__testing-steps {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: var(--space-3);
}

.b2b__test-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 1;
    max-width: 200px;
}

.b2b__test-icon {
    width: 52px;
    height: 52px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-weight: var(--weight-extrabold);
    font-size: var(--text-lg);
    color: white;
    margin-bottom: var(--space-3);
    box-shadow: var(--shadow-md);
}

/* Arrow connector */
.b2b__test-arrow {
    font-size: var(--text-xl);
    color: var(--text-tertiary);
    margin-top: var(--space-4);
    flex-shrink: 0;
}

/* CTA box */
.b2b__cta {
    text-align: center;
    padding: var(--space-8);
    border: 2px dashed var(--color-success-300);
    border-radius: var(--radius-xl);
    background: linear-gradient(135deg,
        rgba(236, 253, 245, 0.5),
        rgba(232, 244, 253, 0.5)
    );
}

@media (max-width: 768px) {
    .b2b__grid { grid-template-columns: 1fr; }
    .b2b__testing-steps { flex-direction: column; align-items: center; }
    .b2b__test-arrow { transform: rotate(90deg); }
}
```

### 5.11 CONTACT/CTA SECTION

```css
/* ===== CONTACT CTA - Conversion Optimized ===== */
.section--cta {
    background:
        radial-gradient(ellipse 50% 40% at 20% 50%, rgba(0, 86, 166, 0.04) 0%, transparent 50%),
        radial-gradient(ellipse 50% 40% at 80% 50%, rgba(200, 55, 45, 0.03) 0%, transparent 50%),
        linear-gradient(180deg, var(--surface-secondary), var(--surface-primary));
}

.cta__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
    align-items: center;
}

.cta__title {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    font-weight: var(--weight-extrabold);
    margin-bottom: var(--space-4);
    letter-spacing: var(--tracking-tight);
}

.cta__benefits {
    list-style: none;
    margin-bottom: var(--space-8);
}

.cta__benefits li {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-2) 0;
    font-size: var(--text-base);
    font-weight: var(--weight-medium);
    color: var(--text-secondary);
}

.cta__benefits li::before {
    content: '';
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    border-radius: var(--radius-full);
    background: var(--color-success-50);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'%3E%3Cpath d='M11.5 3.5L5.25 9.75L2.5 7' stroke='%2310B981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
}

/* FORM - Toi uu chuyen doi */
.cta__form {
    background: var(--surface-primary);
    border-radius: var(--radius-2xl);
    padding: var(--space-10);
    border: 1px solid var(--border-default);
    box-shadow: var(--shadow-xl);
    position: relative;
}

/* Trust signal tren form */
.cta__form-trust {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-xs);
    color: var(--text-tertiary);
    margin-top: var(--space-4);
    justify-content: center;
}

.cta__form-trust svg {
    width: 14px;
    height: 14px;
    color: var(--color-success-500);
}

/* Form fields */
.form-group {
    margin-bottom: var(--space-5);
}

.form-group__label {
    display: block;
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    color: var(--text-primary);
    margin-bottom: var(--space-2);
}

.form-group__input {
    width: 100%;
    padding: 14px var(--space-4);
    border: 1.5px solid var(--border-default);
    border-radius: var(--radius-md);
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--text-primary);
    background: var(--surface-primary);
    transition: all var(--duration-fast) var(--ease-default);
}

.form-group__input:focus {
    outline: none;
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 3px var(--color-primary-50);
}

.form-group__input::placeholder {
    color: var(--text-tertiary);
}

/* Submit button - Brand Red, noi bat nhat trang */
.cta__submit {
    width: 100%;
    padding: 16px;
    background: var(--color-secondary-500);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    font-family: var(--font-body);
    font-size: var(--text-base);
    font-weight: var(--weight-bold);
    cursor: pointer;
    transition: all var(--duration-base) var(--ease-default);
    box-shadow: 0 4px 14px rgba(200, 55, 45, 0.3);
}

.cta__submit:hover {
    background: var(--color-secondary-400);
    box-shadow: 0 8px 25px rgba(200, 55, 45, 0.4);
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .cta__content { grid-template-columns: 1fr; }
    .cta__form { padding: var(--space-6); }
}
```

### 5.12 FOOTER

```css
/* ===== FOOTER ===== */
.footer {
    background: var(--color-neutral-950);
    color: rgba(255, 255, 255, 0.7);
    padding: var(--space-16) 0 var(--space-8);
    position: relative;
}

/* Subtle dot pattern */
.footer::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
        circle at 1px 1px,
        rgba(255, 255, 255, 0.015) 1px,
        transparent 0
    );
    background-size: 40px 40px;
}

.footer__grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: var(--space-10);
    margin-bottom: var(--space-10);
    position: relative;
    z-index: 1;
}

.footer__brand-desc {
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-5);
}

.footer__col-title {
    color: white;
    font-family: var(--font-display);
    font-weight: var(--weight-bold);
    font-size: var(--text-sm);
    margin-bottom: var(--space-5);
    padding-bottom: var(--space-3);
    position: relative;
}

/* Accent line duoi title */
.footer__col-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 24px;
    height: 2px;
    background: var(--color-primary-500);
    border-radius: var(--radius-full);
}

.footer__link {
    display: block;
    font-size: var(--text-sm);
    color: rgba(255, 255, 255, 0.5);
    padding: var(--space-1) 0;
    transition: all var(--duration-fast);
}

.footer__link:hover {
    color: white;
    transform: translateX(4px);
}

.footer__bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding-top: var(--space-6);
    text-align: center;
    font-size: var(--text-xs);
    color: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
    .footer__grid { grid-template-columns: 1fr 1fr; gap: var(--space-8); }
}

@media (max-width: 480px) {
    .footer__grid { grid-template-columns: 1fr; }
}
```

---

## 6. CHIEN LUOC MOBILE-FIRST

### Breakpoints

```css
/* Mobile first - base styles la mobile */
/* sm: 640px  - Small tablets, large phones landscape */
/* md: 768px  - Tablets */
/* lg: 1024px - Small laptops */
/* xl: 1280px - Desktops */

/* Base: 0-639px (Mobile) */
.container {
    max-width: 100%;
    padding: 0 var(--space-4);
}

/* SM */
@media (min-width: 640px) {
    .container { padding: 0 var(--space-6); }
}

/* MD */
@media (min-width: 768px) {
    .container { max-width: 720px; margin: 0 auto; }
}

/* LG */
@media (min-width: 1024px) {
    .container { max-width: 960px; }
}

/* XL */
@media (min-width: 1280px) {
    .container { max-width: 1200px; }
}
```

### Mobile Layout Changes Quan Trong

| Section | Mobile (< 640px) | Tablet (640-1024px) | Desktop (> 1024px) |
|---------|------------------|--------------------|--------------------|
| Hero | 1 col, visual thu nho phia tren, chi hien 1 card | 1 col, visual nho hon | 2 cols |
| Program | 1 col stacked | 1 col stacked | 2 cols |
| Activities | List layout (row) | 2 cols grid | 3 cols grid |
| Levels | 1 col cards | 1 col cards, 2 per group | 2 cols per group |
| Pathway | Timeline left, card full | Timeline left | Timeline left |
| Achieve3000 | 1 col stacked | 2 cols | 2 cols |
| IELTS | 1 col, score+detail stacked | 2 cols | score left, detail right |
| Comparison | Card layout (stacked) | Card layout | Table |
| Solutions Pillars | 1 col stacked | 1 col stacked | 3 cols |
| Why grid | 1 col | 2 cols | 3 cols |
| Proof stats | 2 cols | 2 cols | 4 cols |
| B2B | 1 col | 2 cols | 2 cols |
| Contact | 1 col, form first | 1 col | 2 cols |
| Footer | 1 col | 2 cols | 4 cols |

---

## 7. CHIEN LUOC MINH HOA

### Nguyen Tac Chung
- **Khong dung emoji lam icon chinh** - Thay bang SVG icons dong nhat
- **Illustration style**: Flat illustration, line-art style, tuong tu Duolingo/Khan Academy
- **Mau sac illustration**: Phai su dung design tokens (primary blue, secondary red, accent purple)

### Vi Tri Cu The

| Section | Hien Tai | De Xuat |
|---------|----------|---------|
| Hero Visual | Journey path SVG phuc tap + flip cards | 3 product screenshots xep chong (Trophy9, Achieve3000, IELTS dashboard) |
| Activities Icons | Khong co (chi so thu tu) | 9 SVG icons don gian dai dien moi activity (book, quiz, vocab, headphones, mic, theater, puzzle, pencil, clipboard) |
| Pathway | Freepik SVG illustrations (opacity 0.12) | Giu lai nhung tang opacity len 0.2, thong nhat style |
| Achieve3000 | Khong co | Screenshot/mockup cua Achieve3000 dashboard |
| B2B | SVG rect+circle don gian | Proper icons: school building, assessment chart, training, support |
| Contact | Khong co | Trust logos: CCSS, Benchmark Education, McGraw Hill logos |

### Icon Library
De xuat dung **Phosphor Icons** (https://phosphoricons.com) - style nhe, hien dai, co nhieu icon giao duc.

---

## 8. CHIEN LUOC ANIMATION

### Nguyen Tac Animation

1. **BO**: `gradientShift` animation lien tuc tren buttons - gay xao nhang
2. **BO**: Particle canvas tren hero - khong can thiet, ton performance
3. **BO**: Hero glow effect theo mouse - khong co gia tri
4. **BO**: Emoji decorations float animation (`decoFloat`) - khong chuyen nghiep
5. **GIU**: ScrollReveal cho cards khi scroll vao viewport
6. **GIU**: Hover transitions tren cards va buttons
7. **GIU**: Lexile meter fill animation (khi scroll vao)
8. **GIU**: Loading screen (nhung giam thoi gian xuong 0.5s)

### Animations Nen Co

```css
/* ===== SCROLL REVEAL ===== */
.reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s var(--ease-default),
                transform 0.6s var(--ease-default);
}

.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Stagger cho grid items */
.reveal-stagger > * {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s var(--ease-default),
                transform 0.5s var(--ease-default);
}

.reveal-stagger.visible > *:nth-child(1) { transition-delay: 0ms; }
.reveal-stagger.visible > *:nth-child(2) { transition-delay: 80ms; }
.reveal-stagger.visible > *:nth-child(3) { transition-delay: 160ms; }
.reveal-stagger.visible > *:nth-child(4) { transition-delay: 240ms; }
.reveal-stagger.visible > *:nth-child(5) { transition-delay: 320ms; }
.reveal-stagger.visible > *:nth-child(6) { transition-delay: 400ms; }

.reveal-stagger.visible > * {
    opacity: 1;
    transform: translateY(0);
}

/* Counter animation cho stats */
.counter {
    transition: all 0.3s;
}

/* Hover transitions - nhe nhang */
.card,
.btn,
a {
    transition: all var(--duration-base) var(--ease-default);
}

/* KHONG dung animation lien tuc (infinite) ngoai tru loading screen */
/* Tat ca animation chi chay 1 lan khi element vao viewport */

/* Reduce motion cho nguoi dung co accessibility needs */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

---

## 9. TOI UU CHUYEN DOI

### 9.1 CTA Placement Strategy

| Vi Tri | Kieu CTA | Mau | Van Ban (VI) |
|--------|----------|-----|-------------|
| Hero (primary) | `.btn--hero` | Brand Red (#C8372D) | "Nhan Tu Van Mien Phi" |
| Hero (secondary) | `.btn--outline` | Blue outline | "Xem Lo Trinh" |
| Cuoi Program section | `.btn--secondary` | Trophy Blue | "Tim Hieu Trophy9" / "Tim Hieu Achieve3000" |
| Cuoi Solutions section | `.btn--primary` | Brand Red | "Lien He Ngay" |
| B2B CTA box | `.btn--primary` `.btn--lg` | Brand Red | "Dat Lich Demo Mien Phi" |
| Contact form submit | `.cta__submit` | Brand Red | "Gui Thong Tin - Nhan Tu Van" |
| Sticky mobile CTA | `.btn--primary` | Brand Red | "Dang Ky Tu Van" |

### 9.2 Sticky Mobile CTA

```css
/* ===== STICKY MOBILE CTA ===== */
.sticky-cta {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: var(--surface-primary);
    border-top: 1px solid var(--border-default);
    padding: var(--space-3) var(--space-4);
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(100%);
    transition: transform var(--duration-base) var(--ease-default);
}

.sticky-cta.visible {
    transform: translateY(0);
}

.sticky-cta .btn {
    width: 100%;
}

@media (max-width: 768px) {
    .sticky-cta { display: block; }
    /* Them padding bottom cho body de tranh bi sticky che noi dung */
    body { padding-bottom: 72px; }
}
```

### 9.3 Form Design Best Practices

1. **Chi 5 fields** (hien tai da dung): Ten truong, SDT, Email, Cap, Muc tieu
2. **Them trust signals** duoi nut submit:
   - "Thong tin bao mat 100%"
   - "Tu van mien phi trong 24h"
   - So luong truong da tu van (social proof)
3. **Auto-focus** field dau tien khi section scroll vao view
4. **Validation realtime** - hien loi ngay khi nguoi dung roi field
5. **Loading state** cho nut submit

```css
/* Trust signals */
.form-trust {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-4);
    margin-top: var(--space-4);
    flex-wrap: wrap;
}

.form-trust__item {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--text-xs);
    color: var(--text-tertiary);
}

.form-trust__icon {
    width: 14px;
    height: 14px;
    color: var(--color-success-500);
}
```

### 9.4 Social Proof Additions

Them vao cuoi Hero hoac truoc Contact:

```html
<!-- Suggested: Trusted By Section -->
<div class="trusted-by">
    <p class="trusted-by__label">Da tu van cho 50+ truong va trung tam</p>
    <div class="trusted-by__logos">
        <!-- Partner/client logos -->
    </div>
</div>
```

```css
.trusted-by {
    text-align: center;
    padding: var(--space-6) 0;
    border-top: 1px solid var(--border-subtle);
    margin-top: var(--space-10);
}

.trusted-by__label {
    font-size: var(--text-sm);
    color: var(--text-tertiary);
    font-weight: var(--weight-medium);
    margin-bottom: var(--space-4);
    text-transform: uppercase;
    letter-spacing: var(--tracking-wider);
}

.trusted-by__logos {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-8);
    flex-wrap: wrap;
    opacity: 0.5;
    filter: grayscale(100%);
}

.trusted-by__logos img {
    height: 32px;
    width: auto;
}
```

---

## TOM TAT HANH DONG

### Uu Tien Cao (Lam Ngay)
1. Gop `styles.css` + `premium.css` thanh 1 file `design-system.css`
2. Thay the tat ca hardcoded colors bang tokens
3. Sua hero mobile (khong an hero visual)
4. Thong nhat card component
5. Doi mau CTA buttons sang Brand Red
6. Bo cac animation lien tuc (gradientShift, particles)

### Uu Tien Trung Binh
7. Implement section header moi (mau accent khac nhau)
8. Them sticky mobile CTA
9. Them trust signals vao form
10. Chuyen comparison table sang responsive card layout
11. Thay emoji icons bang SVG icons

### Uu Tien Thap (Phase 2)
12. Them "Trusted By" section
13. Implement scroll reveal animations
14. Them product screenshots/mockups vao hero
15. Counter animation cho stats
16. Micro-interactions chi tiet (focus states, validation)

---

*Tai lieu nay cung cap CSS code san sang de implement. Moi section co the duoc chuyen doi doc lap ma khong anh huong den cac section khac, mien la design tokens duoc setup truoc.*
