package com.huy.airbnbserver.properties.enm;

import lombok.Getter;

@Getter
public enum SortColumn {
    averageRating("averageRating"),
    updatedAt("updatedAt"),
    nightlyPrice("nightlyPrice");

    private final String name;

    SortColumn(String name) {
        this.name = name;
    }
}
