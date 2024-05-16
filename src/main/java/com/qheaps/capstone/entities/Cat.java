package com.qheaps.capstone.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.qheaps.capstone.dtos.CatDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;


@Entity
@Table(name = "Cats")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(name = "cat_sequence", initialValue = 6)
public class Cat {

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cat_sequence")
    private Long id;

    @Column
    private String name;

    @Column
    private String image;

    @Column
    private Integer maxHp;

    @Column
    private Integer curHp;

    @Column
    private Integer atk;

    @Column
    private String atkDesc;

    @Column
    private Integer util;

    @Column
    private String utilType;

    @Column
    private Integer utilCd;

    @Column(columnDefinition = "boolean default false")
    private boolean isOriginal;

    @ManyToOne
    @JsonBackReference
    private RunInfo run;

    public Cat(CatDto catDto) {
        if (catDto.getName() != null) {
            this.name = catDto.getName();
        }
        if (catDto.getImage() != null) {
            this.image = catDto.getImage();
        }
        if (catDto.getMaxHp() != null) {
            this.maxHp = catDto.getMaxHp();
        }
        if (catDto.getCurHp() != null) {
            this.curHp = catDto.getCurHp();
        }
        if (catDto.getAtk() != null) {
            this.atk = catDto.getAtk();
        }
        if (catDto.getAtkDesc() != null) {
            this.atkDesc = catDto.getAtkDesc();
        }
        if (catDto.getUtil() != null) {
            this.util = catDto.getUtil();
        }
        if (catDto.getUtilType() != null) {
            this.utilType = catDto.getUtilType();
        }
        if (catDto.getUtilCd() != null) {
            this.utilCd = catDto.getUtilCd();
        }
        this.isOriginal = catDto.isOriginal();
    }
}
