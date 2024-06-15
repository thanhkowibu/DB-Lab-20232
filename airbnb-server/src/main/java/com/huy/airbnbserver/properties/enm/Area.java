package com.huy.airbnbserver.properties.enm;

import lombok.Getter;

@Getter
public enum Area {
    // North America
    eastern_north_america(-100.0, -60.0, 24.0, 49.0),
    western_north_america(-169.0, -100.0, 24.0, 72.0),
    central_america(-118.0, -81.0, 7.0, 23.0),

    // South America
    northern_south_america(-81.0, -34.0, -5.0, 12.0),
    southern_south_america(-81.0, -34.0, -56.0, -5.0),

    // Europe
    western_europe(-10.0, 10.0, 36.0, 71.0),
    eastern_europe(10.0, 40.0, 35.0, 70.0),
    northern_europe(-10.0, 40.0, 54.0, 71.0),
    southern_europe(-10.0, 30.0, 35.0, 54.0),

    // Africa
    northern_africa(-17.0, 51.0, 15.0, 38.0),
    central_africa(-17.0, 51.0, -10.0, 15.0),
    southern_africa(10.0, 51.0, -35.0, -10.0),
    eastern_africa(25.0, 51.0, -11.0, 12.0),
    western_africa(-17.0, 25.0, -10.0, 15.0),

    // Asia
    eastern_asia(100.0, 150.0, 20.0, 60.0),
    western_asia(26.0, 75.0, 10.0, 55.0),
    southern_asia(60.0, 100.0, -10.0, 30.0),
    southeast_asia(95.0, 141.0, -11.0, 23.0),
    central_asia(50.0, 87.0, 30.0, 55.0),
    northern_asia(40.0, 180.0, 55.0, 81.0),

    // Australia
    eastern_australia(135.0, 155.0, -45.0, -10.0),
    western_australia(113.0, 135.0, -35.0, -10.0);

    // Antarctica
//    eastern_antarctica(0.0, 180.0, -90.0, -60.0),
//    western_antarctica(-180.0, 0.0, -90.0, -60.0),
//
//    // Oceans
//    pacific_ocean(-180.0, 180.0, -60.0, 60.0),
//    atlantic_ocean(-80.0, 20.0, -60.0, 60.0),
//    indian_ocean(20.0, 146.0, -60.0, 30.0),
//    southern_ocean(-180.0, 180.0, -90.0, -60.0),
//    arctic_ocean(-180.0, 180.0, 60.0, 90.0);

    private final double minLongitude;
    private final double maxLongitude;
    private final double minLatitude;
    private final double maxLatitude;

    Area(double minLongitude, double maxLongitude, double minLatitude, double maxLatitude) {
        this.minLongitude = minLongitude;
        this.maxLongitude = maxLongitude;
        this.minLatitude = minLatitude;
        this.maxLatitude = maxLatitude;
    }
}
