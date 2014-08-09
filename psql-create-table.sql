-- Table: hyg

-- DROP TABLE hyg;

CREATE TABLE hyg
(
  id serial NOT NULL,
  starid integer NOT NULL,
  hip integer,
  hd integer,
  hr integer,
  gliese character varying(20),
  bayerflamsteed character varying(200),
  propername character varying(200),
  ra numeric NOT NULL,
  "dec" numeric NOT NULL,
  distance numeric NOT NULL,
  pmra numeric NOT NULL,
  pmdec numeric NOT NULL,
  rv numeric,
  mag numeric NOT NULL,
  absmag numeric NOT NULL,
  spectrum character varying(20),
  colorindex numeric(10,3),
  x numeric NOT NULL,
  y numeric NOT NULL,
  z numeric NOT NULL,
  vx numeric NOT NULL,
  vy numeric NOT NULL,
  vz numeric NOT NULL,
  CONSTRAINT hyg_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE hyg
  OWNER TO marcel;
