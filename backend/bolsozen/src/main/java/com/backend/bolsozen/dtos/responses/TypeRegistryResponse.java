package com.backend.bolsozen.dtos.responses;


import com.backend.bolsozen.enums.TypeRegistryEnum;

public record TypeRegistryResponse(Integer typeRegistryCode, String typeRegistryName, String description) {
}
