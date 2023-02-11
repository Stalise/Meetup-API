--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6
-- Dumped by pg_dump version 14.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: meetups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meetups (
    id integer NOT NULL,
    theme character varying(50),
    description character varying(150),
    "time" character varying(24),
    venue character varying(100)
);


ALTER TABLE public.meetups OWNER TO postgres;

--
-- Name: meetups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.meetups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.meetups_id_seq OWNER TO postgres;

--
-- Name: meetups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.meetups_id_seq OWNED BY public.meetups.id;


--
-- Name: participants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.participants (
    id integer NOT NULL,
    user_mail character varying(320),
    meetup_id integer
);


ALTER TABLE public.participants OWNER TO postgres;

--
-- Name: participants_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.participants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.participants_id_seq OWNER TO postgres;

--
-- Name: participants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.participants_id_seq OWNED BY public.participants.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    name character varying(15),
    meetup_id integer
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tags_id_seq OWNER TO postgres;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    mail character varying(320) NOT NULL,
    password character varying(16),
    token character varying(500),
    role character varying(5)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: meetups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meetups ALTER COLUMN id SET DEFAULT nextval('public.meetups_id_seq'::regclass);


--
-- Name: participants id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participants ALTER COLUMN id SET DEFAULT nextval('public.participants_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Data for Name: meetups; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.meetups (id, theme, description, "time", venue) VALUES (1, 'Holy JS', 'About JavaScript', 'zavtra', 'Moscow');
INSERT INTO public.meetups (id, theme, description, "time", venue) VALUES (2, 'Dota 2 tournament', 'Tournament', '2023-05-07T18:00:00.030Z', 'D2CL');
INSERT INTO public.meetups (id, theme, description, "time", venue) VALUES (3, 'DSM', 'AM.Private daily', '2023-01-09T10:30:00.030Z', 'Team ZOOM');
INSERT INTO public.meetups (id, theme, description, "time", venue) VALUES (5, 'IT-Bedolagi', 'About assest', '2023-01-08T16:01:31.012Z', 'Slack');
INSERT INTO public.meetups (id, theme, description, "time", venue) VALUES (6, 'React', 'React and its ecosystem', '2023-05-07T18:00:00.030Z', 'Zoom');
INSERT INTO public.meetups (id, theme, description, "time", venue) VALUES (7, 'React', 'useState and useEffect hooks', '2023-02-15T14:00:00.030Z', 'Zoom');
INSERT INTO public.meetups (id, theme, description, "time", venue) VALUES (8, 'React', 'React and its ecosystem', '2023-03-01T14:00:00.030Z', 'Google Meet');
INSERT INTO public.meetups (id, theme, description, "time", venue) VALUES (9, 'NextJS', 'The React Framework for Production', '2023-07-10T10:00:00.030Z', 'Skype');
INSERT INTO public.meetups (id, theme, description, "time", venue) VALUES (10, 'React Hook Form', 'Performant, flexible and extensible forms with easy-to-use validation.', '2023-10-16T10:30:00.030Z', 'Zoom');
INSERT INTO public.meetups (id, theme, description, "time", venue) VALUES (11, 'Lodash', 'A modern JavaScript utility library delivering modularity, performance & extra.', '2023-02-27T10:30:00.030Z', 'SPb');
INSERT INTO public.meetups (id, theme, description, "time", venue) VALUES (12, 'VueJS', 'Progressive JavaScript framework', '2023-04-22T14:00:00.030Z', 'Zoom');


--
-- Data for Name: participants; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.participants (id, user_mail, meetup_id) VALUES (1, 'viato@mail.ru', 3);


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tags (id, name, meetup_id) VALUES (1, 'js', 1);
INSERT INTO public.tags (id, name, meetup_id) VALUES (2, 'holyjs', 1);
INSERT INTO public.tags (id, name, meetup_id) VALUES (3, 'moscow', 1);
INSERT INTO public.tags (id, name, meetup_id) VALUES (4, 'dota2', 2);
INSERT INTO public.tags (id, name, meetup_id) VALUES (6, 'js', 5);
INSERT INTO public.tags (id, name, meetup_id) VALUES (7, 'ts', 5);
INSERT INTO public.tags (id, name, meetup_id) VALUES (8, 'react', 6);
INSERT INTO public.tags (id, name, meetup_id) VALUES (9, 'js', 6);
INSERT INTO public.tags (id, name, meetup_id) VALUES (10, 'reactjs', 6);
INSERT INTO public.tags (id, name, meetup_id) VALUES (11, 'react', 7);
INSERT INTO public.tags (id, name, meetup_id) VALUES (12, 'hooks', 7);
INSERT INTO public.tags (id, name, meetup_id) VALUES (13, 'usestate', 7);
INSERT INTO public.tags (id, name, meetup_id) VALUES (14, 'useeffect', 7);
INSERT INTO public.tags (id, name, meetup_id) VALUES (15, 'react', 8);
INSERT INTO public.tags (id, name, meetup_id) VALUES (16, 'react', 9);
INSERT INTO public.tags (id, name, meetup_id) VALUES (17, 'nextjs', 9);
INSERT INTO public.tags (id, name, meetup_id) VALUES (18, 'js', 9);
INSERT INTO public.tags (id, name, meetup_id) VALUES (19, 'react', 10);
INSERT INTO public.tags (id, name, meetup_id) VALUES (20, 'js', 10);
INSERT INTO public.tags (id, name, meetup_id) VALUES (21, 'form', 10);
INSERT INTO public.tags (id, name, meetup_id) VALUES (22, 'validation', 10);
INSERT INTO public.tags (id, name, meetup_id) VALUES (23, 'js', 11);
INSERT INTO public.tags (id, name, meetup_id) VALUES (24, 'vue', 12);
INSERT INTO public.tags (id, name, meetup_id) VALUES (25, 'js', 12);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (mail, password, token, role) VALUES ('viato@mail.ru', 'mypa66w0rd', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoidmlhdG9AbWFpbC5ydSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc0NTAxNzc5LCJleHAiOjE2NzcwOTM3Nzl9.LS6ToEWQ-7iSBfHgwmvEmfq3NEA_Q6L9c1z0R3mkaoc', 'user');
INSERT INTO public.users (mail, password, token, role) VALUES ('sayonara@yahoo.com', 'he110kitty', '', 'admin');


--
-- Name: meetups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.meetups_id_seq', 12, true);


--
-- Name: participants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.participants_id_seq', 1, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tags_id_seq', 25, true);


--
-- Name: meetups meetups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meetups
    ADD CONSTRAINT meetups_pkey PRIMARY KEY (id);


--
-- Name: participants participants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participants
    ADD CONSTRAINT participants_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (mail);


--
-- Name: participants participants_meetup_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participants
    ADD CONSTRAINT participants_meetup_id_fkey FOREIGN KEY (meetup_id) REFERENCES public.meetups(id) ON DELETE CASCADE;


--
-- Name: participants participants_user_mail_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participants
    ADD CONSTRAINT participants_user_mail_fkey FOREIGN KEY (user_mail) REFERENCES public.users(mail) ON DELETE CASCADE;


--
-- Name: tags tags_meetup_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_meetup_id_fkey FOREIGN KEY (meetup_id) REFERENCES public.meetups(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

