package com.helios.app.config;

import com.helios.app.model.User;
import com.helios.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        // Esta es la contraseña que VAMOS a usar. ¡Garantizado!
        String newPassword = "admin";

        // Buscamos al usuario 'usuario'
        userRepository.findByUsername("usuario").ifPresent(user -> {
            System.out.println("----------------------------------------------------");
            System.out.println("¡¡¡ATENCIÓN!!! Reseteando la contraseña para el usuario: " + user.getUsername());
            
            // Encriptamos la nueva contraseña
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            user.setPassword(encoder.encode(newPassword));
            
            // Guardamos el usuario con la nueva contraseña
            userRepository.save(user);
            
            System.out.println("Contraseña reseteada exitosamente a: " + newPassword);
            System.out.println("----------------------------------------------------");
        });
    }
}