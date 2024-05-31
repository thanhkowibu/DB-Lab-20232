package com.huy.airbnbserver.system.annotation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ValueOfEnumsValidator implements ConstraintValidator<ValueOfEnums, Iterable<String>> {
    private List<String> acceptedValues;

    @Override
    public void initialize(ValueOfEnums annotation) {
        acceptedValues = Stream.of(annotation.enumClass().getEnumConstants())
                .map(Enum::name)
                .collect(Collectors.toList());
    }

    @Override
    public boolean isValid(Iterable<String> values, ConstraintValidatorContext context) {
        if (values == null) {
            return true;
        }

        for (String value : values) {
            if (!acceptedValues.contains(value)) {
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate("must be any of enum " + acceptedValues)
                        .addConstraintViolation();
                return false;
            }
        }

        return true;
    }
}
