CREATE TABLE role (
    id_role INTEGER PRIMARY KEY,
    nom_role VARCHAR(50) NOT NULL
);

CREATE TABLE entreprise (
    id_entreprise INTEGER PRIMARY KEY,
    nom_entreprise VARCHAR(50) NOT NULL,
    effectif_entreprise INTEGER NOT NULL,
    ville_entreprise VARCHAR(50) NOT NULL
);

CREATE TABLE promo (
    id_promo INTEGER PRIMARY KEY,
    effectif_promo INTEGER NOT NULL,
    annee_promo INTEGER NOT NULL
);

CREATE TABLE membre (
    id_membre INTEGER PRIMARY KEY,
    nom_membre VARCHAR(50) NOT NULL,
    prenom_membre VARCHAR(50) NOT NULL,
    sexe_membre VARCHAR(1) NOT NULL,
    datenai_membre DATE NOT NULL,
    ville_membre VARCHAR(50) NOT NULL,
    mail_membre VARCHAR(50) NOT NULL,
    mdp_membre VARCHAR(50) NOT NULL,
    id_promo INT REFERENCES promo(id_promo),
    id_entreprise INT REFERENCES entreprise(id_entreprise),
    id_role INT REFERENCES role(id_role)
);