package com.huy.airbnbserver.properties.converter;

import com.huy.airbnbserver.image.converter.ImageToImageDtoConverter;
import com.huy.airbnbserver.properties.Property;
import com.huy.airbnbserver.properties.dto.PropertyOverviewDto;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PropertyToPropertyOverviewDto implements Converter<Property, PropertyOverviewDto> {
    private final ImageToImageDtoConverter imageToImageDtoConverter;

    @Override
    public PropertyOverviewDto convert(@NonNull Property source) {
        return new PropertyOverviewDto(
                source.getId(),
                source.getNightlyPrice(),
                source.getName(),
                source.getLongitude(),
                source.getLatitude(),
                source.getCreatedAt(),
                source.getUpdatedAt(),
                source.getImages().stream().map(imageToImageDtoConverter::convert).toList()
        );
    }
}
