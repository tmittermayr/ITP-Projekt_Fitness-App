INSERT INTO public.exercise (id, bodypart, equipment, gifid, name, target) VALUES (1, 'arm', 'cable', 'cable_curl', 'Cable curl', 'biceps');
INSERT INTO public.exercise (id, bodypart, equipment, gifid, name, target) VALUES (2, 'back', 'reverse fly machine', 'reverse_fly', 'Reverse fly', 'upper back');
INSERT INTO public.exercise (id, bodypart, equipment, gifid, name, target) VALUES (3, 'shoulder', 'barbell', 'overhead_barbell_military_press', 'Overhead barbell military press', 'shoulder');
INSERT INTO public.exercise (id, bodypart, equipment, gifid, name, target) VALUES (4, 'legs', 'smith machine', 'smith_machine_backsquat', 'Smith machine backsquat', 'quadriceps');
INSERT INTO public.exercise (id, bodypart, equipment, gifid, name, target) VALUES (5, 'legs', 'leg curl machine', 'laying_leg_curl', 'Laying leg curl', 'hamstrings');
INSERT INTO public.exercise (id, bodypart, equipment, gifid, name, target) VALUES (6, 'chest', 'incline chest press', 'incline_chest_press', 'Incline chest press', 'upper chest');
INSERT INTO public.exercise (id, bodypart, equipment, gifid, name, target) VALUES (7, 'chest', 'smith machine', 'smith_machine_incline_bench_press', 'Smith machine incline bench press', 'chest');
INSERT INTO public.exercise (id, bodypart, equipment, gifid, name, target) VALUES (8, 'chest', 'chest press', 'chest_press', 'Chest press', 'chest');
INSERT INTO public.exercise (id, bodypart, equipment, gifid, name, target) VALUES (9, 'chest', 'barbell', 'power_clean', 'Power clean', 'chest');
INSERT INTO public.exercise (id, bodypart, equipment, gifid, name, target) VALUES (10, 'shoulder', 'barbell', 'barbell_shrug', 'Barbell shrug', 'shoulder');
INSERT INTO public.exercise (id, bodypart, equipment, gifid, name, target) VALUES (11, 'waist', 'body weight', 'B5nXewl3OYS8Em', '3/4 sit-up', 'abs');
INSERT INTO public.exercise (id, bodypart, equipment, gifid, name, target) VALUES (12, 'back', 'cable', 'GgarX6i4ehymbM', 'alternate lateral pulldown', 'abs');
INSERT INTO public.exercise (id, bodypart, equipment, gifid, name, target) VALUES (13, 'waist', 'body weight', 'P3e99zxOfjKseW', 'arm slingers hanging straight legs', 'abs');
INSERT INTO public.exercise (id, bodypart, equipment, gifid, name, target) VALUES (14, 'cardio', 'body weight', 'SWIxdjTyn3HGeD', 'astride jumps (male)', 'cardiovascular system');
INSERT INTO public.exercise (id, bodypart, equipment, gifid, name, target) VALUES (15, 'back', 'leverage machine', 'adOImvc96calHD', 'assisted standing chin-up', 'lats');

INSERT INTO public.users (id, email, firstname, lastname, password) VALUES (6, 'tm@gmail.com', 'Timo', 'Mittermayr', 'f0e4c2f76c58916ec258f246851bea091d14d4247a2fc3e18694461b1816e13b');
INSERT INTO public.users (id, email, firstname, lastname, password) VALUES (2, 'ja@gmail.com', 'Jan', 'Angerer', 'asdf');
INSERT INTO public.users (id, email, firstname, lastname, password) VALUES (3, 'vs@gmail.com', 'Valentin', 'Seeger', 'asdf');
INSERT INTO public.users (id, email, firstname, lastname, password) VALUES (4, 'se@gmail.com', 'Simon', 'Elmecker', '1234');
INSERT INTO public.users (id, email, firstname, lastname, password) VALUES (5, 'mm@gmail.com', 'Max', 'Mustermann', '1234');

INSERT INTO public.trainings (istrainingsplan, enddatetime, id, startdatetime, user_id, title) VALUES (false, '2024-01-05 18:40:38.343000', 30, '2024-01-05 17:37:38.343000', 6, '3.Training am 10.01.2024');
INSERT INTO public.trainings (istrainingsplan, enddatetime, id, startdatetime, user_id, title) VALUES (false, '2024-01-10 18:40:38.343000', 40, '2024-03-04 17:37:38.343000', 6, 'Training am 04.03.2024');
INSERT INTO public.trainings (istrainingsplan, enddatetime, id, startdatetime, user_id, title) VALUES (true, '2024-01-09 18:40:38.343000', 20, '2024-03-05 16:37:38.343000', 6, 'Training am 05.03.2024');
INSERT INTO public.trainings (istrainingsplan, enddatetime, id, startdatetime, user_id, title) VALUES (true, '2024-03-07 09:07:09.599000', 10, '2024-03-06 10:06:23.184000', 6, 'Training Rücken Brust');

INSERT INTO public.trainingexercise (exercise_id, id, training_id) VALUES (2, 10, 10);
INSERT INTO public.trainingexercise (exercise_id, id, training_id) VALUES (6, 20, 10);

INSERT INTO public.set (id, index, reps, trainingexercise_id, weight, attribute) VALUES (10, 2, 10, 10, 50, 'standard');
INSERT INTO public.set (id, index, reps, trainingexercise_id, weight, attribute) VALUES (20, 2, 8, 10, 60, 'standard');
INSERT INTO public.set (id, index, reps, trainingexercise_id, weight, attribute) VALUES (30, 2, 8, 10, 50, 'standard');
INSERT INTO public.set (id, index, reps, trainingexercise_id, weight, attribute) VALUES (40, 2, 10, 20, 80, 'standard');
INSERT INTO public.set (id, index, reps, trainingexercise_id, weight, attribute) VALUES (50, 2, 8, 20, 80, 'standard');
INSERT INTO public.set (id, index, reps, trainingexercise_id, weight, attribute) VALUES (60, 2, 7, 20, 80, 'standard');


