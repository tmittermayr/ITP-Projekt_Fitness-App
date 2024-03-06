package at.htl.resource;

import at.htl.dto.LoginUserDto;
import at.htl.model.Users;
import at.htl.repository.UserRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.UriInfo;

import java.net.URI;
import java.util.List;

@Path("/api/users")
public class UserResource {
    @Inject
    UserRepository userRepository;

    @Transactional
    @POST
    @Path("/register")
    @Produces(MediaType.APPLICATION_JSON)
    public URI createUser(Users user, @Context UriInfo uriInfo) {
        userRepository.createUser(user);
        return uriInfo.getAbsolutePathBuilder().path(Long.toString(user.id)).build();
    }

    @Transactional
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    public void updateUser(Users user) {
        userRepository.persist(user);
    }

    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    public Long loginUser(LoginUserDto loginData) {
        Long test = userRepository.loginUser(loginData);
        return test;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Users> getUsers() {
        return userRepository.listAll();
    }

    @GET
    @Path("/top")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Users> getTopUsers() {
        return userRepository.getTopUsers();
    }

    @GET
    @Path("/{id}")
    public Users getUserById(@PathParam("id") Long id) {
        return userRepository.findById(id);
    }

    @GET
    @Path("/email/{email}")
    public Users getUserByEmail(@PathParam("email") String email) {
        return userRepository.findByEmail(email);
    }

    @POST
    @Transactional
    public Users createUser(Users user) {
        userRepository.persist(user);
        return user;
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Users updateUser(@PathParam("id") Long id, Users updatedUser) {
        Users user = userRepository.findById(id);
        if (user != null) {
            // Update user fields as needed
            user.firstname = updatedUser.firstname;
            user.lastname = updatedUser.lastname;
            user.email = updatedUser.email;
            user.password = updatedUser.password;

            userRepository.persist(user);
        }
        return user;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void deleteUser(@PathParam("id") Long id) {
        userRepository.deleteById(id);
    }
}
