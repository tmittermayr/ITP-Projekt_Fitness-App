package at.htl.resource;

import at.htl.dto.AddExerciseToTrainingDto;
import at.htl.dto.StartTrainingDto;
import at.htl.model.Exercise;
import at.htl.model.Trainings;
import at.htl.repository.TrainingExerciseSetRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/api/training/exercise/set")
public class TrainingExerciseSetResource {
}
