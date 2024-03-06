package at.htl.repository;

import at.htl.dto.AddSetToExerciseDto;
import at.htl.model.Set;
import at.htl.model.TrainingExercise;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SetRepository implements PanacheRepository<Set> {

    public boolean addSet(AddSetToExerciseDto data) {
        try {
            TrainingExerciseRepository ter = new TrainingExerciseRepository();
            TrainingExercise te = ter.findById(data.training_id);

            System.out.println(data.training_id);
            System.out.println(te.getTraining());

            Set set = new Set(data.index, data.weight, data.reps, data.attribute, te);
            persist(set);
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }
}
