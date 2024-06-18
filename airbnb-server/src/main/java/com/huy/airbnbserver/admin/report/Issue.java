package com.huy.airbnbserver.admin.report;

import lombok.Getter;

@Getter
public enum Issue {
    INAPPROPRIATE_CONTENT_OR_PHOTOS(
            "Inappropriate Content or Photos",
            "This includes any offensive or inappropriate images or text that are not suitable for the platform."),
    MISLEADING_CONTENT_OR_PHOTOS(
            "Misleading Content or Photos",
            "Information or images that do not accurately represent the property or service being offered."),
    NOT_A_REAL_PLACE_TO_STAY(
            "Not a Real Place to Stay",
            "Listings that are fabricated and do not correspond to any actual property."),
    SCAM_OR_PHISHING_ATTEMPTS(
            "Scam or Phishing Attempts",
            "Any fraudulent activity aimed at deceiving users or obtaining their sensitive information."),
    VIOLATION_OF_POLICIES(
            "Violation of Policies",
            "Content or behavior that goes against the platform's guidelines and policies."),
    FAKE_REVIEWS_OR_RATINGS(
            "Fake Reviews or Ratings",
            "Reviews or ratings that are intentionally misleading or fabricated to deceive users."),
    HARASSMENT_OR_HATE_SPEECH(
            "Harassment or Hate Speech",
            "Any content or behavior that targets individuals or groups based on personal characteristics in a harmful manner."),
    COPYRIGHT_OR_TRADEMARK_INFRINGEMENT(
            "Copyright or Trademark Infringement",
            "Unauthorized use of protected intellectual property."),
    PRIVACY_VIOLATION(
            "Privacy Violation",
            "Sharing or using personal information without consent."),
    TECHNICAL_ISSUES(
            "Technical Issues",
            "Problems related to the functionality or performance of the platform.");

    private final String name;
    private final String description;

    Issue(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
