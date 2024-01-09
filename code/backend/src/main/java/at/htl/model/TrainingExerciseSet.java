package at.htl.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

@Entity
public class TrainingExerciseSet extends PanacheEntity {

    @Column
    private int index;

    @Column
    private int weight;

    @Column
    private int reps;

    @Column
    private String attribute;

    @ManyToOne
    public TrainingExercise trainingExercise;

}
