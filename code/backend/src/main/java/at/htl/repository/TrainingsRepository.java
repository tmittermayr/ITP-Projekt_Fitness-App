package at.htl.repository;

import at.htl.model.Trainings;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class TrainingsRepository implements PanacheRepository<Trainings> {
}
