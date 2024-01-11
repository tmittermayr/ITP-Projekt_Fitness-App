package at.htl.resource;

import at.htl.dto.AddExerciseToTrainingDto;
import at.htl.model.Trainings;
import at.htl.repository.TrainingExerciseRepository;
import at.htl.repository.TrainingExerciseSetRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/api/training/exercise")
public class TrainingExerciseResource {
    @Inject
    TrainingExerciseRepository trainingsExerciseRepository;

    @Transactional
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Trainings addExerciseToTraining(AddExerciseToTrainingDto data) {
        return trainingsExerciseRepository.addExercise(data);
    }
}
