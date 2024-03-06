package at.htl.model;

import com.fasterxml.jackson.annotation.*;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class TrainingExercise extends PanacheEntity {

    @ManyToOne
    @JsonIdentityReference(alwaysAsId = true)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    private Trainings training;

    @ManyToOne
    private Exercise exercise;

    public TrainingExercise() {
    }

    public TrainingExercise(Trainings training, Exercise exercise) {
        this.training = training;
        this.exercise = exercise;
    }

    public Trainings getTraining() {
        return training;
    }

    public void setTraining(Trainings training) {
        this.training = training;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    @Override
    public String toString() {
        return "TrainingExercise{" +
                "training=" + training +
                ", exercise=" + exercise +
                '}';
    }
}
