insert into exercise (id, name, target, bodypart, equipment, gifid) values
                                                                        (1, '3/4 sit-up', 'abs', 'waist', 'body weight', 'B5nXewl3OYS8Em'),
                                                                        (2, 'alternate lateral pulldown', 'abs', 'back', 'cable', 'GgarX6i4ehymbM'),
                                                                        (3, 'arm slingers hanging straight legs', 'abs', 'waist', 'body weight', 'P3e99zxOfjKseW'),
            (4, 'astride jumps (male)', 'cardiovascular system', 'cardio', 'body weight', 'SWIxdjTyn3HGeD'),
        (5, 'assisted standing chin-up', 'lats', 'back', 'leverage machine', 'adOImvc96calHD');

INSERT INTO users (id, firstname, lastname, email, password) VALUES
                                                                 (6, 'Timo', 'Mittermayr', 'tm@gmail.com', 'f0e4c2f76c58916ec258f246851bea091d14d4247a2fc3e18694461b1816e13b'),
                                                                 (2, 'Jan', 'Angerer', 'ja@gmail.com', 'asdf'),
                                                                 (3, 'Valentin', 'Seeger', 'vs@gmail.com', 'asdf'),
                                                                 (4, 'Simon', 'Elmecker', 'se@gmail.com', '1234'),
                                                                 (5, 'Max', 'Mustermann', 'mm@gmail.com', '1234');

INSERT INTO trainings (id, title, startdatetime, enddatetime, istrainingsplan, user_id) VALUES
                                                                                         (4, 'Training am 10.01.2024', '2024-01-10T17:37:38.343+00:00', '2024-01-10T18:40:38.343+00:00',false, 6),
                                                                                         (2, '2.Training am 10.01.2024', '2024-01-09T17:37:38.343+00:00', '2024-01-09T18:40:38.343+00:00',true, 6),
                                                                                         (3, '3.Training am 10.01.2024', '2024-01-05T17:37:38.343+00:00', '2024-01-05T18:40:38.343+00:00',false, 6);