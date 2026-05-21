# WebShop Application

Modern fullstack webshop alkalmazás ASP.NET Core Web API és React technológiák használatával.  
A projekt egy teljes webáruház rendszert valósít meg felhasználókezeléssel, termékkezeléssel, kategóriaszűréssel, kedvencekkel, kosárral és checkout folyamattal.

---

# Tartalomjegyzék

- [Projekt Összefoglaló](#projekt-osszefoglalo)
- [Telepítés](#telepites)
- [Használt Technológiák](#hasznalt-technologiak)
- [NuGet Csomagok](#nuget-csomagok)
- [Frontend Technológiák](#frontend-technologiak)
- [Funkciók](#funkciok)
- [Backend Struktúra](#backend-struktura)
- [Frontend Struktúra](#frontend-struktura)
- [Mappák és Architektúra Magyarázata](#mappak-es-architektura-magyarazata)
- [Használt Architektúrai Megoldások](#hasznalt-architekturai-megoldasok)
- [Adatbázis](#adatbazis)
- [API Végpontok](#api-vegpontok)
- [Autentikáció](#autentikacio)
- [Képfeltöltés](#kepfeltoltes)
---

<a id="projekt-osszefoglalo"></a>
# Projekt Összefoglaló

Az alkalmazás külön frontend és backend architektúrával készült.

A backend feladata:
- autentikáció és autorizáció kezelése
- adatbázis műveletek kezelése
- termékek és kategóriák kezelése
- API végpontok biztosítása
- képfeltöltés kezelése

A frontend biztosítja:
- dinamikus termékmegjelenítést
- keresési és szűrési funkciókat
- kosár kezelést
- profil kezelést
- modern felhasználói felületet dark/light mode támogatással

---
<a id="telepites"></a>
# Telepítés

## Backend Indítása

```bash

dotnet restore

dotnet ef database update

dotnet run
```

## Frontend Indítása

```bash
cd frontend

npm install

npm run dev
```
<a id="hasznalt-technologiak"></a>
# Használt Technológiák

## Backend

### ASP.NET Core Web API
REST API fejlesztésére és a backend üzleti logika kezelésére használva.

### Entity Framework Core
ORM-ként használva adatbázis műveletekhez és Code First adatbázis kezeléshez.

### PostgreSQL
Relációs adatbáziskezelő rendszerként használva az alkalmazás adatainak tárolására.

### JWT Authentication
Biztonságos felhasználói hitelesítéshez és védett végpontok kezeléséhez használva.

### Swagger
API dokumentációhoz és endpoint teszteléshez használva fejlesztés közben.

### BCrypt.Net
Jelszavak biztonságos hash-elésére és ellenőrzésére használva.

---
<a id="nuget-csomagok"></a>
# NuGet Csomagok

| Csomag | Funkció |
|---|---|
| Microsoft.AspNetCore.Authentication.JwtBearer | JWT autentikáció kezelése |
| Microsoft.EntityFrameworkCore | ORM funkcionalitás |
| Microsoft.EntityFrameworkCore.Design | Migráció támogatás |
| Npgsql.EntityFrameworkCore.PostgreSQL | PostgreSQL provider Entity Framework-höz |
| BCrypt.Net-Next | Jelszó hash-elés |
| Swashbuckle.AspNetCore | Swagger API dokumentáció |
| ... | ... |

---
<a id="frontend-technologiak"></a>
# Frontend Technológiák

### React
Komponens alapú felhasználói felület fejlesztésére használva.

### Vite
Gyors frontend build rendszerként és fejlesztői szerverként használva.

### Axios
Frontend és backend közötti API kommunikáció kezelésére használva.

### React Router
Oldalak közötti kliensoldali navigáció megvalósítására használva.

### CSS Variables & Theme System
Dinamikus dark/light mód kezeléshez használva.

### Komponens Alapú Architektúra
Újrafelhasználható és könnyen karbantartható frontend struktúra kialakítására használva.

---
<a id="funkciok"></a>
# Funkciók

## Felhasználókezelés
- Regisztráció
- Bejelentkezés
- JWT alapú autentikáció
- Védett oldalak
- Profil kezelés
- Jelszó módosítás

## Termékkezelés
- Termék listázás
- Termék részletek oldal
- Kategóriák kezelése
- Termék szűrés
- Keresési funkció
- Termékképek feltöltése

## Vásárlási Funkciók
- Kosár rendszer
- Kedvencek rendszer
- Checkout oldal

## Admin Funkciók
- Termék törlés
- Termék kezelés
- Képkezelés

## UI Funkciók
- Dark / Light mód
- Modern kártya alapú dizájn
- Dinamikus szűrőrendszer
- Sticky navbar
- Glassmorphism stílusú navigációs sáv

---
<a id="backend-struktura"></a>
# Backend Struktúra

```plaintext
Backend/
│
├── Controllers/
├── Data/
├── DTOs/
│   ├── Product/
│   └── User/
├── Migrations/
├── Models/
├── Repositories/
├── Services/
└── wwwroot/
    └── images/
        └── products/
```
<a id="frontend-struktura"></a>
# Frontend Struktúra

```plaintext
frontend/
│
├── public/
├── src/
│   ├── components/
│   │   ├── Cart.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── SearchBar.jsx
│   │
│   ├── pages/
│   │   ├── CartPage.jsx
│   │   ├── Checkout.jsx
│   │   ├── FavoritesPage.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Profile.jsx
│   │   └── Register.jsx
│   │
│   ├── services/
│   │   └── api.jsx
│   │
│   ├── styles/
│   │   └── style.css
│   │
│   ├── App.jsx
│   └── main.jsx
```
---
<a id="mappak-es-architektura-magyarazata"></a>
# Mappák és Architektúra Magyarázata

## Backend Mappák

### Controllers
Az API végpontokat tartalmazza.  
A controllerek fogadják a frontend kéréseit és meghívják a megfelelő service réteget.

Példák:
- AuthController
- ProductsController
- CategoriesController
- ProfileController

Feladata:
- HTTP kérések kezelése
- válaszok visszaküldése
- endpointok definiálása

---

### Data
Az adatbázis konfigurációért felelős mappa.

Tartalmazza:
- AppDbContext

Feladata:
- adatbázis kapcsolat kezelése
- DbSet-ek definiálása
- Entity Framework konfiguráció

---

### DTOs
A DTO (Data Transfer Object) objektumokat tartalmazza.

A DTO-k célja:
- biztonságos adatküldés
- csak a szükséges adatok továbbítása
- entity objektumok elrejtése a frontend elől

Példák:
- LoginDto
- RegisterDto
- ProductResponseDto
- UpdateProductDto

Előnye:
- tisztább API
- biztonságosabb adatkezelés
- könnyebb validáció

---

### Models
Az adatbázis entitásokat tartalmazza.

Példák:
- User
- Product
- Category
- Comment

Feladata:
- adatbázis táblák reprezentálása
- kapcsolatok kezelése
- entity struktúra definiálása

---

### Repositories
Az adatbázis műveletek elkülönítésére szolgál.

A Repository Pattern célja:
- adatkezelési logika különválasztása
- újrafelhasználhatóság
- tisztább service réteg

Feladata:
- CRUD műveletek kezelése
- adatbázis lekérdezések

---

### Services
Az üzleti logikát tartalmazza.

Példák:
- AuthService
- ProductService

Feladata:
- üzleti szabályok kezelése
- logika elkülönítése a controllerektől
- repositoryk használata

Előnye:
- tisztább architektúra
- könnyebb bővíthetőség
- jobb karbantarthatóság

---

### Migrations
Az Entity Framework migrációkat tartalmazza.

Feladata:
- adatbázis verziókezelés
- táblák létrehozása
- adatbázis módosítások kezelése

---

### wwwroot/images/products
A feltöltött termékképek tárolási helye.

Feladata:
- képfájlok tárolása
- statikus fájl kiszolgálás

---

# Frontend Mappák

## components
Újrafelhasználható React komponenseket tartalmaz.

Példák:
- Navbar
- ProductCard
- SearchBar
- CategoryFilter

Feladata:
- UI elemek elkülönítése
- újrafelhasználhatóság
- tisztább kódszerkezet

---

## pages
Az alkalmazás oldalait tartalmazza.

Példák:
- Home
- Login
- Register
- Profile
- ProductDetails
- CartPage
- Checkout

Feladata:
- teljes oldalak megjelenítése
- route-ok kezelése
- komponensek összekapcsolása

---

## services
Az API kommunikáció kezelésére szolgál.

Példa:
- api.jsx

Feladata:
- backend API hívások kezelése
- axios konfiguráció
- központi API kezelés

---

## styles
Az alkalmazás stílusait tartalmazza.

Példa:
- style.css

Feladata:
- globális stílusok kezelése
- dark/light theme rendszer
- responsive és modern UI kialakítása

---

## App.jsx
Az alkalmazás fő komponense.

Feladata:
- route-ok kezelése
- oldalak összekapcsolása
- globális logika

---

## main.jsx
Az alkalmazás belépési pontja.

Feladata:
- React renderelés
- App komponens betöltése

---
<a id="hasznalt-architekturai-megoldasok"></a>
# Használt Architektúrai Megoldások

## DTO Pattern
A DTO Pattern biztosítja, hogy az API csak a szükséges adatokat küldje a frontend számára.

Előnyei:
- biztonságosabb adatkezelés
- kisebb adatforgalom
- tisztább API struktúra

---

## Repository Pattern
Az adatbázis műveletek elkülönítésére szolgál.

Előnyei:
- tisztább kód
- könnyebb tesztelhetőség
- újrafelhasználhatóság

---

## Service Layer Pattern
Az üzleti logika elkülönítésére használva.

Előnyei:
- a controllerek egyszerűbbek maradnak
- könnyebb karbantartás
- jobb skálázhatóság

---

## Component-Based Frontend Architecture
A frontend komponens alapú architektúrát használ.

Előnyei:
- újrafelhasználható UI elemek
- könnyebb fejlesztés
- tisztább projekt struktúra

---
<a id="adatbazis"></a>
# Adatbázis

Az alkalmazás PostgreSQL adatbázist használ Entity Framework Core Code First megközelítéssel.

## Főbb Entitások

- User
- Product
- Category
- Comment

## Adatbázis Funkciók

- Entitás kapcsolatok
- Migrációk
- Felhasználói adatok tárolása
- Termékképek elérési útvonalai
- Kategória kezelés

---
<a id="api-vegpontok"></a>
# API Végpontok

## Auth

| Method | Endpoint | Leírás |
|---|---|---|
| POST | /api/auth/register | Új felhasználó regisztrálása |
| POST | /api/auth/login | Bejelentkezés |

---

## Products

| Method | Endpoint | Leírás |
|---|---|---|
| GET | /api/products | Összes termék lekérése |
| GET | /api/products/{id} | Termék lekérése ID alapján |
| POST | /api/products | Új termék létrehozása |
| PUT | /api/products/{id} | Termék módosítása |
| DELETE | /api/products/{id} | Termék törlése |

---

## Categories

| Method | Endpoint | Leírás |
|---|---|---|
| GET | /api/categories | Összes kategória lekérése |

---

## Profile

| Method | Endpoint | Leírás |
|---|---|---|
| GET | /api/profile | Felhasználói profil lekérése |
| PUT | /api/profile | Profil módosítása |
| PUT | /api/profile/password | Jelszó módosítása |

---
<a id="autentikacio"></a>
# Autentikáció

Az alkalmazás JWT (JSON Web Token) alapú autentikációt használ.

## Főbb jellemzők

- biztonságos bejelentkezés
- BCrypt alapú jelszó hash-elés
- védett API végpontok
- hitelesített felhasználó kezelés

---
<a id="kepfeltoltes"></a>
# Képfeltöltés

A termékképek tárolási helye:

```plaintext
wwwroot/images/products/
```

A backend kezeli:

- képfeltöltést
- képek elérési útvonalát
- statikus fájlok kiszolgálását

---

Backend futási címe:

```plaintext
https://localhost:xxxx
```

Swagger dokumentáció:

```plaintext
https://localhost:xxxx/swagger
```

---

Frontend futási címe:

```plaintext
http://localhost:5173
```