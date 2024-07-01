CREATE SCHEMA IF NOT EXISTS airbnb_db;

USE airbnb_db;

-- Table definitions without foreign key constraints

CREATE TABLE user_account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at DATETIME(6) NOT NULL,
    dob DATETIME(6) NULL,
    email VARCHAR(200) NOT NULL,
    enabled BIT NOT NULL,
    firstname VARCHAR(200) NOT NULL,
    gender VARCHAR(255) NULL,
    is_banned BIT NOT NULL,
    lastname VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    phone_number VARCHAR(11) NULL,
    roles VARCHAR(100) NOT NULL,
    updated_at DATETIME(6) NULL,
    avatar_id BIGINT NULL,
    CONSTRAINT UK_user_account_email UNIQUE (email)
);

CREATE INDEX email_index ON user_account (email);

CREATE TABLE property (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    address_line VARCHAR(500) NOT NULL,
    created_at DATETIME(6) NOT NULL,
    description VARCHAR(2000) NOT NULL,
    latitude DECIMAL(10, 2) NOT NULL,
    longitude DECIMAL(10, 2) NOT NULL,
    max_guests INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    nightly_price DECIMAL(38, 2) NOT NULL,
    num_bathrooms INT NOT NULL,
    num_bedrooms INT NOT NULL,
    num_beds INT NOT NULL,
    tag ENUM('BEACHFRONT', 'CASTLE', 'CAVE', 'ROMANTIC_GETAWAY', 'LUXURY', 'COZY', 'SECLUDED', 'HOUSEBOAT', 'TENT', 'TOWER', 'WINDMILL', 'MOUNTAIN_VIEW', 'LAKEFRONT', 'SKI_IN_SKI_OUT', 'OCEAN_VIEW', 'TREEHOUSE', 'COTTAGE', 'CABIN', 'FARMS', 'VILLA') NOT NULL,
    updated_at DATETIME(6) NOT NULL,
    host_id INT NOT NULL,
    average_rating DECIMAL(3, 2) DEFAULT 0.00 NULL,
    CHECK (max_guests >= 0),
    CHECK (nightly_price >= 10),
    CHECK (num_bathrooms >= 0),
    CHECK (num_bedrooms >= 0),
    CHECK (num_beds >= 0)
);

CREATE INDEX idx_property_host_id ON property (host_id);
CREATE INDEX idx_property_nightly_price ON property (nightly_price);
CREATE INDEX idx_property_updated_at ON property (updated_at);

CREATE TABLE booking (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    clean_fee DECIMAL(38, 2) NOT NULL,
    created_at DATETIME(6) NOT NULL,
    is_checked_out BIT NOT NULL,
    is_confirm BIT NOT NULL,
    nightly_fee DECIMAL(38, 2) NOT NULL,
    num_adults INT NOT NULL,
    num_children INT NOT NULL,
    num_pets INT NOT NULL,
    service_fee DECIMAL(38, 2) NOT NULL,
    status VARCHAR(255) NOT NULL,
    property_id BIGINT NULL,
    user_id INT NULL,
    CHECK (clean_fee >= 0),
    CHECK (nightly_fee >= 0),
    CHECK (num_adults >= 0),
    CHECK (num_children >= 0),
    CHECK (num_pets >= 0),
    CHECK (service_fee >= 0),
    CHECK (check_in_date < check_out_date)
);

CREATE INDEX idx_booking_created_at ON booking (created_at);
CREATE INDEX idx_booking_property_id ON booking (property_id);
CREATE INDEX idx_booking_user_id ON booking (user_id);

CREATE TABLE booking_log (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    event_timestamp DATETIME(6) NULL,
    event_type VARCHAR(255) NOT NULL,
    booking_id BIGINT NULL
);

CREATE TABLE image (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NULL,
    url VARCHAR(255) NULL,
    property_id BIGINT NULL
);

