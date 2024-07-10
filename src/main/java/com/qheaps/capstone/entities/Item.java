package com.qheaps.capstone.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.qheaps.capstone.dtos.ItemDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Integer value;

    @Column
    private String name;

    @Column
    private String type;

    @Column
    private Integer rarity;

    @ManyToOne
    @JsonBackReference
    private User userItem;
    //clear item func in service
    //join table in users?

    public Item(ItemDto itemDto) {
        if (itemDto.getId() != null) {
            this.id = itemDto.getId();
        }
        if (itemDto.getValue() != null) {
            this.value = itemDto.getValue();
        }
        if (itemDto.getName() != null) {
            this.name = itemDto.getName();
        }
        if (itemDto.getType() != null) {
            this.type = itemDto.getType();
        }
        if (itemDto.getRarity() != null) {
            this.rarity = itemDto.getRarity();
        }
    }

}
