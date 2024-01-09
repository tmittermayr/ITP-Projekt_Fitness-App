package at.htl.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Exercise extends PanacheEntity {
    public String name;
    public String target;
    public String bodyPart;
    public String equipment;
    public String gifId;
}
