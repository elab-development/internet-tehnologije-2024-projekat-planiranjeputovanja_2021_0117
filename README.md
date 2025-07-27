# Planiranje Putovanja – Full Stack Web Aplikacija

Ova aplikacija omogućava korisnicima da lako isplaniraju putovanje unosom osnovnih parametara poput destinacije, budžeta i trajanja. Na osnovu toga generiše se personalizovani plan sa preporučenim znamenitostima. Projekat je realizovan kao deo domaćeg zadatka iz predmeta Internet Tehnologije.

## Tehnologije koje su korišćene

### Backend (Laravel)
- PHP 8
- Laravel 10
- MySQL baza podataka
- Laravel Sanctum za autentifikaciju
- RESTful API rute
- Eloquent ORM
- Migracije, seederi, factory fajlovi

### Frontend (React)
- React sa JSX komponentama
- React Router
- Axios za komunikaciju sa API-jem
- Material UI za korisnički interfejs
- React Hooks (useState, useEffect, useNavigate)
- Modularna struktura: komponente, stranice, rutiranje, API logika

## Glavne funkcionalnosti

- Registracija, prijava i odjava korisnika
- Pregled svih destinacija i znamenitosti
- Generisanje i prikaz plana putovanja
- Čuvanje i uređivanje korisničkih planova
- Prikaz popularnih destinacija
- Statistički prikaz broja pregleda i ocena znamenitosti
- Prikaz vremenske prognoze na osnovu destinacije
- Zaštićene rute putem tokena (auth:sanctum)
- Odvojeni pristupi za običnog korisnika i admina

## Struktura projekta

### Backend
- `routes/api.php` – definisane sve API rute
- `app/Models/` – Eloquent modeli (Korisnik, Destinacija, PlanPutovanja itd.)
- `app/Http/Controllers/` – kontroleri za upravljanje logikom
- `database/migrations/` – migracije za tabele
- `database/seeders/` – test podaci
- `database/factories/` – generatori podataka

### Frontend
- `src/pages/` – React stranice: Login, Register, Popular Destinations, itd.
- `src/components/` – višekratne komponente: dugme, kartica, modal, navbar...
- `src/api/` – axios instance i API pomoćne funkcije
- `src/hooks/` – custom hook za autentifikaciju korisnika

## Pokretanje aplikacije lokalno

### Backend (Laravel)

```bash
cd laravel-backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### Frontend (React)

```bash
cd react-frontend
npm install
npm run dev
```

## Autori

Miloš Dolović – 2021/0117  
Aleksa Jovanović – 2019/0488  
Fakultet organizacionih nauka  
Internet Tehnologije – Seminarski rad
