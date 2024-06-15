package com.huy.airbnbserver.admin;

import com.github.javafaker.Faker;
import com.huy.airbnbserver.booking.*;
import com.huy.airbnbserver.notification.model.NotificationPreferences;
import com.huy.airbnbserver.properties.Property;
import com.huy.airbnbserver.properties.PropertyRepository;
import com.huy.airbnbserver.properties.PropertyService;
import com.huy.airbnbserver.properties.enm.Area;
import com.huy.airbnbserver.properties.enm.Category;
import com.huy.airbnbserver.properties.enm.Tag;
import com.huy.airbnbserver.review.Review;
import com.huy.airbnbserver.review.ReviewRepository;
import com.huy.airbnbserver.user.UserRepository;
import com.huy.airbnbserver.user.model.User;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
@AllArgsConstructor
public class FakerService {
    private final Faker faker;
    private final BookingRepository bookingRepository;
    private final PropertyService propertyService;
    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ReviewRepository reviewRepository;
    private static final Integer adminId = 1;

    @Transactional
    public void generateUser() {
        // Generate random created_at date within the past year
        LocalDateTime createdAtLocalDateTime = LocalDateTime.now().minusDays(faker.number().numberBetween(1, 365));
        Date createdAtDate = Date.from(createdAtLocalDateTime.atZone(ZoneId.systemDefault()).toInstant());

        // Create a new User object
        User user = new User();
        user.setFirstname(faker.name().firstName());
        user.setLastname(faker.name().lastName());
        user.setEmail(faker.internet().emailAddress());
        user.setPassword(passwordEncoder.encode("12345678"));
        user.setEnabled(true);
        user.setRoles("user");
        user.setCreatedAt(createdAtDate);

        // Set notification preferences
        NotificationPreferences notificationPreferences = new NotificationPreferences();
        notificationPreferences.setNotifyOnSpecialOffers(true);
        notificationPreferences.setNotifyOnHostedPropertyRating(true);
        notificationPreferences.setNotifyOnHostedPropertyBooked(true);
        notificationPreferences.setNotifyOnHostedPropertyLike(true);
        notificationPreferences.setNotifyOnBookingStatusChange(true);
        notificationPreferences.ofUser(user);

        // Save the user using the repository
        userRepository.save(user);
    }


