package com.qheaps.capstone.dtos;

import com.qheaps.capstone.entities.Item;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemDto {
    private Long id;
    private Integer value;
    private String name;
    private String type;
    private Integer rarity;

    //may be problematic
    private UserDto userDto;

    public ItemDto(Item item) {
        if (item.getId() != null) {
            this.id = item.getId();
        }
        if (item.getValue() != null) {
            this.value = item.getValue();
        }
        if (item.getName() != null) {
            this.name = item.getName();
        }
        if (item.getType() != null) {
            this.type = item.getType();
        }
        if (item.getRarity() != null) {
            this.rarity = item.getRarity();
        }
    }
}
