package at.htl.resource;

import at.htl.dto.StartTrainingDto;
import at.htl.model.Exercise;
import at.htl.model.Trainings;
import at.htl.model.Users;
import at.htl.repository.TrainingsRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.UriInfo;

import java.net.URI;
import java.util.List;

@Path("/api/trainings")
public class TrainingsResource {

    @Inject
    TrainingsRepository trainingsRepository;

    @GET
    @Path("{id}")
    public List<Trainings> getAllTrainingsOfUser(@PathParam("id") long id) {
        System.out.println(id);
        return trainingsRepository.getTrainingsOfUser(id);
    }

    @GET
    @Path("active/{id}")
    public Boolean isTrainingActive(@PathParam("id") long id) {
        return trainingsRepository.isTrainingActive(id);
    }

    @Transactional
    @POST
    @Path("/start")
    @Produces(MediaType.APPLICATION_JSON)
    public Trainings createTraining(StartTrainingDto training) {
        return trainingsRepository.startTraining(training);
    }

    @Transactional
    @PATCH
    @Path("/stop/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public boolean stopTraining(@PathParam("id") long id) {
        return trainingsRepository.stopTraining(id);
    }

}
