create schema szpital;

set search_path to szpital;

CREATE TABLE szpital.powiklania (
                id_powiklania BIGSERIAL NOT NULL,
                nazwa VARCHAR NOT NULL,
                stopien_zagrozenia VARCHAR NOT NULL,
                CONSTRAINT id_powiklania PRIMARY KEY (id_powiklania)
);


CREATE TABLE szpital.choroba (
                id_choroba BIGSERIAL NOT NULL,
                nazwa VARCHAR NOT NULL,
                CONSTRAINT id_choroba PRIMARY KEY (id_choroba)
);


CREATE TABLE szpital.choroba_powiklania (
                id_choroba INTEGER NOT NULL,
                id_powiklania INTEGER NOT NULL,
                CONSTRAINT id_choroba_powiklania PRIMARY KEY (id_choroba, id_powiklania)
);


CREATE TABLE szpital.oddzial (
                id_oddzial BIGSERIAL NOT NULL,
                nazwa VARCHAR NOT NULL,
                ordynator VARCHAR NOT NULL,
                CONSTRAINT id_oddzial PRIMARY KEY (id_oddzial)
);


CREATE TABLE szpital.lekarz (
                id_lekarz BIGSERIAL NOT NULL,
                imie VARCHAR NOT NULL,
                nazwisko VARCHAR NOT NULL,
                haslo VARCHAR NOT NULL,
                nr_licencji INTEGER NOT NULL,
                specjalizacja VARCHAR NOT NULL,
                CONSTRAINT id_lekarz PRIMARY KEY (id_lekarz)
);


CREATE TABLE szpital.operacja (
                id_operacja BIGSERIAL NOT NULL,
                id_lekarz INTEGER NOT NULL,
                id_oddzial INTEGER NOT NULL,
                sala_operacyjna INTEGER NOT NULL,
                nazwa VARCHAR NOT NULL,
                CONSTRAINT id_operacja PRIMARY KEY (id_operacja)
);


CREATE TABLE szpital.lekarz_oddzial (
                id_oddzial INTEGER NOT NULL,
                id_lekarz INTEGER NOT NULL,
                CONSTRAINT id_lekarz_oddzial PRIMARY KEY (id_oddzial, id_lekarz)
);


CREATE TABLE szpital.pacjent (
                id_pacjent BIGSERIAL NOT NULL,
                imie VARCHAR NOT NULL,
                nazwisko VARCHAR NOT NULL,
                PESEL BIGINT NOT NULL,
                haslo VARCHAR NOT NULL,
                CONSTRAINT id_pacjent PRIMARY KEY (id_pacjent)
);


CREATE TABLE szpital.pacjent_na_oddziale (
                id_pacjent_na_oddziale BIGSERIAL NOT NULL,
                id_oddzial INTEGER NOT NULL,
                id_pacjent INTEGER NOT NULL,
                poczatek DATE NOT NULL,
                koniec DATE NOT NULL,
                CONSTRAINT id_pacjent_na_oddziale PRIMARY KEY (id_pacjent_na_oddziale)
);


CREATE TABLE szpital.operacja_pacjent (
                id_operacja_pacjent BIGSERIAL NOT NULL,
                id_pacjent INTEGER,
                id_operacja INTEGER NOT NULL,
                termin DATE NOT NULL,
                CONSTRAINT id_operacja_pacjent PRIMARY KEY (id_operacja_pacjent)
);


CREATE TABLE szpital.choroba_pacjenta (
                id_pacjent INTEGER NOT NULL,
                id_choroba INTEGER NOT NULL,
                CONSTRAINT id_choroba_pacjenta PRIMARY KEY (id_pacjent, id_choroba)
);


CREATE TABLE szpital.opinia_o_lekarzu (
                id_opinia_o_lekarzu BIGSERIAL NOT NULL,
                opinia VARCHAR NOT NULL,
                ocena INTEGER NOT NULL,
                id_lekarz INTEGER NOT NULL,
                id_pacjent INTEGER NOT NULL,
                CONSTRAINT id_opinia_o_lekarzu PRIMARY KEY (id_opinia_o_lekarzu)
);


CREATE TABLE szpital.poradnia (
                id_poradnia BIGSERIAL NOT NULL,
                nazwa VARCHAR NOT NULL,
                rodzaj VARCHAR NOT NULL,
                CONSTRAINT id_poradnia PRIMARY KEY (id_poradnia)
);


