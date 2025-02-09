# System ERP

###### Projekt studencki 2024 / Semestr II

---

## Spis Treści

- [1. Autorzy](#autorzy)
- [2. Etap I](#etap-i)
- [3. Etap II](#etap-ii)
  - [3.1 Backend](#etap-ii-backend)
  - [3.2 Frontend](#etap-ii-frontend)
  - [3.3 DevOps](#etap-ii-devops)
  - [3.4 Documentation](#etap-ii-documentation)
- [4. Technologie](#technologie)
  - [4.1 Backend](#technologie-backend)
  - [4.2 Database](#technologie-database)
  - [4.3 Frontend](#technologie-frontend)
  - [4.4 DevOps](#technologie-devops)

---

## Autorzy:

<table >
  <thead>
    <tr>
      <th style="width: 5%">Lp</th>
      <th style="width: 45%;">Imię i nazwisko</th>
      <th style="width: 50%;">GitHub</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Jan Paczuski</td>
      <td><a href="https://github.com/mortogjp">https://github.com/mortogjp</a></td>
    </tr>
    <tr>
      <td>2</td>
      <td>Maciej Sławek</td>
      <td><a href="https://github.com/Maciejsdev">https://github.com/Maciejsdev</a></td>
    </tr>
    <tr>
      <td>3</td>
      <td>Maciej Polowczyk</td>
      <td><a href="https://github.com/Polo921">https://github.com/Polo921</a></td>
    </tr>
    <tr>
      <td>4</td>
      <td>Szymon Piątek</td>
      <td><a href="https://github.com/SzymonPiatek">https://github.com/SzymonPiatek</a></td>
    </tr>
    <tr>
      <td>5</td>
      <td>Tomasz Kowalczyk</td>
      <td><a href="https://github.com/tmckk">https://github.com/tmckk</a></td>
    </tr>
  </tbody>
</table>

---

## Etap I

<table>
  <thead>
    <tr>
      <th style="width: 5%;">Lp</th>
      <th style="width: 45%;">Zadanie</th>
      <th style="width: 35%;">Uwagi</th>
      <th style="width: 15%;">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Analiza potrzeb</td>
      <td>Whiteboard?</td>
      <td>Zrobione</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Przygotowanie podstawowych modeli dla bazy danych</td>
      <td>
        <span>Użytkownik</span><br>
        <span>Firma</span><br>
        <span>Wydarzenie</span><br>
        <span>Notatki?</span>
      </td>
      <td>Zrobione</td>
    </tr>
  </tbody>
</table>

---

## Etap II

<a id="etap-ii-backend"></a>
### Backend
<table>
  <thead>
    <tr>
      <th style="width: 5%;">Lp</th>
      <th style="width: 45%;">Zadanie</th>
      <th style="width: 35%;">Uwagi</th>
      <th style="width: 15%;">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Przygotowanie podstawy backendu (API)</td>
      <td>TypeScript, Express</td>
      <td>Zrobione</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Utworzenie bazy danych</td>
      <td>
        <span>Prisma</span><br>
        <span>Postgresql</span>
      </td>
      <td>Zrobione</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Utworzenie modeli w bazie danych</td>
      <td>
        <span>* Użytkownik</span><br>
        <span>* Firma</span><br>
        <span>* Wydarzenie</span><br>
        <span>* Notatka?</span>
      </td>
      <td>
        <span>Zrobione</span>
      </td>
    </tr>
    <tr>
      <td>4</td>
      <td>Utworzenie handlerów dla modelu użytkownika</td>
      <td>
        <span>* Pobranie wszystkich użytkowników</span><br>
        <span>* Pobranie użytkownika o danym id</span><br>
        <span>* Edycja danych użytkownika</span><br>
        <span>* Aktywacja/dezaktywacja użytkownika</span>
        <span>* Zmiana hasła użytkownika</span>
      </td>
      <td>
        <span>Zrobione</span>
      </td>
    </tr>
    <tr>
      <td>5</td>
      <td>Utworzenie handlerów dla modelu firmy</td>
      <td>
        <span>* Pobranie wszystkich firm</span><br>
        <span>* Pobranie firmy o danym id</span><br>
        <span>* Edycja danych firmy</span><br>
        <span>* Tworzenie firmy</span>
      </td>
      <td>
        <span>Zrobione</span>
      </td>
    </tr>   
    <tr>
      <td>6</td>
      <td>Utworzenie handlerów do autentykacji</td>
      <td>
        <span>* Rejestracja użytkownika</span><br>
        <span>* Logowanie użytkownika</span>
      </td>
      <td>
        <span>Zrobione</span>
      </td>
    </tr>  
    <tr>
      <td>7</td>
      <td>Utworzenie handlerów dla modelu wydarzeń</td>
      <td>
        <span>* Tworzenie wydarzenia</span><br>
        <span>* Pobranie wszystkich wydarzeń</span><br>
        <span>* Pobranie wydarzenia o danym id</span><br>
        <span>* Edycja wydarzenia</span><br>
        <span>* Usuwanie wydarzenia</span>
      </td>
      <td>
        <span>Zrobione</span>
      </td>
    </tr>
    <tr>
      <td>8</td>
      <td>Utworzenie handlerów dla modelu notatek</td>
      <td>
        <span>* Tworzenie notatki</span><br>
        <span>* Pobranie wszystkich notatek</span><br>
        <span>* Pobranie notatki o danym id</span><br>
        <span>* Edycja notatki</span><br>
        <span>* Usuwanie notatki</span>
      </td>
      <td>
        <span>Zrobione</span>
      </td>
    </tr>  
  </tbody>
</table>

<a id="etap-ii-frontend"></a>
### Frontend
<table>
  <thead>
    <tr>
      <th style="width: 5%;">Lp</th>
      <th style="width: 45%;">Zadanie</th>
      <th style="width: 35%;">Uwagi</th>
      <th style="width: 15%;">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Przygotowanie podstawy frontendu</td>
      <td>
        <span>TypeScript, React, Chakra UI, Storybook?</span>
      </td>
      <td>Zrobione</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Przygotowanie kolorystyki strony</td>
      <td>
        <span>* Tryb ciemny?</span><br>
        <span>* Tryb jasny?</span>
      </td>
      <td>
        <span>Zrobione</span>
      </td>
    </tr>
    <tr>
      <td>3</td>
      <td>Wykonanie podstawowych widoków</td>
      <td>
        <span>* Strona główna</span><br>
        <span>* Strona logowania</span><br>
        <span>* Profil użytkownika</span><br>
        <span>* Lista użytkowników</span><br>
        <span>* Lista notatek</span><br>
        <span>* Kalendarz/harmonogram</span>
      </td>
      <td>
        <span>Zrobione</span>
      </td>
    </tr>
    <tr>
      <td>4</td>
      <td>Utworzenie potrzebnych komponentów do harmonogramu</td>
      <td>
        <span>* Kalendarz</span><br>
        <span>* Notatka</span><br>
        <span>* Spotkanie/Wydarzenie</span>
      </td>
      <td>
        <span>Zrobione</span>
      </td>
    </tr>
  </tbody>
</table>

<a id="etap-ii-devops"></a>
### DevOps
<table>
  <thead>
    <tr>
      <th style="width: 5%;">Lp</th>
      <th style="width: 45%;">Zadanie</th>
      <th style="width: 35%;">Uwagi</th>
      <th style="width: 15%;">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Konteneryzacja aplikacji</td>
      <td>Docker</td>
      <td>Zrobione</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Dodanie proxy</td>
      <td>Nginx</td>
      <td>Zrobione</td>
    </tr>
  </tbody>
</table>

<a id="etap-ii-documentation"></a>
### Documentation
<table>
  <thead>
    <tr>
      <th style="width: 5%;">Lp</th>
      <th style="width: 45%;">Zadanie</th>
      <th style="width: 35%;">Uwagi</th>
      <th style="width: 15%;">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Stworzenie dokumentacji API</td>
      <td>
        <span>* Użytkownicy</span><br>
        <span>* Autentykacji</span><br>
        <span>* Firmy</span><br>
        <span>* Wydarzenia</span><br>
        <span>* Notatki</span>
      </td>
      <td>
        <span>Zrobione</span>
      </td>
    </tr>
  </tbody>
</table>

## Technologie

<a id="technologie-backend"></a>
### Backend

<table>
  <thead>
    <tr>
      <th style="width: 5%;">Lp</th>
      <th style="width: 25%;">Technologia</th>
      <th style="width: 70%;">Uwagi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>TypeScript</td>
      <td>Język programowania do typowania statycznego. Jest nadzbiorem języka JavaScript</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Express</td>
      <td>Backendowy framework aplikacji intenernetowych do budowania REST API</td>
    </tr>
  </tbody>
</table>

<a id="technologie-database"></a>
### Database

<table>
  <thead>
    <tr>
      <th style="width: 5%;">Lp</th>
      <th style="width: 25%;">Technologia</th>
      <th style="width: 70%;">Uwagi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>PostgreSQL</td>
      <td>Relacyjna baza danych używana do przechowywania danych</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Prisma</td>
      <td>ORM (Object-Relational Mapper) do zarządzania bazą danych, generowania zapytań SQL i migracji</td>
    </tr>
  </tbody>
</table>

<a id="technologie-frontend"></a>
### Frontend

<table>
  <thead>
    <tr>
      <th style="width: 5%;">Lp</th>
      <th style="width: 25%;">Technologia</th>
      <th style="width: 70%;">Uwagi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>TypeScript</td>
      <td>Język programowania do typowania statycznego. Jest nadzbiorem języka JavaScript</td>
    </tr>
    <tr>
      <td>2</td>
      <td>React</td>
      <td>Biblioteka JavaScript, która wykorzystywana jest do tworzenia interfejsów graficznych</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Vite</td>
      <td>Szybkie narzędzie do budowania aplikacji frontendowych</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Chakra</td>
      <td>Biblioteka komponentów do budowy interfejsów użytkownika</td>
    </tr>
  </tbody>
</table>

<a id="technologie-devops"></a>
### DevOps

<table>
  <thead>
    <tr>
      <th style="width: 5%;">Lp</th>
      <th style="width: 25%;">Technologia</th>
      <th style="width: 70%;">Uwagi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Docker</td>
      <td>Platforma do konteneryzacji aplikacji i zarządzania środowiskami</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Nginx</td>
      <td>Serwer HTTP używany jako reverse proxy i do zarządzania ruchem sieciowym</td>
    </tr>
  </tbody>
</table>
