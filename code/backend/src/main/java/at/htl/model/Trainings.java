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
    private Date enddatetime;
    @Column
    private boolean isTrainingsPlan;


    public Trainings() {

    }

    public Trainings(String title, Date startdatetime, Date enddatetime, boolean isTrainingsPlan, Users user) {
        this.title = title;
        this.startdatetime = startdatetime;
        this.enddatetime = enddatetime;
        this.isTrainingsPlan = isTrainingsPlan;
        this.user = user;
    }

    @ManyToOne
    public Users user;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getStartdatetime() {
        return startdatetime;
    }

    public void setStartdatetime(Date startdatetime) {
        this.startdatetime = startdatetime;
    }

    public Date getEnddatetime() {
        return enddatetime;
    }

    public void setEnddatetime(Date enddatetime) {
        this.enddatetime = enddatetime;
    }

    public boolean isTrainingsPlan() {
        return isTrainingsPlan;
    }

    public void setTrainingsPlan(boolean trainingsPlan) {
        isTrainingsPlan = trainingsPlan;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}
