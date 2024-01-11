package at.htl.resource;

import at.htl.model.Exercise;
import at.htl.model.Users;
import at.htl.repository.ExerciseRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

import java.util.List;

@Path("/api/exercise")
public class ExerciseResource {

    @Inject
    ExerciseRepository exerciseRepository;

    @GET
    @Path("/get-all")
    public List<Exercise> getAllExercises() {
        return exerciseRepository.listAll();
    }

    @GET
    @Path("{id}")
    public Exercise getExerciseById(@PathParam("id") long id) {
        return exerciseRepository.findById(id);
    }

}
