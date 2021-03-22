set search_path to szpital;

CREATE OR REPLACE FUNCTION fun2 () RETURNS TRIGGER as
$$
DECLARE
    tmp TIME;
BEGIN
    tmp = NEW.poczatek;
    while (tmp <> NEW.koniec) loop
      insert into szpital.wizyta_na_godzine(id_wizyta,godzina) values (NEW.id_wizyta,tmp);
      tmp = tmp + interval '1 hour';
    end loop;
    return NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER create_wizyta_na_godzine
    AFTER INSERT ON wizyta
    FOR EACH ROW EXECUTE PROCEDURE fun2();


CREATE OR REPLACE FUNCTION usun_doktora () RETURNS TRIGGER as
$$
BEGIN
    delete from szpital.lekarz_oddzial where id_lekarz = OLD.id_lekarz;
    delete from szpital.opinia_o_lekarzu where id_lekarz = OLD.id_lekarz;
    delete from szpital.wizyta where id_lekarz = OLD.id_lekarz;
    delete from szpital.operacja where id_lekarz = OLD.id_lekarz;
    return OLD;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER usuwanie_lekarzy
    BEFORE DELETE ON lekarz
    FOR EACH ROW EXECUTE PROCEDURE usun_doktora();


CREATE OR REPLACE FUNCTION usun_wizyte () RETURNS TRIGGER as
$$
BEGIN
    delete from szpital.wizyta_na_godzine where id_wizyta = OLD.id_wizyta;
    return OLD;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER usuwanie_wizyty
    BEFORE DELETE ON wizyta
    FOR EACH ROW EXECUTE PROCEDURE usun_wizyte();


CREATE OR REPLACE FUNCTION usun_pacjenta () RETURNS TRIGGER as
$$
BEGIN
    delete from szpital.choroba_pacjenta where id_pacjent = OLD.id_pacjent;
    delete from szpital.pacjent_na_oddziale where id_pacjent = OLD.id_pacjent;
    delete from szpital.opinia_o_lekarzu where id_pacjent = OLD.id_pacjent;
    update szpital.operacja_pacjent set id_pacjent = NULL where id_pacjent = OLD.id_pacjent;
    update szpital.wizyta_na_godzine set id_pacjent = NULL where id_pacjent = OLD.id_pacjent;
    return OLD;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER usuwanie_pacjentow
    BEFORE DELETE ON pacjent
    FOR EACH ROW EXECUTE PROCEDURE usun_pacjenta();


CREATE OR REPLACE FUNCTION usun_poradnie () RETURNS TRIGGER as
$$
BEGIN
    delete from szpital.wizyta where id_poradnia = OLD.id_poradnia;
    return OLD;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER usuwanie_poradni
    BEFORE DELETE ON poradnia
    FOR EACH ROW EXECUTE PROCEDURE usun_poradnie();


CREATE OR REPLACE FUNCTION usun_oddzial () RETURNS TRIGGER as
$$
BEGIN
    delete from szpital.pacjent_na_oddziale where id_oddzial = OLD.id_oddzial;
    delete from szpital.lekarz_oddzial where id_oddzial = OLD.id_oddzial;
    delete from szpital.operacja where id_oddzial = OLD.id_oddzial;
    return OLD;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER usuwanie_oddzialow
    BEFORE DELETE ON oddzial
    FOR EACH ROW EXECUTE PROCEDURE usun_oddzial();


CREATE OR REPLACE FUNCTION usun_operacje () RETURNS TRIGGER as
$$
BEGIN
    delete from szpital.operacja_pacjent where id_operacja = OLD.id_operacja;
    return OLD;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER usuwanie_operacji
    BEFORE DELETE ON operacja
    FOR EACH ROW EXECUTE PROCEDURE usun_operacje();



CREATE OR REPLACE FUNCTION walidacja_pacjenta () RETURNS TRIGGER as
$$
BEGIN
    IF FLOOR(log(NEW.pesel))+1 <> 11 THEN
        RAISE EXCEPTION 'PESEL musi miec 11 cyfr.';
    ELSEIF NEW.imie is not null THEN
        NEW.imie := initcap(NEW.imie);
        NEW.nazwisko := initcap(NEW.nazwisko);
    END IF;
    return NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER dodawanie_pacjenta
    BEFORE insert or update ON pacjent
    FOR EACH ROW EXECUTE PROCEDURE walidacja_pacjenta();



CREATE OR REPLACE FUNCTION walidacja_doktora () RETURNS TRIGGER as
$$
BEGIN
    IF FLOOR(log(NEW.nr_licencji))+1 < 2 THEN
        RAISE EXCEPTION 'numer licencji musi miec minimum 2 cyfry.';
    ELSEIF NEW.imie is not null THEN
        NEW.imie := initcap(NEW.imie);
        NEW.nazwisko := initcap(NEW.nazwisko);
    END IF;
    return NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER dodawanie_lekarza
    BEFORE insert or update ON lekarz
    FOR EACH ROW EXECUTE PROCEDURE walidacja_doktora();


CREATE OR REPLACE FUNCTION walidacja_wizyty () RETURNS TRIGGER as
$$
BEGIN
    IF NEW.koniec <= NEW.poczatek THEN
        RAISE EXCEPTION 'godzina zakonczenia nie moze byc mniejsza niz godzina rozpoczenia';
    END IF;
    return NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER dodawanie_wizyty
    BEFORE insert or update ON wizyta
    FOR EACH ROW EXECUTE PROCEDURE walidacja_wizyty();


CREATE OR REPLACE FUNCTION walidacja_pacjenta_na_oddziale () RETURNS TRIGGER as
$$
BEGIN
    IF NEW.koniec <= NEW.poczatek THEN
        RAISE EXCEPTION 'koniec pobytu nie moze byc wczesniej niz poczatek';
    END IF;
    return NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER dodawanie_pacjenta_na_oddzial
    BEFORE insert or update ON pacjent_na_oddziale
    FOR EACH ROW EXECUTE PROCEDURE walidacja_pacjenta_na_oddziale();