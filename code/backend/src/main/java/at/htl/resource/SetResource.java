package at.htl.resource;

import at.htl.dto.AddExerciseToTrainingDto;
import at.htl.dto.AddSetToExerciseDto;
import at.htl.model.Set;
import at.htl.model.Trainings;
import at.htl.repository.SetRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/api/training/exercise/set")
public class SetResource {

    @Inject
    SetRepository setRepository;

    @Transactional
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public boolean addSetToTraining(AddSetToExerciseDto data) {
        return setRepository.addSet(data);
    }

}
