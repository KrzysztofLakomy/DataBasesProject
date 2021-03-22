require('dotenv').config();

const express = require("express");
const cors = require("cors");
const db = require("./db");

const morgan = require("morgan");

const app = express();

app.use(cors());


app.use(express.json());
//app.use(morgan("dev"));


app.get("/api/v1/doctors", async (req,res)=>{
    try{
        const result = await db.query("select * from szpital.lekarze");

        res.status(200).json({
            status: "success",
            data:{
                doctor: result.rows,
            },
        });
    }catch(err){
        console.log(err);
    }
});

app.get("/api/v1/doctors/:id", async (req,res)=>{
    try{
        const doctorResult = await db.query(`select * from szpital.lekarze where id_lekarz = $1`,[req.params.id]);

        const reviewsResult = await db.query("select * from szpital.opinie_o_wybranym_lekarzu where id_lekarz = $1",[req.params.id]);

        res.status(200).json({
            status: "success",
            data:{
                doctor: doctorResult.rows[0],
                reviews: reviewsResult.rows,
            },
        });
    }catch(err){
        console.log(err);
    }
});


app.get("/api/v1/doctors/:id/clinics", async (req,res)=>{
    try{
            const result = await db.query("select * from szpital.poradnie_wybranego_lekarza where id_lekarz = $1",
            [req.params.id]);

        res.status(200).json({
            status: "success",
            data:{
                clinics: result.rows,
            },
        });
    }catch(err){
        console.log(err);
    }
});

app.get("/api/v1/doctors/:id/clinics/:id2/visit", async (req,res)=>{
    try{
        const result = await db.query("select * from szpital.terminy_wizyt_lekarza where id_lekarz = $1 and id_poradnia = $2",
        [req.params.id,req.params.id2]);

        for(i = 0; i<result.rowCount;i++){
            result.rows[i].termin = result.rows[i].termin.toLocaleString();
        }

        res.status(200).json({
            status: "success",
            data:{
                dates: result.rows,
            },
        });
    }catch(err){
        console.log(err);
    }
});

app.post("/api/v1/doctors/:id/clinics/:id2/visit/update/:id3", async (req,res)=>{
    try{
        const exist = await db.query("select exists(select p.id_pacjent from szpital.pacjent p where p.pesel = $1 and p.imie = $2)",[req.body.pesel, req.body.imie]);
        if(!exist.rows[0].exists){
            res.status(404).json({
                status: "unsuccess",
                data: {
                    err: "Proba zapisania nieistniejacego pacjenta",
                },
            });
        }
        else{
            const patientResult = await db.query("select p.id_pacjent from szpital.pacjent p where p.pesel = $1 and p.imie = $2",[req.body.pesel, req.body.imie]);

            const result = await db.query("update szpital.wizyta_na_godzine set id_pacjent = $1 where id_wizyta_na_godzine = $2 RETURNING *",[patientResult.rows[0].id_pacjent, req.params.id3]);

            res.status(201).json({
                status: "success",
                data:{
                    wg: result.rows[0],
                },
            });
        }
    }catch(err){
        console.log(err);
    }
});

app.post("/api/v1/doctors", async (req,res)=>{
    console.log(req.body);
    try{
        const exist = await db.query("select exists(select l.id_lekarz from szpital.lekarz l where l.nr_licencji = $1)",[req.body.nr_licencji]);
        if(exist.rows[0].exists){
            res.status(404).json({
                status: "unsuccess",
                data: {
                    err: "Istnieje juz doktor o tym numerze licencji",
                },
            });
        }
        else{
            const result = await db.query("insert into szpital.lekarz(imie,nazwisko,haslo,nr_licencji,specjalizacja) values ($1,$2,$3,$4,$5) RETURNING *",
            [req.body.imie, req.body.nazwisko, req.body.haslo, req.body.nr_licencji, req.body.specjalizacja]);

            res.status(201).json({
                status: "success",
                data:{
                    doctor: result.rows[0],
                },
            });
        }
    }catch(err){
        res.status(404).json({
            status: "unsuccess",
            data: {
                err: err.toString(),
            },
        });
    }
});

