package com.huy.airbnbserver.system.annotation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ValueOfEnumValidator implements ConstraintValidator<ValueOfEnum, CharSequence> {
    private List<String> acceptedValues;

    @Override
    public void initialize(ValueOfEnum annotation) {
        acceptedValues = Stream.of(annotation.enumClass().getEnumConstants())
                .map(Enum::name)
                .collect(Collectors.toList());
    }

    @Override
    public boolean isValid(CharSequence value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }

        if (!acceptedValues.contains(value.toString())) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("must be any of enum " + acceptedValues)
                    .addConstraintViolation();
            return false;
        }

        return true;
    }
}
