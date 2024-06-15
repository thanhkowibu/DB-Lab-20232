package com.huy.airbnbserver.system;

import com.huy.airbnbserver.admin.FakerService;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
@AllArgsConstructor
public class DBInit implements CommandLineRunner {

    private final FakerService fakerService;

    @Override
    public void run(String... args) {

//        for (int i = 0; i < 2000; i++) {
//            try {
//                fakerService.generateProperty();
//            } catch (Exception ex) {
//                ex.printStackTrace();
//            }
//        }
//
//        for (int i = 0; i < 3000; i++) {
//            try {
//                fakerService.generateUser();
//            } catch (Exception ex) {
//                ex.printStackTrace();
//            }
//        }
//
//        for (int i = 0; i < 15000; i++) {
//            try {
//                fakerService.generateBooking();
//            } catch (Exception ex) {
//                ex.printStackTrace();
//            }
//        }
//        fakerService.generateReviewsForCheckOutBookings();
    }
}
