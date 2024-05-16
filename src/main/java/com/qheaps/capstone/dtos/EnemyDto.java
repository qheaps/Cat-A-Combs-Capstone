package com.qheaps.capstone.dtos;

import com.qheaps.capstone.entities.Enemy;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnemyDto implements Serializable {
    private Long id;
    private String name;
    private String image;
    private Integer maxHp;
    private Integer curHp;
    private Integer atk;
    private String atkType;
    private Integer atk2;
    private String atk2Type;
    private Integer util;
    private String utilType;
    private Integer utilCd;
    private Integer threat;

    public EnemyDto(Enemy enemy) {
        if (enemy.getId() != null) {
            this.id = enemy.getId();
        }
        if (enemy.getName() != null) {
            this.name = enemy.getName();
        }
        if (enemy.getImage() != null) {
            this.image = enemy.getImage();
        }
        if (enemy.getMaxHp() != null) {
            this.maxHp = enemy.getMaxHp();
        }
        if (enemy.getCurHp() != null) {
            this.curHp = enemy.getCurHp();
        }
        if (enemy.getAtk() != null) {
            this.atk = enemy.getAtk();
        }
        if (enemy.getAtkType() != null) {
            this.atkType = enemy.getAtkType();
        }
        if (enemy.getAtk2() != null) {
            this.atk2 = enemy.getAtk2();
        }
        if (enemy.getAtkType() != null) {
            this.atk2Type = enemy.getAtk2Type();
        }
        if (enemy.getUtil() != null) {
            this.util = enemy.getUtil();
        }
        if (enemy.getUtilType() != null) {
            this.utilType = enemy.getUtilType();
        }
        if (enemy.getUtilCd() != null) {
            this.utilCd = enemy.getUtilCd();
        }
        if (enemy.getThreat() != null) {
            this.threat = enemy.getThreat();
        }
    }

}