CREATE TABLE szpital.wizyta (
                id_wizyta BIGSERIAL NOT NULL,
                id_lekarz INTEGER NOT NULL,
                id_poradnia INTEGER NOT NULL,
                termin DATE NOT NULL,
                poczatek TIME NOT NULL,
                koniec TIME NOT NULL,
                CONSTRAINT id_wizyta PRIMARY KEY (id_wizyta)
);


CREATE TABLE szpital.wizyta_na_godzine (
                id_wizyta_na_godzine BIGSERIAL NOT NULL,
                id_wizyta INTEGER NOT NULL,
                godzina TIME NOT NULL,
                id_pacjent INTEGER,
                CONSTRAINT id_wizyta_na_godzine PRIMARY KEY (id_wizyta_na_godzine)
);


ALTER TABLE szpital.choroba_powiklania ADD CONSTRAINT powiklania_choroba_powiklania_fk
FOREIGN KEY (id_powiklania)
REFERENCES szpital.powiklania (id_powiklania)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE szpital.choroba_pacjenta ADD CONSTRAINT choroba_choroba_pacjenta_fk
FOREIGN KEY (id_choroba)
REFERENCES szpital.choroba (id_choroba)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE szpital.choroba_powiklania ADD CONSTRAINT choroba_choroba_powiklania_fk
FOREIGN KEY (id_choroba)
REFERENCES szpital.choroba (id_choroba)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE szpital.lekarz_oddzial ADD CONSTRAINT oddzia__lekarz_oddzial_fk
FOREIGN KEY (id_oddzial)
REFERENCES szpital.oddzial (id_oddzial)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE szpital.pacjent_na_oddziale ADD CONSTRAINT oddzial_pacjent_na_oddziale_fk
FOREIGN KEY (id_oddzial)
REFERENCES szpital.oddzial (id_oddzial)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE szpital.operacja ADD CONSTRAINT oddzial_operacja_fk
FOREIGN KEY (id_oddzial)
REFERENCES szpital.oddzial (id_oddzial)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE szpital.wizyta ADD CONSTRAINT lekarz_wizyta_fk
FOREIGN KEY (id_lekarz)
REFERENCES szpital.lekarz (id_lekarz)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE szpital.lekarz_oddzial ADD CONSTRAINT lekarz_lekarz_oddzial_fk
FOREIGN KEY (id_lekarz)
REFERENCES szpital.lekarz (id_lekarz)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE szpital.operacja ADD CONSTRAINT lekarz_operacja_fk
FOREIGN KEY (id_lekarz)
REFERENCES szpital.lekarz (id_lekarz)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE szpital.opinia_o_lekarzu ADD CONSTRAINT lekarz_id_opinia_o_lekarzu_fk
FOREIGN KEY (id_lekarz)
REFERENCES szpital.lekarz (id_lekarz)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE szpital.operacja_pacjent ADD CONSTRAINT operacja_operacja_pacjent_fk
FOREIGN KEY (id_operacja)
REFERENCES szpital.operacja (id_operacja)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE szpital.opinia_o_lekarzu ADD CONSTRAINT pacjent_id_opinia_o_lekarzu_fk
FOREIGN KEY (id_pacjent)
REFERENCES szpital.pacjent (id_pacjent)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE szpital.choroba_pacjenta ADD CONSTRAINT pacjent_choroba_pacjenta_fk
FOREIGN KEY (id_pacjent)
REFERENCES szpital.pacjent (id_pacjent)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE szpital.wizyta_na_godzine ADD CONSTRAINT pacjent_wizyta_na_godzine_fk
FOREIGN KEY (id_pacjent)
REFERENCES szpital.pacjent (id_pacjent)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE szpital.operacja_pacjent ADD CONSTRAINT pacjent_operacja_pacjent_fk
FOREIGN KEY (id_pacjent)
REFERENCES szpital.pacjent (id_pacjent)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE szpital.pacjent_na_oddziale ADD CONSTRAINT pacjent_pacjent_na_oddziale_fk
FOREIGN KEY (id_pacjent)
REFERENCES szpital.pacjent (id_pacjent)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE szpital.wizyta ADD CONSTRAINT rejestracja_wizyta_fk
FOREIGN KEY (id_poradnia)
REFERENCES szpital.poradnia (id_poradnia)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE szpital.wizyta_na_godzine ADD CONSTRAINT wizyta_godzina_wizyty_fk
FOREIGN KEY (id_wizyta)
REFERENCES szpital.wizyta (id_wizyta)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;


