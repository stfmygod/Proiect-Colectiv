package com.tcp.backend.converter;

import org.springframework.stereotype.Component;

@Component
public interface Converter<D, M> {

    D convertModelToDto(M model);

    M convertDtoToModel(D dto);
}
