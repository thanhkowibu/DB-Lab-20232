package com.huy.airbnbserver.AWS;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.huy.airbnbserver.image.Image;
import com.huy.airbnbserver.properties.Property;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.UUID;

@Service
public class AWSBucketService {
    private final AWSConfig awsConfig;
    private final AmazonS3 s3Client;

    public AWSBucketService(AWSConfig awsConfig) {
        this.awsConfig = awsConfig;
        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(
                awsConfig.getAccessKey(), awsConfig.getSecretKey());
        this.s3Client = AmazonS3Client.builder()
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(awsConfig.getEndpoint(), "us-east-1"))
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .withPathStyleAccessEnabled(true)
                .build();
    }

//    public String getUrl(String key) {
//        return  s3Client.getUrl(awsConfig.getBucketName(), key).toString();
//    }

    public String getUrl(String key) {
        return awsConfig.getExternalEndpoint() + "/" + awsConfig.getBucketName() + "/" + key;
    }

    public Image uploadFile(MultipartFile multipartFile, @Nullable Property parent) throws IOException {
        File file = File.createTempFile("temp", null);
        multipartFile.transferTo(file);
        String key = generateFileName(multipartFile.getOriginalFilename());

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.length());
        metadata.setContentType(multipartFile.getContentType());

        try (FileInputStream fileInputStream = new FileInputStream(file)) {
            s3Client.putObject(awsConfig.getBucketName(), key, fileInputStream, metadata);
        }

        Image uploadedImage = new Image();
        uploadedImage.setUrl(getUrl(key));
        uploadedImage.setName(key);
        uploadedImage.setProperty(parent);

        return uploadedImage;
    }

    public void deleteFile(Image image) {
        s3Client.deleteObject(awsConfig.getBucketName(), image.getName());
    }

    private String generateFileName(String originalFileName) {
        return UUID.randomUUID()+"." + getExtension(originalFileName);
    }

    private String getExtension(String originalFileName) {
        return StringUtils.getFilenameExtension(originalFileName);
    }
}
