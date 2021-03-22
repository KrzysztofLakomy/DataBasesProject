set search_path to szpital;

create or replace view lekarze as select l.id_lekarz, l.imie, l.nazwisko, l.haslo, l.nr_licencji, l.specjalizacja, avg(o.ocena)::decimal(3,2) as srednia, count(o.ocena) as liczba_opinii from szpital.lekarz l left join
szpital.opinia_o_lekarzu o on o.id_lekarz = l.id_lekarz left join szpital.pacjent p on p.id_pacjent = o.id_pacjent group by 1;

create or replace view opinie_o_wybranym_lekarzu as select p.imie, o.opinia, o.ocena, o.id_lekarz from szpital.opinia_o_lekarzu o join szpital.pacjent p on p.id_pacjent = o.id_pacjent;

create or replace view poradnie_wybranego_lekarza as select l.id_lekarz, po.id_poradnia, po.nazwa, po.rodzaj from szpital.poradnia po join szpital.wizyta w on w.id_poradnia = po.id_poradnia 
join szpital.lekarz l on l.id_lekarz = w.id_lekarz group by po.id_poradnia, l.id_lekarz;

create or replace view terminy_wizyt_lekarza as select l.id_lekarz, po.id_poradnia, wg.godzina, w.termin, wg.id_wizyta_na_godzine from szpital.poradnia po join szpital.wizyta w on w.id_poradnia = po.id_poradnia 
join szpital.lekarz l on l.id_lekarz = w.id_lekarz join szpital.wizyta_na_godzine wg on wg.id_wizyta = w.id_wizyta where wg.id_pacjent is null order by 2,1;

create or replace view choroby_pacjenta as select p.id_pacjent, cp.id_choroba, c.nazwa from szpital.pacjent p left join szpital.choroba_pacjenta cp on cp.id_pacjent = p.id_pacjent 
join szpital.choroba c on c.id_choroba = cp.id_choroba;

create or replace view wizyty_pacjenta as select wg.id_pacjent, wg.godzina, w.termin, l.imie, l.nazwisko, po.nazwa, po,rodzaj, wg.id_wizyta_na_godzine from szpital.poradnia po join szpital.wizyta w on w.id_poradnia = po.id_poradnia 
join szpital.lekarz l on l.id_lekarz = w.id_lekarz 
join szpital.wizyta_na_godzine wg on wg.id_wizyta = w.id_wizyta;

create or replace view oddzialy_pacjenta as select p.id_pacjent, o.nazwa, po.poczatek, po.koniec from szpital.pacjent p join szpital.pacjent_na_oddziale po on po.id_pacjent = p.id_pacjent 
join szpital.oddzial o on o.id_oddzial = po.id_oddzial;

create or replace view operacje_pacjenta as select op.id_pacjent, op.id_operacja_pacjent, o.nazwa, o.sala_operacyjna, l.imie, l.nazwisko, op.termin from szpital.operacja_pacjent op 
join szpital.operacja o on o.id_operacja = op.id_operacja join szpital.lekarz l on l.id_lekarz = o.id_lekarz order by 7;

create or replace view objawy_choroby as select ch.id_choroba, ch.nazwa as choroba, p.nazwa, p.stopien_zagrozenia from szpital.choroba ch left join szpital.choroba_powiklania cp on cp.id_choroba = ch.id_choroba 
join szpital.powiklania p on p.id_powiklania = cp.id_powiklania;

create or replace view wizyty_w_poradniach as select w.id_poradnia, w.termin, w.poczatek, w.koniec, l.imie, l.nazwisko from szpital.poradnia po left join szpital.wizyta w on w.id_poradnia = po.id_poradnia 
left join szpital.lekarz l on l.id_lekarz = w.id_lekarz;

create or replace view doktorzy_na_oddziale as select o.id_oddzial, l.id_lekarz, l.imie, l.nazwisko, l.specjalizacja, l.nr_licencji from szpital.oddzial o join szpital.lekarz_oddzial lo on lo.id_oddzial = o.id_oddzial
join szpital.lekarz l on l.id_lekarz = lo.id_lekarz;

create or replace view operacje_na_oddziale as select op.id_oddzial, l.imie, l.nazwisko, l.id_lekarz, op.sala_operacyjna, op.nazwa from szpital.operacja op join szpital.lekarz l on l.id_lekarz = op.id_lekarz;

create or replace view pacjenci_na_oddziale as select po.id_oddzial, p.imie, p.nazwisko, p.pesel, po.poczatek, po.koniec from szpital.pacjent p join szpital.pacjent_na_oddziale po on po.id_pacjent = p.id_pacjent 
join szpital.oddzial o on o.id_oddzial = po.id_oddzial;

create or replace view operacje_pacjentow as select op.id_operacja_pacjent, o.nazwa, o.sala_operacyjna, op.termin, p.imie, p.nazwisko, l.imie as imie_l, l.nazwisko as nazwisko_l 
from szpital.operacja o join szpital.operacja_pacjent op on op.id_operacja = o.id_operacja 
left join szpital.pacjent p on p.id_pacjent = op.id_pacjent join szpital.lekarz l on l.id_lekarz = o.id_lekarz order by 4;