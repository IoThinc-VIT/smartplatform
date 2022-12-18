CREATE ROLE client WITH
	NOLOGIN
	NOSUPERUSER
	NOCREATEDB
	NOCREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'word';

CREATE DATABASE "IoT"
    WITH
    OWNER = client
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

CREATE TABLE public."setup"
(
    id serial NOT NULL,
    ssid text,
    password text,
    host text,
    port integer,
    userid text,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."setup"
    OWNER to client;

CREATE TABLE public."components"
(
    id bigserial NOT NULL,
    name text,
    type text,
    topic text,
    pin integer,
    userid text,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."components"
    OWNER to client;