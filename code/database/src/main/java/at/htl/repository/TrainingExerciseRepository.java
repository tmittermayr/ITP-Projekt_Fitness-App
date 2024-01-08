package at.htl.repository;

import at.htl.model.TrainingExercise;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class TrainingExerciseRepository implements PanacheRepository<TrainingExercise> {
}
