package com.huy.airbnbserver.booking.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@EqualsAndHashCode
public class BookingDetail {
    private Long id;
    private Date check_in_date;
    private Date check_out_date;
    private Date created_at;
    private Boolean is_confirm;
    private BigDecimal nightly_fee;
    private BigDecimal clean_fee;
    private BigDecimal service_fee;
    private Integer num_alduts;
    private Integer num_childrens;
    private Integer num_pets;
    private String status;
    private Integer issuer_id;
    private Integer host_id;
    private Long property_id;

    private Long num_guests;
    private BigDecimal total_fee;
    private String issuer_email;
    private String issuer_firstname;

    private Boolean is_checked_out;
    private BigDecimal longitude;
    private BigDecimal latitude;
    private String property_name;
    private String booking_preview_img;

    private Boolean is_rated;
}