CREATE INDEX idx_image_property_id ON image (property_id);

CREATE TABLE liked_property (
    user_id INT NOT NULL,
    property_id BIGINT NOT NULL,
    CONSTRAINT UK_liked_property UNIQUE (user_id, property_id)
);

CREATE TABLE notification (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    created_at DATETIME(6) NOT NULL,
    is_read BIT NOT NULL,
    message VARCHAR(255) NOT NULL,
    reference_id BIGINT NOT NULL,
    type VARCHAR(255) NOT NULL,
    user_id INT NULL
);

CREATE TABLE notification_preferences (
    user_id INT NOT NULL PRIMARY KEY,
    notify_on_booking_status_change BIT NOT NULL,
    notify_on_hosted_property_booked BIT NOT NULL,
    notify_on_hosted_property_like BIT NOT NULL,
    notify_on_hosted_property_rating BIT NOT NULL,
    notify_on_special_offers BIT NOT NULL
);

CREATE TABLE property_categories (
    property_id BIGINT NOT NULL,
    categories ENUM('WIFI', 'TV', 'KITCHEN', 'AIR_CONDITIONING', 'POOL', 'FREE_PARKING', 'BREAKFAST', 'WASHER', 'DRYER', 'HEATING', 'LAPTOP_FRIENDLY_WORKSPACE', 'IRON', 'HAIR_DRYER', 'SMOKE_DETECTOR', 'CARBON_MONOXIDE_DETECTOR', 'FIRE_EXTINGUISHER', 'FIRST_AID_KIT', 'ESSENTIALS', 'SHAMPOO', 'HANGERS', 'PIANO') NOT NULL,
    PRIMARY KEY (property_id, categories)
);

CREATE TABLE report (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    created_at DATETIME(6) NOT NULL,
    detail VARCHAR(255) NOT NULL,
    is_resolved BIT NOT NULL,
    issue ENUM('INAPPROPRIATE_CONTENT_OR_PHOTOS', 'MISLEADING_CONTENT_OR_PHOTOS', 'NOT_A_REAL_PLACE_TO_STAY', 'SCAM_OR_PHISHING_ATTEMPTS', 'VIOLATION_OF_POLICIES', 'FAKE_REVIEWS_OR_RATINGS', 'HARASSMENT_OR_HATE_SPEECH', 'COPYRIGHT_OR_TRADEMARK_INFRINGEMENT', 'PRIVACY_VIOLATION', 'TECHNICAL_ISSUES') NOT NULL,
    reported_user_id INT NOT NULL,
    user_id INT NOT NULL
);

CREATE TABLE review (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(2000) NOT NULL,
    created_at DATETIME(6) NOT NULL,
    is_recommend BIT NOT NULL,
    rating INT NOT NULL,
    updated_at DATETIME(6) NULL,
    booking_id BIGINT NULL,
    CONSTRAINT UK_review_booking_id UNIQUE (booking_id),
    CHECK ((rating <= 5) AND (rating >= 1))
);

CREATE INDEX idx_review_booking_id ON review (booking_id);

CREATE TABLE role_request (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    created_at DATETIME(6) NOT NULL,
    requested_role VARCHAR(255) NOT NULL,
    reviewed_at DATETIME(6) NULL,
    status VARCHAR(255) NOT NULL,
    reviewed_by INT NULL,
    user_id INT NULL
);

CREATE TABLE token (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at DATETIME(6) NULL,
    expires_at DATETIME(6) NULL,
    token VARCHAR(255) NULL,
    user_id INT NOT NULL
);

-- Add foreign key constraints

ALTER TABLE user_account ADD CONSTRAINT UK_user_account_avatar_id UNIQUE (avatar_id);

ALTER TABLE user_account ADD CONSTRAINT FK_user_account_avatar_id FOREIGN KEY (avatar_id) REFERENCES image (id);