//dodawanie opini
app.post("/api/v1/doctors/:id/addReview", async (req,res)=>{
    try{
        const exist = await db.query("select exists(select p.id_pacjent from szpital.pacjent p where p.pesel = $1 and p.haslo = $2)",[req.body.pesel, req.body.haslo]);
        //console.log(exist);
        if(!exist.rows[0].exists){
            res.status(403).json({
                status: "unsuccess",
                data: {
                    err: "Nie ma takiego pacjenta, zarejestruj się",
                },
            });
        }
        else{
            const patientResult = await db.query("select p.id_pacjent from szpital.pacjent p where p.pesel = $1",[req.body.pesel]);

            const result = await db.query("insert into szpital.opinia_o_lekarzu(opinia,ocena,id_lekarz,id_pacjent) values ($1,$2,$3,$4) RETURNING *",
            [req.body.opinia, req.body.ocena, req.params.id, patientResult.rows[0].id_pacjent]);

            res.status(201).json({
                status: "success",
                data:{
                    patient: patientResult.rows[0],
                    review: result.rows[0],
                },
            });
        }
        
    }catch(err){
        res.status(403).json({
            status: "unsuccess",
            data:{
                err: err.code,
            },
        });
    }
})

app.put("/api/v1/doctors/:id", async (req,res)=>{
    try{
        const result = await db.query("update szpital.lekarz set imie = $1, nazwisko = $2, haslo = $3, nr_licencji = $4, specjalizacja = $5 where id_lekarz = $6 RETURNING *",
        [req.body.imie, req.body.nazwisko, req.body.haslo, req.body.nr_licencji, req.body.specjalizacja, req.params.id]);

        res.status(200).json({
            status: "success",
            data:{
                id: req.params.id,
                doctor: result.rows[0],
            },
        });
    }catch(err){
        console.log(err);
    }
});

app.delete("/api/v1/doctors/:id", async (req,res)=>{
    try{
        const result = await db.query("delete from szpital.lekarz where id_lekarz = $1",[req.params.id]);

        res.status(204).json({
            status: "success",
        });
    }catch(err){
        console.log(err);
    }
});



app.get("/api/v1/patients", async (req,res) => {
    try{
        const result = await db.query("select id_pacjent, imie, nazwisko, pesel from szpital.pacjent");

        res.status(200).json({
            status: "success",
            data:{
                patient: result.rows,
            }
        });
    }catch(err){
        console.log(err);
    }
});

app.get("/api/v1/patients/:id", async (req,res)=>{
    try{
        const patientResult = await db.query("select id_pacjent, imie, nazwisko, pesel from szpital.pacjent where id_pacjent = $1",[req.params.id]);

        const patientDisease = await db.query(`select * from szpital.choroby_pacjenta where id_pacjent = $1`,[req.params.id]);

        const patientVisits = await db.query("select * from szpital.wizyty_pacjenta where id_pacjent = $1",[req.params.id]);

        const vistisNum = await db.query("select count(id_wizyta_na_godzine) from szpital.wizyty_pacjenta where id_pacjent = $1",[req.params.id]);

        const patientsWards = await db.query("select * from szpital.oddzialy_pacjenta where id_pacjent = $1",[req.params.id]);

        const patientWardsNum = await db.query("select count(poczatek) from szpital.oddzialy_pacjenta where id_pacjent = $1",[req.params.id]);

        const patientOperations = await db.query("select * from szpital.operacje_pacjenta where id_pacjent = $1",[req.params.id]);
        
        const patientOperationsNum = await db.query("select count(id_operacja_pacjent) from szpital.operacje_pacjenta where id_pacjent = $1",[req.params.id]);

        for(i = 0; i<patientVisits.rowCount;i++){
            patientVisits.rows[i].termin = patientVisits.rows[i].termin.toLocaleString();
        }

        for(i = 0; i<patientsWards.rowCount;i++){
            patientsWards.rows[i].poczatek = patientsWards.rows[i].poczatek.toLocaleString();
            patientsWards.rows[i].koniec = patientsWards.rows[i].koniec.toLocaleString();
        }

        for(i = 0; i<patientOperations.rowCount;i++){
            patientOperations.rows[i].termin = patientOperations.rows[i].termin.toLocaleString();
        }


        res.status(200).json({
            status: "success",
            data:{
                patient: patientResult.rows[0],
                diseases: patientDisease.rows,
                visits: patientVisits.rows,
                visits_num: vistisNum.rows[0],
                wards: patientsWards.rows,
                w_num: patientWardsNum.rows[0],
                operations: patientOperations.rows,
                o_num: patientOperationsNum.rows[0],
            },
        });
    }catch(err){
        console.log(err);
    }
});

