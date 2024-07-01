CREATE TABLE booking (
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    check_in_date  DATE NOT NULL,
    check_out_date DATE NOT NULL,
    clean_fee      DECIMAL(38, 2) NOT NULL,
    is_checked_out BIT NOT NULL,
    is_confirm     BIT NOT NULL,
    nightly_fee    DECIMAL(38, 2) NOT NULL,
    num_adults     INT NOT NULL,
    num_children   INT NOT NULL,
    num_pets       INT NOT NULL,
    service_fee    DECIMAL(38, 2) NOT NULL,
    user_id        INT NULL,
    property_id    BIGINT NULL,
    created_at     DATETIME(6) NOT NULL,
    status         VARCHAR(255) NOT NULL,
    CONSTRAINT FK_booking_user FOREIGN KEY (user_id) REFERENCES user_account (id),
    CONSTRAINT FK_booking_property FOREIGN KEY (property_id) REFERENCES property (id),
    CONSTRAINT CHK_clean_fee CHECK (clean_fee >= 0),
    CONSTRAINT CHK_nightly_fee CHECK (nightly_fee >= 0),
    CONSTRAINT CHK_num_adults CHECK (num_adults >= 0),
    CONSTRAINT CHK_num_children CHECK (num_children >= 0),
    CONSTRAINT CHK_num_pets CHECK (num_pets >= 0),
    CONSTRAINT CHK_service_fee CHECK (service_fee >= 0),
    CONSTRAINT CHK_dates CHECK (check_in_date < check_out_date)
);

CREATE TABLE booking_log (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    description     VARCHAR(255) NULL,
    event_timestamp DATETIME(6) NULL,
    event_type      VARCHAR(255) NOT NULL,
    booking_id      BIGINT NULL,
    CONSTRAINT FK_booking_log_booking FOREIGN KEY (booking_id) REFERENCES booking (id)
);

CREATE TABLE image (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT NULL,
    name        VARCHAR(255) NULL,
    url         VARCHAR(255) NULL,
    CONSTRAINT FK_image_property FOREIGN KEY (property_id) REFERENCES property (id)
);

CREATE TABLE liked_property (
    user_id     INT NOT NULL,
    property_id BIGINT NOT NULL,
    CONSTRAINT UK_liked_property UNIQUE (user_id, property_id),
    CONSTRAINT FK_liked_property_user FOREIGN KEY (user_id) REFERENCES user_account (id),
    CONSTRAINT FK_liked_property_property FOREIGN KEY (property_id) REFERENCES property (id)
);

CREATE TABLE notification (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    is_read      BIT NOT NULL,
    user_id      INT NULL,
    created_at   DATETIME(6) NOT NULL,
    message      VARCHAR(255) NOT NULL,
    reference_id BIGINT NOT NULL,
    type         VARCHAR(255) NOT NULL,
    CONSTRAINT FK_notification_user FOREIGN KEY (user_id) REFERENCES user_account (id)
);

CREATE TABLE notification_preferences (
    user_id                          INT NOT NULL PRIMARY KEY,
    notify_on_booking_status_change  BIT NOT NULL,
    notify_on_hosted_property_booked BIT NOT NULL,
    notify_on_hosted_property_like   BIT NOT NULL,
    notify_on_hosted_property_rating BIT NOT NULL,
    notify_on_special_offers         BIT NOT NULL,
    CONSTRAINT UK_user_preferences UNIQUE (user_id),
    CONSTRAINT FK_notification_prefs_user FOREIGN KEY (user_id) REFERENCES user_account (id)
);

CREATE TABLE property (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    host_id       INT NOT NULL,
    latitude      DECIMAL(10, 2) NOT NULL,
    longitude     DECIMAL(10, 2) NOT NULL,
    max_guests    INT NOT NULL,
    nightly_price DECIMAL(38, 2) NOT NULL,
    num_bathrooms INT NOT NULL,
    num_bedrooms  INT NOT NULL,
    num_beds      INT NOT NULL,
    created_at    DATETIME(6) NOT NULL,
    updated_at    DATETIME(6) NOT NULL,
    name          VARCHAR(200) NOT NULL,
    address_line  VARCHAR(500) NOT NULL,
    description   VARCHAR(2000) NOT NULL,
    tag           ENUM ('BEACHFRONT', 'CASTLE', 'CAVE', 'ROMANTIC_GETAWAY', 'LUXURY', 'COZY', 'SECLUDED', 'HOUSEBOAT', 'TENT', 'TOWER', 'WINDMILL', 'MOUNTAIN_VIEW', 'LAKEFRONT', 'SKI_IN_SKI_OUT', 'OCEAN_VIEW', 'TREEHOUSE', 'COTTAGE', 'CABIN', 'FARMS', 'VILLA') NOT NULL,
    CONSTRAINT FK_property_user FOREIGN KEY (host_id) REFERENCES user_account (id),
    CONSTRAINT CHK_max_guests CHECK (max_guests >= 0),
    CONSTRAINT CHK_nightly_price CHECK (nightly_price >= 10),
    CONSTRAINT CHK_num_bathrooms CHECK (num_bathrooms >= 0),
    CONSTRAINT CHK_num_bedrooms CHECK (num_bedrooms >= 0),
    CONSTRAINT CHK_num_beds CHECK (num_beds >= 0)
);