ALTER TABLE property ADD CONSTRAINT FK_property_host_id FOREIGN KEY (host_id) REFERENCES user_account (id);

ALTER TABLE booking ADD CONSTRAINT FK_booking_user_id FOREIGN KEY (user_id) REFERENCES user_account (id);

ALTER TABLE booking ADD CONSTRAINT FK_booking_property_id FOREIGN KEY (property_id) REFERENCES property (id);

ALTER TABLE booking_log ADD CONSTRAINT FK_booking_log_booking_id FOREIGN KEY (booking_id) REFERENCES booking (id);

ALTER TABLE image ADD CONSTRAINT FK_image_property_id FOREIGN KEY (property_id) REFERENCES property (id);

ALTER TABLE liked_property ADD CONSTRAINT FK_liked_property_user_id FOREIGN KEY (user_id) REFERENCES user_account (id);

ALTER TABLE liked_property ADD CONSTRAINT FK_liked_property_property_id FOREIGN KEY (property_id) REFERENCES property (id);

ALTER TABLE notification ADD CONSTRAINT FK_notification_user_id FOREIGN KEY (user_id) REFERENCES user_account (id);

ALTER TABLE notification_preferences ADD CONSTRAINT FK_notification_preferences_user_id FOREIGN KEY (user_id) REFERENCES user_account (id);

ALTER TABLE property_categories ADD CONSTRAINT FK_property_categories_property_id FOREIGN KEY (property_id) REFERENCES property (id);

ALTER TABLE report ADD CONSTRAINT FK_report_reported_user_id FOREIGN KEY (reported_user_id) REFERENCES user_account (id);

ALTER TABLE report ADD CONSTRAINT FK_report_user_id FOREIGN KEY (user_id) REFERENCES user_account (id);

ALTER TABLE review ADD CONSTRAINT FK_review_booking_id FOREIGN KEY (booking_id) REFERENCES booking (id);

ALTER TABLE role_request ADD CONSTRAINT FK_role_request_user_id FOREIGN KEY (user_id) REFERENCES user_account (id);

ALTER TABLE role_request ADD CONSTRAINT FK_role_request_reviewed_by FOREIGN KEY (reviewed_by) REFERENCES user_account (id);

ALTER TABLE token ADD CONSTRAINT FK_token_user_id FOREIGN KEY (user_id) REFERENCES user_account (id);

DELIMITER //
CREATE TRIGGER after_review_insert
    AFTER INSERT ON review
    FOR EACH ROW
