package com.huy.airbnbserver.properties.enm;

import lombok.Getter;

@Getter
public enum Area {
    NORTH_AMERICA(-169.0, -15.0, 10.0, 83.0),
    SOUTH_AMERICA(-81.0, -34.0, -56.0, 12.0),
    EUROPE(-27.0, 35.0, 35.0, 72.0),
    AFRICA(-26.0, 17.0, -35.0, 38.0),
    ASIA(26.0, 170.0, -10.0, 81.0),
    AUSTRALIA(113.0, 179.0, -55.0, -10.0),
    ANTARCTICA(-180.0, 180.0, -90.0, -60.0);

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
