CREATE TABLE public.event_categories (
	id serial4 NOT NULL,
	"name" varchar NULL,
	display_order int4 NULL,
	CONSTRAINT "PK_EventCategories" PRIMARY KEY (id)
);

CREATE TABLE public.event_enrollments (
	id serial4 NOT NULL,
	id_event int4 NOT NULL,
	id_user int4 NOT NULL,
	description varchar NULL,
	registration_date_time timestamp NULL,
	attended bool NULL,
	observations varchar NULL,
	rating int4 NULL,
	CONSTRAINT "PK_EventEnrollments" PRIMARY KEY (id)
);

CREATE TABLE public.event_locations (
	id serial4 NOT NULL,
	id_location int4 NOT NULL,
	"name" varchar NULL,
	full_address varchar NULL,
	max_capacity varchar NOT NULL,
	latitude decimal NULL,
	longitude decimal NULL,
	id_creator_user int4 NOT NULL,
	CONSTRAINT "PK_EventLocations" PRIMARY KEY (id)
);

CREATE TABLE public.event_tags (
	id serial4 NOT NULL,
	id_event int4 NOT NULL,
	id_tag int4 NOT NULL,
	CONSTRAINT "PK_EventTags" PRIMARY KEY (id)
);

CREATE TABLE public.events (
	id serial4 NOT NULL,
	"name" varchar NULL,
	description varchar NULL,
	id_event_category int4 NULL,
	id_event_location int4 NULL,
	start_date timestamp NULL,
	duration_in_minutes int4 NOT NULL,
	price decimal NOT NULL,
	enabled_for_enrollment bool NULL,
	max_assistance int4 NOT NULL,
	id_creator_user int4 NOT NULL,
	CONSTRAINT "PK_Events" PRIMARY KEY (id)
);

CREATE TABLE public.locations (
	id serial4 NOT NULL,
	"name" varchar NULL,
	id_province int4 NOT NULL,
	latitude decimal NULL,
	longitude decimal NULL,
	CONSTRAINT "PK_Locations" PRIMARY KEY (id)
);

CREATE TABLE public.provinces (
	id serial4 NOT NULL,
	"name" varchar NULL,
	full_name varchar NULL,
	latitude decimal NULL,
	longitude decimal NULL,
	display_order int4 NULL,
	CONSTRAINT "PK_Provinces " PRIMARY KEY (id)
);

CREATE TABLE public.tags (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "PK_Tags" PRIMARY KEY (id)
);

CREATE TABLE public.users (
	id serial4 NOT NULL,
	first_name varchar NOT NULL,
	last_name varchar NOT NULL,
	username varchar NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT "PK_Users" PRIMARY KEY (id)
);



INSERT INTO public.locations ("name", id_province, latitude, longitude) VALUES (N'Ciudad de Buenos Aires', 2, -34.608417510986328, -58.372135162353516);
INSERT INTO public.locations ("name", id_province, latitude, longitude) VALUES (N'Carhué', 6, -37.179481506347656, -62.759990692138672);
INSERT INTO public.locations ("name", id_province, latitude, longitude) VALUES (N'Colonia San Miguel Arcángel', 6, -37.449016571044922, -63.117156982421875);
INSERT INTO public.locations ("name", id_province, latitude, longitude) VALUES (N'Delfín Huer', 6, -37.32110595703125, -63.2343864440918);
INSERT INTO public.locations ("name", id_province, latitude, longitude) VALUES (N'Espartillar', 6, -37.3574104309082, -62.438381195068359);
INSERT INTO public.locations ("name", id_province, latitude, longitude) VALUES (N'Esteban Agustín Gascón', 6, -37.455837249755859, -63.254310607910156);
INSERT INTO public.locations ("name", id_province, latitude, longitude) VALUES (N'La Pala', 6, -36.663921356201172, -63.3664665222168);
INSERT INTO public.locations ("name", id_province, latitude, longitude) VALUES (N'Maza', 6, -36.800315856933594, -63.339282989501953);
INSERT INTO public.locations ("name", id_province, latitude, longitude) VALUES (N'Rivera', 6, -37.160594940185547, -63.241790771484375);
INSERT INTO public.locations ("name", id_province, latitude, longitude) VALUES (N'Villa Margarita', 6, -37.461353302001953, -63.242172241210938);
INSERT INTO public.locations ("name", id_province, latitude, longitude) VALUES (N'Adolfo nzales Chaves', 6, -38.032371520996094, -60.099391937255859);
INSERT INTO public.locations ("name", id_province, latitude, longitude) VALUES (N'De La Garma', 6, -37.9665412902832, -60.416786193847656);
INSERT INTO public.locations ("name", id_province, latitude, longitude) VALUES (N'Juan E. Barra', 6, -37.820037841796875, -60.4820556640625);
INSERT INTO public.locations ("name", id_province, latitude, longitude) VALUES (N'Vásquez', 6, -38.175800323486328, -60.169792175292969);
INSERT INTO public.locations ("name", id_province, latitude, longitude) VALUES (N'Alberti', 6, -35.031574249267578, -60.2802848815918);
INSERT INTO public.locations ("name", id_province, latitude, longitude) VALUES (N'Coronel Seguí', 6, -34.867439270019531, -60.392971038818359);
INSERT INTO public.locations ("name", id_province, latitude, longitude) VALUES (N'Mechita', 6, -35.067386627197266, -60.403427124023438);
INSERT INTO public.locations ("name", id_province, latitude, longitude) VALUES (N'Pla', 6, -35.122894287109375, -60.221916198730469);


