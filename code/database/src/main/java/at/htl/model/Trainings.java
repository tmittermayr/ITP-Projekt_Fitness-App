package at.htl.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

import java.util.Date;

@Entity
public class Trainings extends PanacheEntity {
    @Column
    private String title;
    @Column
    private Date startdatetime;
    @Column
    private boolean isTrainingsPlan;

    @ManyToOne
    public Users user;
}
