/*
insert into COURTTYPE(ID, DESCRIPTION) values
    (1, 'Tennis'),
    (2, 'Squash');

insert into COURT(ID, TYPE_ID, LOCATION) values
    (1, 1, 'Halle 1'),
    (2, 1, 'Halle 1'),
    (3, 2, 'Halle 2'),
    (4, 2, 'Halle 2');


insert into CUSTOMER(ID, FIRSTNAME, LASTNAME, STREET, HOUSENO, ZIP, CITY, PASSWORD) values
    (1, 'Max', 'Muster', 'Mustergasse', '2a', '4020', 'Linz', 'test1'),
    (2, 'Susi', 'Sonne', 'Sonnenweg', '5', '4060', 'Leonding', 'test2');

insert into RESERVATION(ID, COURT_ID, CUSTOMER_ID, STARTTIME, ENDTIME, RESTIMESTAMP) values
    (1, 1, 1, '2023-09-28 10:00:00', '2023-09-28 11:00:00', null),
    (2, 2, 1, '2023-09-28 12:00:00', '2023-09-28 13:00:00', null);

drop sequence customer_seq RESTRICT ;
create sequence customer_seq start with 100;

drop sequence reservation_seq RESTRICT ;
create sequence reservation_seq start with 100;


 */