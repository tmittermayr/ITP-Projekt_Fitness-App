package at.htl.repository;

import at.htl.model.Stats;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StatsRepository  implements PanacheRepository<Stats> {
}
