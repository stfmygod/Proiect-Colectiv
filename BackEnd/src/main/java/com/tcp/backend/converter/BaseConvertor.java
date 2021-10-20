package com.tcp.backend.converter;

import com.tcp.backend.domain.BaseEntity;

import java.util.List;
import java.util.stream.Collectors;

public interface BaseConvertor<D, M extends BaseEntity> extends Converter<D, M> {

    default List<D> convertModelsToDtos(List<M> models) {
        return models.stream().map(this::convertModelToDto).collect(Collectors.toList());
    }

    default List<M> convertDtosToModels(List<D> models) {
        return models.stream().map(this::convertDtoToModel).collect(Collectors.toList());
    }
}
