package at.htl.resource;

import at.htl.dto.ActiveTrainingDto;
import at.htl.dto.StartTrainingDto;
import at.htl.dto.TrainingToPlanDto;
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
    @Path("/user/{id}")
    public List<Trainings> getAllTrainingsOfUser(@PathParam("id") long id) {
        return trainingsRepository.getTrainingsOfUser(id);
    }

    @GET
    @Path("{id}")
    public Trainings getTrainingById(@PathParam("id") long id) {
        System.out.println(id);
        return trainingsRepository.findById(id);
    }

    @GET
    @Path("active/{id}")
    public Boolean isTrainingActive(@PathParam("id") long id) {
        return trainingsRepository.isTrainingActive(id);
    }

    @GET
    @Path("active/user/{id}")
    public Trainings activeTrainingOfUser(@PathParam("id") long id) {
        return trainingsRepository.activeTrainingOfUser(id);
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

    @Transactional
    @PATCH
    @Path("/{id}/to-plan")
    @Produces(MediaType.APPLICATION_JSON)
    public Boolean changeToPlan(TrainingToPlanDto data, @PathParam("id") long id) {
        return trainingsRepository.toPlan(id, data.title);
    }

}
