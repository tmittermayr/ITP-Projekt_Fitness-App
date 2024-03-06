package at.htl.repository;

import at.htl.dto.AddExerciseToTrainingDto;
import at.htl.model.Exercise;
import at.htl.model.TrainingExercise;
import at.htl.model.Trainings;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.TypedQuery;

@ApplicationScoped
public class TrainingExerciseRepository implements PanacheRepository<TrainingExercise> {
    public boolean addExercise(AddExerciseToTrainingDto data) {
        try {
            Trainings training = getActiveTraining(data.user_id);

            ExerciseRepository ep = new ExerciseRepository();
            Exercise exercise = ep.findById(data.exercise_id);

            TrainingExercise te = new TrainingExercise(training, exercise);
            persist(te);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private Trainings getActiveTraining(long id) {
        TypedQuery<Trainings> query = getEntityManager().createQuery(
                "select t from Trainings t where t.user.id = :id and t.enddatetime is null", Trainings.class
        );
        query.setParameter("id", id);

        return query.getSingleResult();
    }
}