BEGIN
    DECLARE new_avg DECIMAL(3,2);
    DECLARE property_id INT;
    -- Find the property_id from the booking table
    SELECT b.property_id INTO property_id FROM booking b WHERE b.id = NEW.booking_id;
    -- Calculate the new average rating
    SELECT AVG(r.rating) INTO new_avg FROM review r INNER JOIN booking b ON r.booking_id = b.id WHERE b.property_id = property_id;
    -- Update the property table
    UPDATE property SET average_rating = new_avg WHERE id = property_id;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE UpdateBookingStatusAndLog(
    IN booking_id BIGINT,
    IN new_status VARCHAR(255),
    IN log_description VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            ROLLBACK;
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'An error occurred, transaction rolled back';
        END;

    START TRANSACTION;

    -- Update the existing booking status and conditionally set is_checked_out
    IF new_status = 'CHECK_OUT' THEN
        UPDATE booking
        SET status = new_status,
            is_checked_out = TRUE
        WHERE id = booking_id;
    ELSE
        UPDATE booking
        SET status = new_status
        WHERE id = booking_id;
    END IF;

    -- Insert a log entry with timezone conversion for event_timestamp
    INSERT INTO booking_log (description, event_timestamp, event_type, booking_id)
    VALUES (
               log_description,
               CONVERT_TZ(CURRENT_TIMESTAMP, '+00:00', '+07:00'),
               new_status,
               booking_id
           );

    COMMIT;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE `ReviewRoleRequestAndSetPrivilege`(
    IN `p_roleRequestId` BIGINT,
    IN `p_userId` INT,
    IN `p_isConfirm` BIT,
    IN `p_reviewerId` INT
)
BEGIN
    DECLARE v_status VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            ROLLBACK;
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'An error occurred, transaction rolled back';
        END;

    START TRANSACTION;

    IF p_isConfirm THEN
        SET v_status = 'accept';
        -- Update user_account roles to include 'host'
        UPDATE user_account SET roles = 'user host' WHERE id = p_userId;
    ELSE
        SET v_status = 'reject';
    END IF;

    -- Update the role_request with review details
    UPDATE role_request SET
                            reviewed_by = p_reviewerId,
                            reviewed_at = CURRENT_TIMESTAMP,
                            status = v_status
    WHERE id = p_roleRequestId;

    COMMIT;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE `ResolveReportAndConditionalBanUser`(
    IN `p_reportId` BIGINT,
    IN `p_banUser` BOOLEAN
)
BEGIN
    -- Declare variables at the beginning
    DECLARE v_reportedUserId INT;
    DECLARE v_isResolved BOOLEAN;
    DECLARE v_isAdmin BOOLEAN;
    DECLARE v_isBanned BOOLEAN;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            ROLLBACK;
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'An error occurred, transaction rolled back';
        END;

    START TRANSACTION;

    SELECT is_resolved, reported_user_id INTO v_isResolved, v_reportedUserId FROM report WHERE id = p_reportId;

    IF v_isResolved THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This report has already been resolved';
    ELSE
        UPDATE report SET is_resolved = TRUE WHERE id = p_reportId;

        -- If banUser is true, proceed with banning logic
        IF p_banUser THEN
            -- Check if the reported user is an admin or already banned
            SELECT FIND_IN_SET('admin', REPLACE(roles, ' ', ',')) INTO v_isAdmin FROM user_account WHERE id = v_reportedUserId;
            SELECT is_banned INTO v_isBanned FROM user_account WHERE id = v_reportedUserId;

            -- Ban the reported user if not an admin and not already banned
            IF NOT v_isAdmin AND NOT v_isBanned THEN
                UPDATE user_account SET is_banned = TRUE WHERE id = v_reportedUserId;
            END IF;
        END IF;
    END IF;

    COMMIT;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE `SavePropertyWithImagesAndCategories`(
    IN p_host_id INT,
    IN p_address_line VARCHAR(500),
    IN p_description VARCHAR(2000),
    IN p_latitude DECIMAL(10, 2),
    IN p_longitude DECIMAL(10, 2),
    IN p_max_guests INT,
    IN p_name VARCHAR(200),
    IN p_nightly_price DECIMAL(38, 2),
    IN p_num_bathrooms INT,
    IN p_num_bedrooms INT,
    IN p_num_beds INT,
    IN p_tag ENUM('BEACHFRONT', 'CASTLE', 'CAVE', 'ROMANTIC_GETAWAY', 'LUXURY', 'COZY', 'SECLUDED', 'HOUSEBOAT', 'TENT', 'TOWER', 'WINDMILL', 'MOUNTAIN_VIEW', 'LAKEFRONT', 'SKI_IN_SKI_OUT', 'OCEAN_VIEW', 'TREEHOUSE', 'COTTAGE', 'CABIN', 'FARMS', 'VILLA'),
    IN p_image_names TEXT,
    IN p_image_urls TEXT,
    IN p_categories TEXT
)
BEGIN
    DECLARE v_property_id BIGINT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            ROLLBACK;
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'An error occurred, transaction rolled back';
        END;

    START TRANSACTION;

    -- Insert property details
    INSERT INTO property (address_line, created_at, description, latitude, longitude, max_guests, name, nightly_price, num_bathrooms, num_bedrooms, num_beds, tag, updated_at, host_id)
    VALUES (p_address_line, CONVERT_TZ(CURRENT_TIMESTAMP, '+00:00', '+07:00'), p_description, p_latitude, p_longitude, p_max_guests, p_name, p_nightly_price, p_num_bathrooms, p_num_bedrooms, p_num_beds, p_tag, CONVERT_TZ(CURRENT_TIMESTAMP, '+00:00', '+07:00'), p_host_id);

    SET v_property_id = LAST_INSERT_ID();

    -- Insert images
    CALL InsertImages(v_property_id, p_image_names, p_image_urls);

    -- Insert categories
    CALL InsertCategories(v_property_id, p_categories);

    COMMIT;
END //

DELIMITER //
CREATE PROCEDURE `InsertImages`(
    IN p_property_id BIGINT,
    IN image_names TEXT,
    IN image_urls TEXT
)
BEGIN
    DECLARE v_name VARCHAR(255);
    DECLARE v_url VARCHAR(255);
    DECLARE v_name_idx INT;
    DECLARE v_url_idx INT;
    DECLARE v_next_name_idx INT;
    DECLARE v_next_url_idx INT;

    -- Initialize index variables
    SET v_name_idx = 1;
    SET v_url_idx = 1;

    -- Loop through image names and URLs
    WHILE v_name_idx > 0 AND v_url_idx > 0 DO
            -- Find the next comma in the image names string
            SET v_next_name_idx = LOCATE(',', image_names, v_name_idx);
            -- Get the next image name
            IF v_next_name_idx > 0 THEN
                SET v_name = SUBSTRING(image_names, v_name_idx, v_next_name_idx - v_name_idx);
            ELSE
                SET v_name = SUBSTRING(image_names, v_name_idx);
            END IF;

            -- Find the next comma in the image URLs string
            SET v_next_url_idx = LOCATE(',', image_urls, v_url_idx);
            -- Get the next image URL
            IF v_next_url_idx > 0 THEN
                SET v_url = TRIM(SUBSTRING(image_urls, v_url_idx, v_next_url_idx - v_url_idx));
            ELSE
                SET v_url = TRIM(SUBSTRING(image_urls, v_url_idx));
            END IF;

            -- Insert the image name and URL into the image table
            INSERT INTO image (name, url, property_id) VALUES (v_name, v_url, p_property_id);

            -- Update index variables for next iteration
            IF v_next_name_idx > 0 THEN
                SET v_name_idx = v_next_name_idx + 1;
            ELSE
                SET v_name_idx = 0; -- This will cause the loop to exit for names
            END IF;

            IF v_next_url_idx > 0 THEN
                SET v_url_idx = v_next_url_idx + 1;
            ELSE
                SET v_url_idx = 0; -- This will cause the loop to exit for URLs
            END IF;
        END WHILE;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE `InsertCategories`(
    IN p_property_id BIGINT,
    IN categories TEXT
)
BEGIN
    DECLARE v_category VARCHAR(255);
    DECLARE v_idx INT;
    DECLARE v_next_idx INT;

    -- Initialize index variables
    SET v_idx = 1;

    -- Loop through categories string
    WHILE v_idx > 0 DO
            -- Find the next comma in the categories string
            SET v_next_idx = LOCATE(',', categories, v_idx);
            -- Get the next category
            IF v_next_idx > 0 THEN
                SET v_category = TRIM(SUBSTRING(categories, v_idx, v_next_idx - v_idx));
            ELSE
                SET v_category = TRIM(SUBSTRING(categories, v_idx));
            END IF;
            -- Insert the category into the property_categories table
            INSERT INTO property_categories (property_id, categories) VALUES (p_property_id, v_category);

            -- Update index variables for next iteration
            IF v_next_idx > 0 THEN
                SET v_idx = v_next_idx + 1;
            ELSE
                SET v_idx = 0;
            END IF;
        END WHILE;
END //
DELIMITER ;
