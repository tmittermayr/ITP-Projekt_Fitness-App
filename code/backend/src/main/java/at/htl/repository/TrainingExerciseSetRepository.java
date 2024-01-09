package at.htl.repository;

import at.htl.model.TrainingExerciseSet;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class TrainingExerciseSetRepository implements PanacheRepository<TrainingExerciseSet> {
}