app.post("/api/v1/patients/:id", async (req,res) => {
    try{
        const exist = await db.query("select exists(select c.id_choroba from szpital.choroba c where c.nazwa = $1)",[req.body.choroba]);
        if(!exist.rows[0].exists){
            res.status(404).json({
                status: "unsuccess",
                data: {
                    err: "Nie ma takiej choroby w bazie chorob",
                },
            })
        }
        else{
            const disease = await db.query("select c.id_choroba from szpital.choroba c where c.nazwa = $1",[req.body.choroba]);

            const result = await db.query("insert into szpital.choroba_pacjenta(id_choroba,id_pacjent) values ($1,$2) returning *",
            [disease.rows[0].id_choroba,req.params.id]);

            res.status(201).json({
                status: "success",
                data:{
                    patient: result.rows[0],
                }
            });
        }
    }catch(err){
        res.status(404).json({
            status: "unsuccess",
            data:{
                err: err.toString(),
            }
        });
    }
});

app.delete("/api/v1/patients/:id", async (req,res)=>{
    try{
        const result = await db.query("delete from szpital.pacjent where id_pacjent = $1",[req.params.id]);

        res.status(204).json({
            status: "success",
        });
    }catch(err){
        console.log(err);
    }
});

app.post("/api/v1/patients", async (req,res) => {
    try{
        const exist = await db.query("select exists(select p.id_pacjent from szpital.pacjent p where p.pesel = $1)",[req.body.pesel]);
        if(exist.rows[0].exists){
            res.status(404).json({
                status: "unsuccess",
                data: {
                    err: "istnieje pacjent o tym peselu",
                },
            })
        }
        else{
            const result = await db.query("insert into szpital.pacjent(imie,nazwisko,pesel,haslo) values ($1,$2,$3,$4) returning *",
            [req.body.imie, req.body.nazwisko,req.body.pesel,req.body.haslo]);

            res.status(201).json({
                status: "success",
                data:{
                    patient: result.rows[0],
                }
            });
        }
    }catch(err){
        res.status(404).json({
            status: "unsuccess",
            data: {
                err: err.toString(),
            },
        })
    }
});

app.get("/api/v1/diseases", async (req,res) => {
    try{
        const result = await db.query("select * from szpital.choroba");

        res.status(200).json({
            status: "success",
            data:{
                disease: result.rows,
            }
        });
    }catch(err){
        console.log(err);
    }
});


app.get("/api/v1/diseases/:id", async (req,res) => {
    try{
        const result = await db.query("select * from szpital.objawy_choroby where id_choroba = $1",
        [req.params.id]);

        res.status(200).json({
            status: "success",
            data:{
                symptoms: result.rows,
            }
        });
    }catch(err){
        console.log(err);
    }
});

app.post("/api/v1/diseases", async (req,res) => {
    try{
        const exist = await db.query("select exists(select id_choroba from szpital.choroba where nazwa = $1)",[req.body.nazwa]);
        if(exist.rows[0].exists){
            res.status(404).json({
                status: "unsuccess",
                data: {
                    err: "istnieje juz taka choroba",
                },
            })
        }
        else{
            const result = await db.query("insert into szpital.choroba(nazwa) values ($1) returning *",
            [req.body.nazwa]);

            res.status(201).json({
                status: "success",
                data:{
                    disease : result.rows[0],
                }
            });
        }
    }catch(err){
        console.log(err);
    }
});