CREATE TABLE property_categories (
    property_id BIGINT NOT NULL,
    categories  ENUM ('WIFI', 'TV', 'KITCHEN', 'AIR_CONDITIONING', 'POOL', 'FREE_PARKING', 'BREAKFAST', 'WASHER', 'DRYER', 'HEATING', 'LAPTOP_FRIENDLY_WORKSPACE', 'IRON', 'HAIR_DRYER', 'SMOKE_DETECTOR', 'CARBON_MONOXIDE_DETECTOR', 'FIRE_EXTINGUISHER', 'FIRST_AID_KIT', 'ESSENTIALS', 'SHAMPOO', 'HANGERS', 'PIANO') NOT NULL,
    PRIMARY KEY (property_id, categories),
    CONSTRAINT FK_property_categories_property FOREIGN KEY (property_id) REFERENCES property (id)
);

CREATE TABLE report (
    id               BIGINT AUTO_INCREMENT PRIMARY KEY,
    is_resolved      BIT NOT NULL,
    user_id          INT NOT NULL,
    created_at       DATETIME(6) NOT NULL,
    report_entity_id BIGINT NOT NULL,
    detail           VARCHAR(255) NOT NULL,
    report_type      VARCHAR(255) NOT NULL,
    issue            ENUM ('INAPPROPRIATE_CONTENT_OR_PHOTOS', 'MISLEADING_CONTENT_OR_PHOTOS', 'NOT_A_REAL_PLACE_TO_STAY', 'SCAM_OR_PHISHING_ATTEMPTS', 'VIOLATION_OF_POLICIES', 'FAKE_REVIEWS_OR_RATINGS', 'HARASSMENT_OR_HATE_SPEECH', 'COPYRIGHT_OR_TRADEMARK_INFRINGEMENT', 'PRIVACY_VIOLATION', 'TECHNICAL_ISSUES') NOT NULL,
    CONSTRAINT FK_report_user FOREIGN KEY (user_id) REFERENCES user_account (id)
);

CREATE TABLE review (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    is_recommend BIT NOT NULL,
    rating       INT NOT NULL,
    booking_id   BIGINT NULL,
    created_at   DATETIME(6) NOT NULL,
    updated_at   DATETIME(6) NULL,
    content      VARCHAR(2000) NOT NULL,
    CONSTRAINT UK_review_booking UNIQUE (booking_id),
    CONSTRAINT FK_review_booking FOREIGN KEY (booking_id) REFERENCES booking (id),
    CONSTRAINT CHK_rating CHECK (rating >= 1 AND rating <= 5)
);

CREATE TABLE token (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT NOT NULL,
    created_at DATETIME(6) NULL,
    expires_at DATETIME(6) NULL,
    token      VARCHAR(255) NULL,
    CONSTRAINT FK_token_user FOREIGN KEY (user_id) REFERENCES user_account (id)
);

CREATE TABLE user_account (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    enabled      BIT NOT NULL,
    is_banned    BIT NOT NULL,
    avatar_id    BIGINT NULL,
    created_at   DATETIME(6) NOT NULL,
    dob          DATETIME(6) NULL,
    updated_at   DATETIME(6) NULL,
    phone_number VARCHAR(11) NULL,
    roles        VARCHAR(100) NOT NULL,
    email        VARCHAR(200) NOT NULL,
    firstname    VARCHAR(200) NOT NULL,
    lastname     VARCHAR(200) NOT NULL,
    password     VARCHAR(200) NOT NULL,
    gender       VARCHAR(255) NULL,
    CONSTRAINT UK_user_email UNIQUE (email),
    CONSTRAINT UK_user_avatar UNIQUE (avatar_id),
    CONSTRAINT FK_user_avatar FOREIGN KEY (avatar_id) REFERENCES image (id)
);

CREATE INDEX email_index ON user_account (email);
