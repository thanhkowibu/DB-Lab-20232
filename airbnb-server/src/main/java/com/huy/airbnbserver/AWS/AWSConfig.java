package com.huy.airbnbserver.AWS;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "aws.s3")
public class AWSConfig {
    private String bucketName;
    private String endpoint;
    private String accessKey;
    private String secretKey;
}