app.post("/api/v1/diseases/symptoms", async (req,res) => {
    try{
        const exist = await db.query("select exists(select p.nazwa from szpital.powiklania p where p.nazwa = $1)",[req.body.nazwa]);
        if(exist.rows[0].exists){

            const res1 = await db.query("select p.id_powiklania from szpital.powiklania p where p.nazwa = $1",[req.body.nazwa]);
            const res2 = await db.query("insert into szpital.choroba_powiklania(id_choroba,id_powiklania) values ($1,$2) returning *",
            [req.body.id_choroba, res1.rows[0].id_powiklania]);

            res.status(201).json({
                status: "success1",
                data:{
                    symptoms: res1.rows[0],
                    dis_symptoms: res2.rows[0],
                }
            });
        }
        else{
            const result = await db.query("insert into szpital.powiklania(nazwa,stopien_zagrozenia) values ($1,$2) returning *",
            [req.body.nazwa, req.body.zagrozenie]);

            const result2 = await db.query("insert into szpital.choroba_powiklania(id_choroba,id_powiklania) values ($1,$2) returning *",
            [req.body.id_choroba, result.rows[0].id_powiklania]);

            res.status(201).json({
                status: "success2",
                data:{
                    symptoms: result.rows[0],
                    dis_symptoms: result2.rows[0],
                }
            });
        }
    }catch(err){
        console.log(err);
    }
});

app.get("/api/v1/clinics", async (req,res) => {
    try{
        const result = await db.query("select * from szpital.poradnia");

        res.status(200).json({
            status: "success",
            data:{
                clinic: result.rows,
            }
        });
    }catch(err){
        console.log(err);
    }
});

app.get("/api/v1/clinics/:id", async (req,res) => {
    try{
        const resultVisits = await db.query("select * from szpital.wizyty_w_poradniach where id_poradnia = $1",[req.params.id]);

        const number = await db.query("select count(termin) from szpital.wizyty_w_poradniach where id_poradnia = $1",[req.params.id]);

        for(i = 0; i<resultVisits.rowCount;i++){
            resultVisits.rows[i].termin = resultVisits.rows[i].termin.toLocaleString();
        }


        res.status(200).json({
            status: "success",
            data:{
                visits: resultVisits.rows,
                number: number.rows[0],
            }
        });
    }catch(err){
        console.log(err);
    }
});

app.delete("/api/v1/clinics/:id", async (req,res)=>{
    try{
        const result = await db.query("delete from szpital.poradnia where id_poradnia = $1",[req.params.id]);

        res.status(204).json({
            status: "success",
        });
    }catch(err){
        console.log(err);
    }
});

app.post("/api/v1/clinics", async (req,res) => {
    try{
        const exist = await db.query("select exists(select id_poradnia from szpital.poradnia where nazwa = $1 and rodzaj = $2)",[req.body.nazwa,req.body.rodzaj]);
        if(exist.rows[0].exists){
            res.status(404).json({
                status: "unsuccess",
                data: {
                    err: "istnieje juz taka poradnia",
                },
            })
        }
        else{
            const result = await db.query("insert into szpital.poradnia(nazwa,rodzaj) values ($1,$2) returning *",
            [req.body.nazwa, req.body.rodzaj]);

            res.status(201).json({
                status: "success",
                data:{
                    clinic : result.rows[0],
                }
            });
        }
    }catch(err){
        console.log(err);
    }
});


app.post("/api/v1/appointment", async (req,res) => {
    try{
        const exist = await db.query("select exists(select id_lekarz from szpital.lekarz where nr_licencji = $1 and haslo = $2)",[req.body.nr_licencji,req.body.haslo]);
        if(!exist.rows[0].exists){
            res.status(404).json({
                status: "unsuccess",
                data: {
                    err: "nie ma takiego lekarza",
                },
            })
        }
        else{
            const doctor = await db.query("select id_lekarz from szpital.lekarz where haslo = $1 and nr_licencji = $2",[req.body.haslo, req.body.nr_licencji]);

            const clinic = await db.query("select id_poradnia from szpital.poradnia where nazwa = $1",[req.body.poradnia]);

            const result = await db.query("insert into szpital.wizyta(id_lekarz,id_poradnia,termin,poczatek,koniec) values($1,$2,$3,$4,$5) returning *",
            [doctor.rows[0].id_lekarz, clinic.rows[0].id_poradnia,req.body.data, req.body.poczatek, req.body.koniec]);

            res.status(201).json({
                status: "success",
                data:{
                    clinic : result.rows[0],
                }
            });
        }
    }catch(err){
        res.status(404).json({
            status: "unsuccess",
            data: {
                err: err.toString(),
            },
        })
    }
});


