# findgroup-form
Należy przygotować plik HTML (CSS/JS) z formularzem wg poniższego opisu: 
1. Na stronie znajduje się przycisk wyśrodkowany w pionie i poziomie. 
2. Na górze strony znajduje się avatar użytkownika (obrazek). 
3. Do widoku przekazywane są z backendu następujące parametry: - user_name, - user_surname, - user_description, - user_site_url, - user_avatar_url 
4. Klikniecie w przycisk otwiera popup z formularzem (popup w ramach strony, nie nowe okno –przeglądarki) 
5. W popupie znajduje się formularz z następującymi polami: - imię - nazwisko - opis - url do strony - przycisk zapisz. 
6. Istnieją 2 endpointy zapisujące dane (POST) /user/save-data przyjmuje parametry user_name, user_surname, user_description, user_avatar_url /user/save-url przyjmuje parametry user_site_url 
7. Klikniecie w przycisk na formularzu powoduje przesłanie do powyższych endpointów wymaganych danych. Po poprawnym zapisie (kod odpowiedzi 200) następuje zamknięcie popupa. 
8. Działające endpointy są przygotowane po naszej stronie, zostaną dodane do zadania podczas jego weryfikacji. Podobnie kwestia dostarczenia do widoku danych opisanych w pkt. 3.
