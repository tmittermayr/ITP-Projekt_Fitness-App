package at.htl.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class Users extends PanacheEntity {
    public String firstname;
    public String lastname;
    public String email;
    public String password;
}