app.get("/api/v1/wards", async (req,res) => {
    try{
        const result = await db.query("select * from szpital.oddzial");

        res.status(200).json({
            status: "success",
            data:{
                wards: result.rows,
            }
        });
    }catch(err){
        console.log(err);
    }
});

app.get("/api/v1/wards/:id", async (req,res)=>{
    try{
        const wardResult = await db.query("select id_oddzial, nazwa, ordynator from szpital.oddzial where id_oddzial = $1",[req.params.id]);

        const wardDoctors = await db.query("select * from szpital.doktorzy_na_oddziale where id_oddzial = $1",[req.params.id]);

        const doctorsNum = await db.query("select count(id_lekarz) from szpital.doktorzy_na_oddziale where id_oddzial = $1",[req.params.id]);

        const wardOperations = await db.query("select * from szpital.operacje_na_oddziale where id_oddzial = $1",[req.params.id]);

        const wardPatients = await db.query("select * from szpital.pacjenci_na_oddziale where id_oddzial = $1",[req.params.id]);

        const wardPatientsNum = await db.query("select count(poczatek) from szpital.pacjenci_na_oddziale where id_oddzial = $1",[req.params.id]);

        for(i = 0; i<wardPatients.rowCount;i++){
            wardPatients.rows[i].poczatek = wardPatients.rows[i].poczatek.toLocaleString();
            wardPatients.rows[i].koniec = wardPatients.rows[i].koniec.toLocaleString();
        }

        res.status(200).json({
            status: "success",
            data:{
                ward: wardResult.rows[0],
                doctors: wardDoctors.rows,
                operations: wardOperations.rows,
                doctor_num: doctorsNum.rows[0],
                patients: wardPatients.rows,
                p_num: wardPatientsNum.rows[0],
            },
        });
    }catch(err){
        console.log(err);
    }
});

app.delete("/api/v1/wards/:id", async (req,res)=>{
    try{
        const result = await db.query("delete from szpital.oddzial where id_oddzial = $1",[req.params.id]);

        res.status(204).json({
            status: "success",
        });
    }catch(err){
        console.log(err);
    }
});

app.post("/api/v1/wards", async (req,res) => {
    try{
        const exist = await db.query("select exists(select id_oddzial from szpital.oddzial where nazwa = $1 and ordynator = $2)",[req.body.nazwa,req.body.ordynator]);
        if(exist.rows[0].exists){
            res.status(404).json({
                status: "unsuccess",
                data: {
                    err: "istnieje juz taki oddzial",
                },
            })
        }
        else{
            const result = await db.query("insert into szpital.oddzial(nazwa,ordynator) values ($1,$2) returning *",
            [req.body.nazwa, req.body.ordynator]);

            res.status(201).json({
                status: "success",
                data:{
                    wards : result.rows[0],
                }
            });
        }
    }catch(err){
        console.log(err);
    }
});

app.post("/api/v1/wards/:id/operation", async (req,res) => {
    try{
        const exist = await db.query("select exists(select id_operacja from szpital.operacja where nazwa = $1 and id_oddzial = $2)",[req.body.nazwa,req.params.id]);
        if(exist.rows[0].exists){
            res.status(404).json({
                status: "unsuccess",
                data: {
                    err: "istnieje juz taka operacja",
                },
            })
        }
        else{
            const result = await db.query("insert into szpital.operacja(nazwa,sala_operacyjna,id_oddzial,id_lekarz) values ($1,$2,$3,$4) returning *",
            [req.body.nazwa, req.body.sala_operacyjna,req.params.id,req.body.id_lekarz]);

            res.status(201).json({
                status: "success",
                data:{
                    operation : result.rows[0],
                }
            });
        }
    }catch(err){
        console.log(err);
    }
});


