package com.qheaps.capstone.dtos;

import com.qheaps.capstone.entities.Cat;
import com.qheaps.capstone.entities.RunInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CatDto implements Serializable {
    private Long id;
    private String name;
    private String image;
    private Integer maxHp;
    private Integer curHp;
    private Integer atk;
    private String atkDesc;
    private Integer util;
    private String utilType;
    private Integer utilCd;
    private boolean isOriginal;

    private RunInfo run;

    public CatDto(Cat cat) {
        if (cat.getId() != null) {
            this.id = cat.getId();
        }
        if (cat.getName() != null) {
            this.name = cat.getName();
        }
        if (cat.getImage() != null) {
            this.image = cat.getImage();
        }
        if (cat.getMaxHp() != null) {
            this.maxHp = cat.getMaxHp();
        }
        if (cat.getCurHp() != null) {
            this.curHp = cat.getCurHp();
        }
        if (cat.getAtk() != null) {
            this.atk = cat.getAtk();
        }
        if (cat.getAtkDesc() != null) {
            this.atkDesc = cat.getAtkDesc();
        }
        if (cat.getUtil() != null) {
            this.util = cat.getUtil();
        }
        if (cat.getUtilType() != null) {
            this.utilType = cat.getUtilType();
        }
        if (cat.getUtilCd() != null) {
            this.utilCd = cat.getUtilCd();
        }
        this.isOriginal = cat.isOriginal();

    }

}
