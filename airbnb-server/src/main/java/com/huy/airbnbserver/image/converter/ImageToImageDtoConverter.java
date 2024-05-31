package com.huy.airbnbserver.image.converter;

import com.huy.airbnbserver.image.Image;
import com.huy.airbnbserver.image.ImageDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class ImageToImageDtoConverter implements Converter<Image, ImageDto> {
    @Override
    public ImageDto convert(Image source) {
        return new ImageDto(
                source.getName(),
                source.getUrl()
        );
    }
}
