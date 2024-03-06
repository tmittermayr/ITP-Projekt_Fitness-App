package at.htl.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class TrainingExercise extends PanacheEntity {

    @ManyToOne
    public Trainings training;

    @ManyToOne
    public Exercise exercise;

    public TrainingExercise() {
    }

    public TrainingExercise(Trainings training, Exercise exercise) {
        this.training = training;
        this.exercise = exercise;
    }


}
