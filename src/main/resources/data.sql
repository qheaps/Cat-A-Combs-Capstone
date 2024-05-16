INSERT INTO Cats (id, name, image, max_hp, cur_hp, atk, atk_desc, util, util_type, util_cd, is_original) VALUES
(1, 'Punished Uni', '.\images\uni.png', 150, 150, 125, 'Reforged Excalibur', 20, 'atk_buff', 2, true),
(2, 'Silver Paw', '.\images\silverpaw.png', 125, 125, 177, 'Malorian Blast', 30, 'def_buff', 3, true),
(3, 'Comrade', '.\images\comrade.png', 175, 175, 100, 'Stalinium Blade', 60, 'multi_heal', 3, true),
(4, 'Floppa', '.\images\floppa.png', 250, 2000, 75, 'Fanter Shot', 20, 'atk_buff', 2, true),
(5, 'The Thinker', '.\images\mewing.png', 175, 175, 140, 'Terizzium Bow', 20, 'def_buff', 3, true);
--('', '', 0, 0, 0, '', 0, '', 0),

INSERT INTO Enemies (id, name, image, max_hp, cur_hp, atk, atk_type, atk2, atk2type, util, util_type, util_cd, threat) VALUES
(1, 'Bingus, The Exterminator of The Old World', '.\images\bingus.png', 3000, 3000, 70, 'single', 40, 'multi', 60, 'multi_atk', 3, 17),
(2, 'Garrett, Bulwark of Light', 'img', 500, 500, 60, 'single', 30, 'multi', 90, 'single_heal', 3, 11),
(3, 'Brayden, Maiden of Death', 'img', 600, 600, 55, 'single', 20, 'multi', 90, 'single_atk', 4, 13),
(4, 'Keys, Gatekeeper of The Deep', 'img', 1200, 1200, 30, 'single', 30, 'multi', 300, 'single_heal', 3, 15),
(5, 'Juvenis, The Cycle of Destruction', '.\images\ouroboros.png', 1000, 1000, 55,'single', 45, 'multi', 400, 'single_heal', 2, 14),
(6, 'Vernier, Scripter of Fate', '.\images\wizardcat.png', 2000, 2000, 60,'single', 30, 'multi', 100, 'single_atk', 3, 16),
(7, 'Theodore, The Endless', '.\images\endless.png', 1000, 1000, 55, 'single', 20, 'multi', 80, 'single_atk', 2, 12);
--(6, 'Sutherland, Scripter of Fate', 'img', 0, 0, '', 0, '', 0, '', 0, 16),
--(7, 'Jeff Placeholder, Devourer of Desires', 'img', 0, 0, '', 0, '', 0, '', 0, 14),
