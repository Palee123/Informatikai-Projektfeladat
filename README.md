# Informatikai-Projektfeladat

Téma: Webshop - Ruha bolt használt vagy új
ASP.NET Core és PostgreSQL

.NET-ből és a NuGeteknél is 8as verzió

Használt csomagok:
- Microsoft.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.Design
- Npgsql.EntityFrameworkCore.PostgreSQL

dotnet ef database update hogy legyen adatbázis lokálisan

## Mappák (fontosabbak)
**Repositories:** Az adatbázis műveletekért felel (lekérdezés, mentés, törlés), és közvetlenül a DbContexttel dolgozik.

**Services:** Az üzleti logikát tartalmazza (pl. validáció, jelszó ellenőrzés, számítások), és a repositorykat használja.

**DTOs:** Az API-n keresztül be- és kimenő adatstruktúrákat definiálja, hogy csak a szükséges adatokat küldjük és fogadjuk.

# Projekt struktúra

## Backend
ASP.NET Core Web API

## Frontend
Külön React projekt:

frontend/

A frontend fejlesztés külön fut a backendtől.

---

# Frontend indítása

```bash
cd frontend
npm install
npm run dev			


## Funkciók
- Regisztráció és bejelentkezés 
- Admin access, termék feltöltés és ár állítás stb…
- Felhasználó is szerkesztheti saját termékét amit eladna
- Felhasználónak fiók leírás - Rólad fül vag valami hasonló
- Szűrés, keresés, rendezési sorrend
- Kosár -> fizetés itt checkeli hogy jók e az adatok
- Akciók 
- Adatbázis használata -> PostgreSQL
- Kérdések az eladó felé
- Termék vagy eladó értékelés -> Kommentek
- Visszaigazolás

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
