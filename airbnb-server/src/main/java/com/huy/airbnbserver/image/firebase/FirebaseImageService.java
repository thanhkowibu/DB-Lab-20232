package com.huy.airbnbserver.image.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;
import com.huy.airbnbserver.image.Image;
import com.huy.airbnbserver.image.ImageRepository;
import com.huy.airbnbserver.properties.Property;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class FirebaseImageService implements IImageService {
    private final ImageRepository imageRepository;
    private final FirebaseConfig properties;

    @EventListener
    public void init(ApplicationReadyEvent event) throws IOException {
            ClassPathResource serviceAccount = new ClassPathResource("firebase.json");

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount.getInputStream()))
                    .setStorageBucket(properties.getBucketName())
                    .build();

            FirebaseApp.initializeApp(options);
    }

    @Override
    public String getImageUrl(String name) {
        return String.format(properties.getImageUrl(), name);
    }

    @Override
    @Transactional
    public Image save(MultipartFile file, @Nullable Property parent) throws IOException {
        Bucket bucket = StorageClient.getInstance().bucket();

        String name = generateFileName(file.getOriginalFilename());

        Image savedImage = new Image();
        savedImage.setName(name);
        savedImage.setProperty(parent);
        savedImage.setUrl(getImageUrl(name));
        imageRepository.save(savedImage);
        bucket.create(name, file.getBytes(), file.getContentType());

        return savedImage;
    }

    @Override
    public String save(BufferedImage bufferedImage, String originalFileName) throws IOException {

        byte[] bytes = getByteArrays(bufferedImage, getExtension(originalFileName));

        Bucket bucket = StorageClient.getInstance().bucket();

        String name = generateFileName(originalFileName);

        bucket.create(name, bytes);

        return name;
    }

    @Override
    @Transactional
    public void delete(Image image) throws IOException {
        String name = image.getName();
        Bucket bucket = StorageClient.getInstance().bucket();

        Blob blob = bucket.get(name);

        if (blob == null) {
            throw new IOException("file not found");
        }

        imageRepository.delete(image);
        blob.delete();
    }

}