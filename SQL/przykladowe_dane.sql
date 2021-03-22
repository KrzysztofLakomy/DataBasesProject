insert into szpital.lekarz(imie,nazwisko,haslo,nr_licencji,specjalizacja) values 
('Marian','Mak','123', 57, 'anestezjolog'),
('Mariusz','Mamacki','123', 123, 'reumatolog'),
('Robert', 'Lis', '123', 69, 'kardiolog'),
('Adam', 'Abacki', '123', 42, 'pediatra');


insert into szpital.pacjent(imie,nazwisko,haslo,pesel) values 
('Antoni','Bandera','123456', 74011299465),
('Robert','Maklowicz','koxu123', 68040477069),
('Jan','Kowalski','123', 99021409123);

insert into szpital.opinia_o_lekarzu(opinia,ocena,id_lekarz,id_pacjent) values
('fajny gosc',5,1,1),
('sredni',2,1,2),
('daje rade',3,2,1),
('cos z niego bedzie',4,2,2);

insert into szpital.choroba(nazwa) values 
('nadcisnienie'),
('zapalenie pluc'),
('COVID-19');



insert into szpital.powiklania(nazwa,stopien_zagrozenia) values
('kaszel','srednie'),
('katar','male'),
('szybkie meczenie sie','srednie'),
('brak wechu','male');

insert into szpital.choroba_powiklania(id_choroba,id_powiklania) values 
(1,3),
(2,1),
(3,1),
(3,2),
(3,4);

insert into szpital.choroba_pacjenta(id_choroba,id_pacjent) values
(2,1),
(3,1),
(1,2),
(3,3),
(2,3);

insert into szpital.poradnia(nazwa,rodzaj) values
('reumatologiczna','zwykla'),
('onkologiczna','zwykla'),
('stomatologiczna', 'zabiegowa');



insert into szpital.wizyta(id_lekarz,id_poradnia,termin,poczatek,koniec) values(1,1,'2021-01-30','8:00','11:00');


insert into szpital.oddzial(nazwa,ordynator) values('kardiologiczny','or. Jakub Stetoskop'), ('pediatryczny','or. Janusz Skalpel');

insert into szpital.lekarz_oddzial (id_oddzial, id_lekarz) values (1,3), (2,4);

insert into szpital.operacja (id_lekarz, id_oddzial, sala_operacyjna, nazwa) values (3,1,2,'wymiana zastawki serca'), (4,2,5,'usuniecie wyrostka robaczkowego');

insert into szpital.operacja_pacjent(id_operacja, termin) values (1,'2021-02-13'), (1,'2021-02-24'), (2,'2021-03-02');