package com.huy.airbnbserver.properties.converter;

import com.huy.airbnbserver.properties.Property;
import com.huy.airbnbserver.properties.enm.Category;
import com.huy.airbnbserver.properties.enm.Tag;
import com.huy.airbnbserver.properties.dto.PropertyDetailDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class PropertyDetailDtoToPropertyConverter implements Converter<PropertyDetailDto, Property> {
    @Override
    public Property convert(PropertyDetailDto source) {
        var p = new Property();
        p.setNightlyPrice(source.nightly_price());
        p.setName(source.name());
        p.setMaxGuests(source.max_guests());
        p.setNumBathrooms(source.num_bathrooms());
        p.setNumBedrooms(source.num_bedrooms());
        p.setNumBeds(source.num_beds());
        p.setLongitude(source.longitude());
        p.setLatitude(source.latitude());
        p.setDescription(source.description());
        p.setAddressLine(source.address_line());
        Set<Category> categories = source.categories().stream()
                .map(Category::valueOf)
                .collect(Collectors.toSet());
        p.setCategories(categories);
        p.setTag(Tag.valueOf(source.tag()));
        return p;
    }
}
