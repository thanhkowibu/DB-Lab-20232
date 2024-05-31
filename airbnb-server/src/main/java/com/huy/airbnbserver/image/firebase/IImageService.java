package com.huy.airbnbserver.image.firebase;

import com.huy.airbnbserver.image.Image;
import com.huy.airbnbserver.properties.Property;
import org.springframework.lang.Nullable;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.UUID;

public interface IImageService {

    String getImageUrl(String name);

    Image save(MultipartFile file, @Nullable Property parent) throws IOException;

    String save(BufferedImage bufferedImage, String originalFileName) throws IOException;

    void delete(Image image) throws IOException;

    default String getExtension(String originalFileName) {
        return StringUtils.getFilenameExtension(originalFileName);
    }

    default String generateFileName(String originalFileName) {
        return UUID.randomUUID().toString() + getExtension(originalFileName);
    }

    default byte[] getByteArrays(BufferedImage bufferedImage, String format) throws IOException {

        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

            ImageIO.write(bufferedImage, format, baos);

            baos.flush();

            return baos.toByteArray();

        }
    }

}