app.post("/api/v1/wards/:id/doctor", async (req,res) => {
    try{
        const result = await db.query("insert into szpital.lekarz_oddzial(id_lekarz,id_oddzial) values ($1,$2) returning *",
        [req.body.id_lekarz,req.params.id]);

        res.status(201).json({
            status: "success",
            data:{
                doctor : result.rows[0],
            }
        });

    }catch(err){
        console.log(err);
    }
});

app.post("/api/v1/wards/patient", async (req,res) => {
    try{
        const result = await db.query("insert into szpital.pacjent_na_oddziale(id_pacjent,id_oddzial,poczatek,koniec) values ($1,$2,$3,$4) returning *",
        [req.body.id_pacjent,req.body.id_oddzial,req.body.poczatek,req.body.koniec]);

        res.status(201).json({
            status: "success",
            data:{
                doctor : result.rows[0],
            }
        });

    }catch(err){
        res.status(404).json({
            status: "unsuccess",
            data: {
                err: err.toString(),
            },
        })
    }
});


app.get("/api/v1/operations", async (req,res) => {
    try{
        const result = await db.query("select o.id_operacja, o.nazwa, l.imie, l.nazwisko from szpital.operacja o join szpital.lekarz l on l.id_lekarz = o.id_lekarz");

        res.status(200).json({
            status: "success",
            data:{
                operations: result.rows,
            }
        });
    }catch(err){
        console.log(err);
    }
});

app.get("/api/v1/operations/:id", async (req,res)=>{
    try{
        const result = await db.query("select op.id_operacja_pacjent, op.termin from szpital.operacja_pacjent op where op.id_operacja = $1 and op.id_pacjent is null order by 2",[req.params.id]);

        for(i = 0; i<result.rowCount;i++){
            result.rows[i].termin = result.rows[i].termin.toLocaleString();
        }

        res.status(200).json({
            status: "success",
            data:{
                dates: result.rows,
            },
        });
    }catch(err){
        console.log(err);
    }
});

app.post("/api/v1/operations/:id/update/:id2", async (req,res)=>{
    try{
        const exist = await db.query("select exists(select id_pacjent from szpital.pacjent p where p.pesel = $1 and p.imie = $2)",[req.body.pesel, req.body.imie]);
        if(!exist.rows[0].exists){
            res.status(404).json({
                status: "unsuccess",
                data: {
                    err: "Proba zapisania nieistniejacego pacjenta",
                },
            });
        }
        const patientResult = await db.query("select id_pacjent from szpital.pacjent where pesel = $1 and imie = $2",[req.body.pesel, req.body.imie]);

        const result = await db.query("update szpital.operacja_pacjent set id_pacjent = $1 where id_operacja_pacjent = $2 RETURNING *",[patientResult.rows[0].id_pacjent, req.params.id2]);

        res.status(201).json({
            status: "success",
            data:{
                op: result.rows[0],
            },
        });
    }catch(err){
        console.log(err);
    }
});


app.post("/api/v1/operation", async (req,res) => {
    try{
        const exist = await db.query("select exists(select id_lekarz from szpital.lekarz where nr_licencji = $1 and haslo = $2)",[req.body.nr_licencji,req.body.haslo]);
        if(!exist.rows[0].exists){
            res.status(404).json({
                status: "unsuccess",
                data: {
                    err: "nie ma takiego lekarza",
                },
            })
        }
        else{
            const result = await db.query("insert into szpital.operacja_pacjent(id_operacja,termin) values($1,$2) returning *",
            [req.body.operacja,req.body.data]);

            res.status(201).json({
                status: "success",
                data:{
                    operation : result.rows[0],
                }
            });
        }
    }catch(err){
        console.log(err);
    }
});

app.get("/api/v1/operation/patients", async (req,res) => {
    try{
        const result = await db.query(`select * from szpital.operacje_pacjentow`);

        for(i = 0; i<result.rowCount;i++){
            result.rows[i].termin = result.rows[i].termin.toLocaleString();
        }

        res.status(200).json({
            status: "success",
            data:{
                operations: result.rows,
            }
        });
    }catch(err){
        console.log(err);
    }
});


const port = process.env.PORT || 4002;

app.listen(port, ()=>{
    console.log('server  is up and listening on port ' + port);
});