    @Transactional
    public void generateBooking() {
        // Create a new Booking object
        Booking fakeBooking = new Booking();

        // Generate random created_at date within the past year
        LocalDateTime createdAtLocalDateTime = LocalDateTime.now().minusDays(faker.number().numberBetween(15, 365));
        Date createdAtDate = Date.from(createdAtLocalDateTime.atZone(ZoneId.systemDefault()).toInstant());
        fakeBooking.setCreatedAt(createdAtDate);

        // Generate random check-in and check-out dates
        LocalDate checkInLocalDate = createdAtLocalDateTime.toLocalDate().plusDays(faker.number().numberBetween(1, 10));
        LocalDate checkOutLocalDate = checkInLocalDate.plusDays(faker.number().numberBetween(1, 15));

        // Convert LocalDate to Date
        Date checkInDate = Date.from(checkInLocalDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date checkOutDate = Date.from(checkOutLocalDate.atStartOfDay(ZoneId.systemDefault()).toInstant());

        fakeBooking.setCheckInDate(checkInDate);
        fakeBooking.setCheckOutDate(checkOutDate);
        fakeBooking.setStatus(BookingStatus.PENDING.name());
        fakeBooking.setConfirm(true);
        fakeBooking.setIsCheckedOut(false);
        User user = new User();
        user.setId(adminId);
        fakeBooking.setUser(user);

        // Generate random number of adults, children, and pets
        fakeBooking.setNumAlduts(faker.number().numberBetween(1, 5));
        fakeBooking.setNumChildrens(faker.number().numberBetween(0, 3));
        fakeBooking.setNumPets(faker.number().numberBetween(0, 2));

        // Generate random nightly fee, cleaning fee, and service fee
        fakeBooking.setNightlyFee(BigDecimal.valueOf(faker.number().randomDouble(2, 50, 300)));
        fakeBooking.setCleanFee(BigDecimal.valueOf(faker.number().randomDouble(2, 0, 100)));
        fakeBooking.setServiceFee(BigDecimal.valueOf(faker.number().randomDouble(2, 10, 50)));

        List<Long> propertyIds = propertyRepository.findAll()
                .stream()
                .map(Property::getId)
                .toList();
        Long propertyId = propertyIds.get(faker.random().nextInt(propertyIds.size()));
        Property property = propertyRepository.findById(propertyId).orElseThrow(
                () -> new RuntimeException("Property not found")
        );
        fakeBooking.addProperty(property);

        List<BookingLog> bookingLogs = generateBookingLogs(fakeBooking, createdAtLocalDateTime);
        fakeBooking.setLogs(bookingLogs);

        bookingRepository.save(fakeBooking);
    }

    private List<BookingLog> generateBookingLogs(Booking booking, LocalDateTime eventStartDate) {
        List<BookingLog> logs = new ArrayList<>();

        // Event sequence: CREATED -> CONFIRMED/REJECTED -> SUCCESS -> CHECKED_OUT/NO_SHOW/CANCEL
        logs.add(createBookingLog(booking, BookingLogDes.CREATED, eventStartDate));
        eventStartDate = eventStartDate.plusMinutes(faker.number().numberBetween(1, 60));

        boolean isConfirmed = faker.random().nextBoolean();
        if (isConfirmed) {
            logs.add(createBookingLog(booking, BookingLogDes.CONFIRMED, eventStartDate));
            eventStartDate = eventStartDate.plusMinutes(faker.number().numberBetween(1, 60));

            // Determine the final state based on specified percentages
            double randomValue = faker.random().nextDouble();

            if (randomValue < 0.25) {
                logs.add(createBookingLog(booking, BookingLogDes.CANCEL, eventStartDate));
                booking.setStatus(BookingStatus.CANCEL.name());
            } else {
                logs.add(createBookingLog(booking, BookingLogDes.SUCCESS, eventStartDate));
                booking.setStatus(BookingStatus.SUCCESS.name());
                eventStartDate = eventStartDate.plusMinutes(faker.number().numberBetween(1, 60));

                if (randomValue < 0.5) {
                    logs.add(createBookingLog(booking, BookingLogDes.NO_SHOW, eventStartDate));
                    booking.setStatus(BookingStatus.NO_SHOW.name());
                } else if (randomValue < 0.75) {
                    // Booking is in SUCCESS state, waiting to be checked out
                    booking.setStatus(BookingStatus.SUCCESS.name());
                } else {
                    logs.add(createBookingLog(booking, BookingLogDes.CHECKED_OUT, eventStartDate));
                    booking.setStatus(BookingStatus.CHECK_OUT.name());
                    booking.setIsCheckedOut(true);
                }
            }
        } else {
            logs.add(createBookingLog(booking, BookingLogDes.REJECTED, eventStartDate));
            booking.setStatus(BookingStatus.REJECTED.name());
        }

        return logs;
    }

    private BookingLog createBookingLog(Booking booking, BookingLogDes logDescription, LocalDateTime eventTimestamp) {
        BookingLog log = new BookingLog();
        log.setBooking(booking);
        log.setEventType(logDescription.name());
        log.setEventTimestamp(Date.from(eventTimestamp.atZone(ZoneId.systemDefault()).toInstant()));
        log.setDescription(logDescription.getDescription());

        return log;
    }

    @Transactional
    public void generateProperty() throws IOException {
        Property fakeProperty = new Property();

        // Generate random property details
        fakeProperty.setNightlyPrice(BigDecimal.valueOf(faker.number().randomDouble(2, 50, 300)));
        fakeProperty.setName(faker.address().streetName());
        fakeProperty.setMaxGuests(faker.number().numberBetween(1, 10));
        fakeProperty.setNumBeds(faker.number().numberBetween(1, 5));
        fakeProperty.setNumBedrooms(faker.number().numberBetween(1, 5));
        fakeProperty.setNumBathrooms(faker.number().numberBetween(1, 5));
        fakeProperty.setDescription(faker.lorem().paragraph(3));
        fakeProperty.setAddressLine(faker.address().fullAddress());

        // Generate reasonable longitude and latitude for a continent (not in the ocean)
        Area selectedArea = faker.options().option(Area.class);
        double longitude = generateRandomDouble(selectedArea.getMinLongitude(), selectedArea.getMaxLongitude());
        double latitude = generateRandomDouble(selectedArea.getMinLatitude(), selectedArea.getMaxLatitude());
        fakeProperty.setLongitude(BigDecimal.valueOf(longitude));
        fakeProperty.setLatitude(BigDecimal.valueOf(latitude));

        // Generate random categories
        List<Category> allCategories = Arrays.asList(Category.values());
        Collections.shuffle(allCategories);
        Set<Category> categories = new HashSet<>(allCategories.subList(0, faker.number().numberBetween(1, allCategories.size())));
        fakeProperty.setCategories(categories);

        // Generate a random tag
        Tag tag = faker.options().option(Tag.class);
        fakeProperty.setTag(tag);


        List<MultipartFile> fakeImage = new ArrayList<>();
        Set<Integer> uniqueFileNumbers = new HashSet<>();
        while (uniqueFileNumbers.size() < 5) {
            uniqueFileNumbers.add(faker.number().numberBetween(1, 11));
        }

        for (Integer number : uniqueFileNumbers) {
            fakeImage.add(getMultipartFile(getFilepath(number, tag.name())));
        }

        // Save the Property using the repository
        propertyService.save(fakeProperty, adminId, fakeImage);
    }

    @Transactional
    public void generateReviewsForCheckOutBookings() {
        List<Booking> checkOutBookings = bookingRepository.findAllCheckOut();

        for (Booking booking : checkOutBookings) {
            Review fakeReview = new Review();
            String content = faker.lorem().paragraph(30);
            fakeReview.setContent(content);

            // Generate a random rating between 1 and 5
            Integer rating = faker.number().numberBetween(1, 6);
            fakeReview.setRating(rating);
            fakeReview.setIs_recommend(faker.random().nextBoolean());

            fakeReview.registerBooking(booking); // Associate review with booking

            reviewRepository.save(fakeReview); // Save the review
        }
    }


    private static MultipartFile getMultipartFile(String filePath) throws IOException {
        File file = new File(filePath);
        byte[] content = Files.readAllBytes(file.toPath());

        return new CustomMultipartFile(
                file.getName(),
                file.getName(),
                Files.probeContentType(file.toPath()),
                content
        );
    }

    private static String getFilepath(Integer index, String tag) {
        return  "C:/Users/PC/Downloads/airbnb-images/"+tag+"/"+index+".jpg";
    }

    private double generateRandomDouble(double min, double max) {
        return min + (max - min) * faker.random().nextDouble();
    }
}
