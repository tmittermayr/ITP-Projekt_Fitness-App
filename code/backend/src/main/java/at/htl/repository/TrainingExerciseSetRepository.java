package at.htl.repository;

import at.htl.dto.AddExerciseToTrainingDto;
import at.htl.model.Exercise;
import at.htl.model.TrainingExerciseSet;
import at.htl.model.Trainings;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.TypedQuery;

@ApplicationScoped
public class TrainingExerciseSetRepository implements PanacheRepository<TrainingExerciseSet> {

}
