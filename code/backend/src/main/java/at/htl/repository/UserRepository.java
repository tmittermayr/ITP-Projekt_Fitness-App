package at.htl.repository;

import at.htl.dto.LoginUserDto;
import at.htl.model.Users;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

import org.bouncycastle.util.encoders.Hex;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class UserRepository implements PanacheRepository<Users> {
    @Inject
    EntityManager em;

    public void createUser(Users user)  {
        try {
            user.password= hash(user.password);
            persist(user);
        } catch (Exception e){
        }
    }

    public Long loginUser(LoginUserDto loginData) {
        TypedQuery<Users> query = getEntityManager().createQuery(
                "select c from Users c where c.email = :email", Users.class
        );
        query.setParameter("email", loginData.email);
        List<Users> result = query.getResultList();

        try {
            String hashedPassword = hash(loginData.password);

            Users[] customers = result.toArray(new Users[0]);
            System.out.println(customers[0].password);
            System.out.println(hashedPassword);
            if (customers[0].password.equals(hashedPassword)){
                return customers[0].id;
            } else {
                return null;
            }

        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    public Users findByEmail(String email) {
        String jpql = "Select c from Users c where c.email =: email";
        TypedQuery<Users> query = em.createQuery(jpql,Users.class);
        query.setParameter("email",email);
        return query.getSingleResult();
    }

    private String hash(String data) {
        MessageDigest digest = null;
        try {
            digest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        byte[] hash = digest.digest(
                data.getBytes(StandardCharsets.UTF_8));
        return new String(Hex.encode(hash));
    }

    public List<Users> getTopUsers() {
        String jpql = "Select c from Users c";
        TypedQuery<Users> query = em.createQuery(jpql,Users.class);
        List<Users> a = query.getResultList();
        List<Users> b = a.stream().limit(3).collect(Collectors.toList());
        return b;
    }
}
