--
-- PostgreSQL database dump
--

\restrict rIZ4uV5bldcnMxBm0GgH3dHYlcOEQUqXDnOHbIbknWDGSGFuissNGpyRX6KUK2n

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: biomaterials_db; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA biomaterials_db;


ALTER SCHEMA biomaterials_db OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: biomaterials; Type: TABLE; Schema: biomaterials_db; Owner: postgres
--

CREATE TABLE biomaterials_db.biomaterials (
    id integer NOT NULL,
    name character varying NOT NULL,
    type character varying,
    description text,
    density real,
    biocompatibility character varying,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE biomaterials_db.biomaterials OWNER TO postgres;

--
-- Name: biomaterials_id_seq; Type: SEQUENCE; Schema: biomaterials_db; Owner: postgres
--

CREATE SEQUENCE biomaterials_db.biomaterials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE biomaterials_db.biomaterials_id_seq OWNER TO postgres;

--
-- Name: biomaterials_id_seq; Type: SEQUENCE OWNED BY; Schema: biomaterials_db; Owner: postgres
--

ALTER SEQUENCE biomaterials_db.biomaterials_id_seq OWNED BY biomaterials_db.biomaterials.id;


--
-- Name: biomaterials id; Type: DEFAULT; Schema: biomaterials_db; Owner: postgres
--

ALTER TABLE ONLY biomaterials_db.biomaterials ALTER COLUMN id SET DEFAULT nextval('biomaterials_db.biomaterials_id_seq'::regclass);


--
-- Data for Name: biomaterials; Type: TABLE DATA; Schema: biomaterials_db; Owner: postgres
--

COPY biomaterials_db.biomaterials (id, name, type, description, density, biocompatibility, created_at) FROM stdin;
1	Carbono	1B	Ligações de carbonos	2.71	ALL	2026-04-13 12:19:38.866075+02
2	Polimero de Silicone	4A	Polimero formado por moleculas que componhem o silicone	1.56	Medium	2026-04-13 16:54:31.900225+02
9	omg	2C	dslkdsldkls	22	sera	2026-04-14 15:58:25.699042+02
10	llll	2	fdfdfd	3	ALL	2026-04-14 16:22:55.896592+02
11	weew	A	zfexzf	0.12	SMALL	2026-04-14 16:23:16.694851+02
12	kdlskdls	B	dkslkdlklllll\n	0.23	SMALL	2026-04-14 16:23:39.69904+02
13	LAST	c	DSDSD	333	huge	2026-04-14 16:23:59.743424+02
\.


--
-- Name: biomaterials_id_seq; Type: SEQUENCE SET; Schema: biomaterials_db; Owner: postgres
--

SELECT pg_catalog.setval('biomaterials_db.biomaterials_id_seq', 13, true);


--
-- Name: biomaterials biomaterials_pkey; Type: CONSTRAINT; Schema: biomaterials_db; Owner: postgres
--

ALTER TABLE ONLY biomaterials_db.biomaterials
    ADD CONSTRAINT biomaterials_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict rIZ4uV5bldcnMxBm0GgH3dHYlcOEQUqXDnOHbIbknWDGSGFuissNGpyRX6KUK2n