INSERT INTO public.users (id, first_name, last_name, username, "password") VALUES (1, N'TOMAS', N'KALINSCKY', N'ELHUEVO@gmail.com', N'huevo');
INSERT INTO public.users (id, first_name, last_name, username, "password") VALUES (2, N'franco', N'bron', N'Franquito@gmail.com', N'KILLO');

INSERT INTO public.event_locations (id_location,"name",full_address,max_capacity,latitude,longitude,id_creator_user) VALUES (1,'boca','Av. la plata 1544','84567',-34.5453,-58.4498,2);

INSERT INTO public.events ("name",description,id_event_category,id_event_location,start_date,duration_in_minutes,price,max_assistance,id_creator_user,enabled_for_enrollment) VALUES ('DILLOM','MUY BUENO',1,1,'2021-03-12 00:00:00',210,12000,100000,1,true);
INSERT INTO public.events ("name",description,id_event_category,id_event_location,start_date,duration_in_minutes,price,max_assistance,id_creator_user,enabled_for_enrollment) VALUES ('DUKI','malardo',1,1,'2024-01-28 00:00:00',210,15500,145000,2,true);
INSERT INTO public.events ("name",description,id_event_category,id_event_location,start_date,duration_in_minutes,price,max_assistance,id_creator_user,enabled_for_enrollment) VALUES ('khea','excelente',1,1,'2024-01-28 00:00:00',210,15500,145000,3,true);
INSERT INTO public.events ("name",description,id_event_category,id_event_location,start_date,duration_in_minutes,price,max_assistance,id_creator_user,enabled_for_enrollment) VALUES ('loter','faltaron muchas canciones',1,1,'2021-01-28 00:00:00',210,15500,145000,4,true);


INSERT INTO public.tags ("name") VALUES (N'trap');
INSERT INTO public.tags ("name") VALUES (N'trap');

INSERT INTO public.event_categories ("name", display_order) VALUES (N'Musica', 10);
INSERT INTO public.event_categories ("name", display_order) VALUES (N'Deportes', 20);
INSERT INTO public.event_categories ("name", display_order) VALUES (N'Soial', 30);

INSERT INTO public.event_tags (id_event, id_tag) VALUES (1, 1);
INSERT INTO public.event_tags (id_event, id_tag) VALUES (1, 2);
INSERT INTO public.event_tags (id_event, id_tag) VALUES (2, 1);
INSERT INTO public.event_tags (id_event, id_tag) VALUES (2, 2);

INSERT INTO public.event_enrollments (id_event,id_user,description,registration_date_time,observations,rating,attended) VALUES (2,1,'Alto Chow','2024-03-22 00:44:51.737126',NULL,5,true);
INSERT INTO public.event_enrollments (id_event,id_user,description,registration_date_time,observations,rating,attended) VALUES (2,2,NULL,'2024-03-22 00:44:51.737126',NULL,NULL,false);


ALTER TABLE event_enrollments ADD CONSTRAINT FK_event_enrollments_events FOREIGN KEY (id_event) REFERENCES events (id);
ALTER TABLE event_enrollments ADD CONSTRAINT FK_event_enrollments_users FOREIGN KEY(id_user) REFERENCES users (id);
ALTER TABLE event_locations ADD CONSTRAINT FK_event_locations_locations FOREIGN KEY(id_location) REFERENCES locations (id);
ALTER TABLE event_tags ADD CONSTRAINT FK_event_tags_events FOREIGN KEY(id_event) REFERENCES events (id);
ALTER TABLE event_tags ADD CONSTRAINT FK_event_tags_tags FOREIGN KEY(id_tag) REFERENCES tags (id);
ALTER TABLE events ADD CONSTRAINT FK_events_event_categories FOREIGN KEY(id_event_category) REFERENCES event_categories (id);
ALTER TABLE events ADD CONSTRAINT FK_events_event_locations FOREIGN KEY(id_event_location) REFERENCES event_locations (id);
ALTER TABLE events ADD CONSTRAINT FK_events_users FOREIGN KEY(id_creator_user) REFERENCES users (id);
ALTER TABLE locations ADD CONSTRAINT FK_locations_provinces FOREIGN KEY(id_province) REFERENCES provinces (id);