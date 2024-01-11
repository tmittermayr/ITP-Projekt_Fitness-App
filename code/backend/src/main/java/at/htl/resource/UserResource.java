package at.htl.resource;

import at.htl.dto.LoginUserDto;
import at.htl.model.Users;
import at.htl.repository.UserRepository;
import io.vertx.ext.auth.User;
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
        System.out.println("asdf");
        userRepository.createUser(user);
        return uriInfo.getAbsolutePathBuilder().path(Long.toString(user.id)).build();
    }

    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    public Long loginUser(LoginUserDto loginData) {
        System.out.println(loginData.email);
        Long test = userRepository.loginUser(loginData);
        System.out.println("res: " + test);
        return test;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Users> getCustomers() {
        return userRepository.listAll();
    }

    @GET
    @Path("/{id}")
    public Users getCustomerById(@PathParam("id") Long id) {
        return userRepository.findById(id);
    }

    @GET
    @Path("/email/{email}")
    public Users getCustomerByEmail(@PathParam("email") String email) {
        return userRepository.findByEmail(email);
    }

    @POST
    @Transactional
    public Users createCustomer(Users user) {
        userRepository.persist(user);
        return user;
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Users updateCustomer(@PathParam("id") Long id, Users updatedCustomer) {
        Users customer = userRepository.findById(id);
        if (customer != null) {
            // Update user fields as needed
            customer.firstname = updatedCustomer.firstname;
            customer.lastname = updatedCustomer.lastname;
            customer.email = updatedCustomer.email;
            customer.password = updatedCustomer.password;

            userRepository.persist(customer);
        }
        return customer;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void deleteUser(@PathParam("id") Long id) {
        userRepository.deleteById(id);
    }
}
