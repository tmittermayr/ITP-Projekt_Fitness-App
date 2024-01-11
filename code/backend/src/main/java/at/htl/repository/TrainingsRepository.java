package at.htl.repository;

import at.htl.dto.StartTrainingDto;
import at.htl.model.Trainings;
import at.htl.model.Users;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@ApplicationScoped
public class TrainingsRepository implements PanacheRepository<Trainings> {

    @Inject
    EntityManager entityManager;

    public List<Trainings> getTrainingsOfUser(long id) {
        TypedQuery<Trainings> query = getEntityManager().createQuery(
                "select t from Trainings t where t.user.id = :id", Trainings.class
        );
        query.setParameter("id", id);

        List<Trainings> trainings = query.getResultList();

        return trainings;
    }

    public Trainings startTraining(StartTrainingDto data) {
        UserRepository up = new UserRepository();
        Users user = up.findById(data.id);

        Trainings training = new Trainings(data.title, new Date(),null, false, user);

        persist(training);

        return training;
    }

    public Boolean isTrainingActive(long id) {
        TypedQuery<Trainings> query = getEntityManager().createQuery(
                "select t from Trainings t where t.user.id = :id and t.enddatetime is null", Trainings.class
        );
        query.setParameter("id", id);

        List<Trainings> trainings = query.getResultList();

        if(trainings.isEmpty()) {
            return false;
        }
        return true;
    }

    public boolean stopTraining(long id) {
    }
}
