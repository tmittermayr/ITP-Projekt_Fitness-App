package at.htl.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

@Entity
public class Set extends PanacheEntity {

    @Column
    private long index;

    @Column
    private long weight;

    @Column
    private long reps;

    @Column
    private String attribute;

    @ManyToOne
    @JsonIdentityReference(alwaysAsId = true)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    public TrainingExercise trainingExercise;

    public Set() {}

    public Set(long index, long weight, long reps, String attribute, TrainingExercise trainingExercise) {
        this.index = index;
        this.weight = weight;
        this.reps = reps;
        this.attribute = attribute;
        this.trainingExercise = trainingExercise;
    }

    public long getIndex() {
        return index;
    }

    public void setIndex(long index) {
        this.index = index;
    }

    public long getWeight() {
        return weight;
    }

    public void setWeight(long weight) {
        this.weight = weight;
    }

    public long getReps() {
        return reps;
    }

    public void setReps(long reps) {
        this.reps = reps;
    }

    public String getAttribute() {
        return attribute;
    }

    public void setAttribute(String attribute) {
        this.attribute = attribute;
    }

    public TrainingExercise getTrainingExercise() {
        return trainingExercise;
    }

    public void setTrainingExercise(TrainingExercise trainingExercise) {
        this.trainingExercise = trainingExercise;
    }
}
