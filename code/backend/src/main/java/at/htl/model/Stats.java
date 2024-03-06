package at.htl.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

@Entity
public class Stats extends PanacheEntity {
    @Column
    private String title;

    @Column
    private String description;

    @Column
    private int value;

    @ManyToOne
    Users user;
}
