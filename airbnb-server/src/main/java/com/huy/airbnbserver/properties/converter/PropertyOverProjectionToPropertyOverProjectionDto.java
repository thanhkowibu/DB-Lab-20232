package com.huy.airbnbserver.properties.converter;

import com.huy.airbnbserver.properties.dto.PropertyOverviewProjection;
import com.huy.airbnbserver.properties.dto.PropertyOverviewProjectionDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class PropertyOverProjectionToPropertyOverProjectionDto implements Converter<PropertyOverviewProjection, PropertyOverviewProjectionDto> {
    @Override
    public PropertyOverviewProjectionDto convert(PropertyOverviewProjection source) {
        return new PropertyOverviewProjectionDto(
                source.getId(),
                source.getNightlyPrice(),
                source.getName(),
                source.getLongitude(),
                source.getLatitude(),
                source.getCreatedAt(),
                source.getUpdatedAt(),
                source.getNumBeds(),
                source.getImages(),
                source.getAverageRating()
        );
    }
}
