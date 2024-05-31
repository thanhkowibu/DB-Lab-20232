package com.huy.airbnbserver.system;


import com.huy.airbnbserver.admin.FakerService;
import com.huy.airbnbserver.properties.PropertyService;
import com.huy.airbnbserver.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class DBInit implements CommandLineRunner {

    private final FakerService fakerService;

    @Override
    public void run(String... args) throws Exception {
//        for (int i = 0; i < 300; i++) {
//            fakerService.generateProperty();
//        }
//
//        for (int i = 0; i < 2000; i++) {
//            fakerService.generateComment();
//        }
//
//        for (int i = 0; i < 50; i++) {
//            fakerService.generateBooking();
//        }
    }
}
