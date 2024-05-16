package com.qheaps.capstone.entities;

import com.qheaps.capstone.dtos.EnemyDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Table(name = "Enemies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(name = "enemy_sequence", initialValue = 6)
public class Enemy {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "enemy_sequence")
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
    private String atkType;

    @Column
    private Integer atk2;

    @Column
    private String atk2Type;

    @Column
    private Integer util;

    @Column
    private String utilType;

    @Column
    private Integer utilCd;

    @Column
    private Integer threat;

    //util cool down?

    public Enemy(EnemyDto enemyDto) {
        if (enemyDto.getName() != null) {
            this.name = enemyDto.getName();
        }
        if (enemyDto.getImage() != null) {
            this.image = enemyDto.getImage();
        }
        if (enemyDto.getAtk() != null) {
            this.atk = enemyDto.getAtk();
        }
        if (enemyDto.getMaxHp() != null) {
            this.maxHp = enemyDto.getMaxHp();
        }
        if (enemyDto.getCurHp() != null) {
            this.curHp = enemyDto.getCurHp();
        }
        if (enemyDto.getAtkType() != null) {
            this.atkType = enemyDto.getAtkType();
        }
        if (enemyDto.getAtk2() != null) {
            this.atk2 = enemyDto.getAtk2();
        }
        if (enemyDto.getAtkType() != null) {
            this.atk2Type = enemyDto.getAtk2Type();
        }
        if (enemyDto.getUtil() != null) {
            this.util = enemyDto.getUtil();
        }
        if (enemyDto.getUtilType() != null) {
            this.utilType = enemyDto.getUtilType();
        }
        if (enemyDto.getUtilCd() != null) {
            this.utilCd= enemyDto.getUtilCd();
        }
        if (enemyDto.getThreat() != null) {
            this.threat= enemyDto.getThreat();
        }
    }

}
