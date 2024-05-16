const cookieArr = document.cookie.split("=")
const userId = cookieArr[1]

const baseUrl = `http://localhost:8080/cat-a-combs`

const testBtn = document.getElementById("testing")
const testBtn2 = document.getElementById("testing2")
const testBtn3 = document.getElementById("testing3")
const infoRead = document.getElementById("info-readout")
const startScreenBtn = document.getElementById("startscreen-button")
const partyStartBtn = document.getElementById("party-start-button")

const enemyCont = document.getElementById("enemy-cont")
const catCont = document.getElementById("cat-cont")
const partySelectorCont = document.getElementById("selected-party-cont")
const assembleCatCardSel = document.getElementsByClassName("cat-card")
const partyCont = document.getElementById("party-cont")
const gameStartBtn = document.getElementById("game-start-button")
const catAtkBtn = document.getElementsByClassName("cat-atk-button")
const catUtilBtn = document.getElementsByClassName("cat-util-button")
const runInfoCont = document.getElementById("run-info")
const combatBtn = document.getElementById("combat-button")

const headers = {
    "Content-Type": `application/json`
}

let catArr = []
let selPartyIdArr = []
let partyArr = []
let enemyArr = []
let runInfoArr = []
let moveArr = []
let bossEnemyArr = [12, 14, 16]
let selCatArr = []
let turnCounter = 0
let alivePartyMems = 3

//helper functions
async function createRunInfo() {
    console.log(userId)
    await fetch(`${baseUrl}/run/create/${userId}`, {
        method: "POST",
        headers: headers
    })
        .then(getRunInfoByUser)
        .catch(error => console.error(error.message))

    console.log(`run info created`)
}

async function getRunInfoByUser() {
    await fetch(`${baseUrl}/run/info/${userId}`, {
        method: "GET",
        headers: headers
    })
        .then(res => res.json())
        .then(data => runInfoArr.push(data))
    // .then(data => console.log(data))

    console.log(`runinfo retrieved`)
}

//runInfoDto
async function updateLevel(level) {
    const bodyObj = { ...runInfoArr[0] }
    runInfoArr.splice(0, 1)
    await fetch(`${baseUrl}/run/update/${level}`, {
        method: "PUT",
        body: JSON.stringify(bodyObj),
        headers: headers
    })
        .catch(error => console.error(error.message))
        .then(updateRunInfo)
    // updateRunInfo()
}

async function updateRunInfo() {
    runInfoArr.splice(0, 1)
    console.log(`runinfo updated locally`)
    await getRunInfoByUser()
}

async function getAllOriginalCats() {
    await fetch(`${baseUrl}/cats/getoriginalcats`, {
        method: "GET",
        headers: headers
    })
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                catArr.push(data[i])
            }
        })
}

//catDto
async function updateCatHp() {
    for (let i = 0; i < partyArr.length; i++) {
        const bodyObj = { ...partyArr[i] }
        await fetch(`${baseUrl}/cats/update}`, {
            method: "PUT",
            body: JSON.stringify(bodyObj),
            headers: headers
        })
            .catch(error => console.error(error.message))
    }
    //dangerous??
    await updateRunInfo()
}

//runDto catId
async function copyCat(catId) {
    // console.log(`copying cat`)
    await fetch(`${baseUrl}/cats/copycat/${catId}`, {
        method: "POST",
        body: JSON.stringify(runInfoArr[0]),
        headers: headers
    })
        .catch(error => console.error(error.message))
        .then(await updateRunInfo())
}

function catCardSelectionFactory(arr) {
    catCont.innerHTML = ''
    for (let i = 0; i < arr.length; i++) {
        let catCard = document.createElement(`div`)
        catCard.setAttribute(`class`, `cat-card`)
        catCard.setAttribute(`cat-id`, `${i + 1}`)
        catCard.innerHTML = (`
        <div class="card-header">
        <p class="cat-text">${arr[i].name}</p>
        </div>
        <div class="cat-image-cont">
        <img src="${arr[i].image}" alt="cat image" class="cat-image">
        </div>
        <div class="cat-hp">
        <p class="cat-hp-text">${arr[i].maxHp}</p>
        </div>
        `)
        catCont.append(catCard)
    }
}

function selectionPartyCatCardFactory(obj) {
    let catCard = document.createElement(`div`)
    catCard.setAttribute(`class`, `sel-cat-card`)
    catCard.innerHTML = (`
    <div class="card-header">
    <p class="sel-cat-text">${obj.name}</p>
    </div>
    <div class="cat-image-cont">
    <img src="${obj.image}" alt="cat image" class="cat-image">
    </div>
    <div class="sel-cat-hp">
    <p class="cat-hp-text">${obj.maxHp}</p>
    </div>
    `)
    partySelectorCont.append(catCard)
}

//use local party array
//atk type attribute may need to be changed 
function catPartyFactory(arr) {
    // catCont.innerHTML = ''
    console.log(`cat party init`)
    for (let i = 0; i < arr.length; i++) {
        let catCard = document.createElement(`div`)
        catCard.setAttribute(`class`, `party-cat`)
        catCard.setAttribute(`cat-id`, `${arr[i].id}`)
        catCard.innerHTML = (`
        <div class="party-card-header">
        <p class="party-cat-text">${arr[i].name}</p>
        </div>
        <div class="party-cat-image-cont">
        <img src="${arr[i].image}" alt="cat image" class="cat-image">
        </div>
        <div class="party-cat-hp">
        <p class="party-cat-text" id="cat${arr[i].id}-hp">${arr[i].curHp}/${arr[i].maxHp}</p>
        </div>
        <div id="cat${arr[i].id}-buttons" class="cat-button-cont">
            <button class="cat-atk-button" type="atk" value="${arr[i].atk}">Attack</button>
            <button class="cat-util-button" type="${arr[i].utilType}" value="${arr[i].util}">Util</button>
        </div>
        `)
        partyCont.append(catCard)
    }


    for (let i = 0; i < catAtkBtn.length; i++) {
        //atk selector
        // console.log(`atk for loop`)
        catAtkBtn[i].addEventListener(`click`, e => {
            let selCat = e.target.parentNode.parentNode
            // console.log(e.target.parentNode.parentNode)
            selCat = selCat.getAttribute(`cat-id`)
            // console.log(selCat)
            if (selCatArr.includes(+selCat)) {
                alert(`Cat has already taken an action!`)
            } else {
                selCatArr.push(+selCat)
                let targetValue = e.target.getAttribute(`value`)

                moveArr.push({ type: "atk", value: +targetValue })

                console.log(`atk move processed`)
            }
        }, false)
        //util selector
        catUtilBtn[i].addEventListener(`click`, e => {
            let selCat = e.target.parentNode.parentNode
            selCat = selCat.getAttribute(`cat-id`)
            if (selCatArr.includes(+selCat)) {
                alert(`Cat has already taken an action!`)
            } else {
                selCatArr.push(+selCat)
                let targetValue = e.target.getAttribute(`value`)
                let targetType = e.target.getAttribute(`type`)

                moveArr.push({ type: targetType, value: +targetValue })

                console.log(`util move processed`)
            }
        }, false)
    }
}

//function only for use in party selector
async function getCatByIdAddParty(catId) {
    await fetch(`${baseUrl}/cats/getcat/${catId}`, {
        method: "GET",
        headers: headers
    })
        .then(res => res.json())
        //remove this line for use elsewhere
        .then(data => selectionPartyCatCardFactory(data))
}

//get
async function getEnemyById(enemyId) {
    await fetch(`${baseUrl}/enemy/getenemy/${enemyId}`, {
        method: "GET",
        headers: headers
    })
        .then(res => res.json())
        .then(data => enemyArr.push(data))
}

//updated to get original cats .then login, may be unstable
async function getEnemiesByThreat(threatLvl) {
    await fetch(`${baseUrl}/enemy/enemythreat/${threatLvl}`, {
        method: "GET",
        headers: headers
    })
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                enemyArr.push(data[i])
            }

        })
}

function enemyCardFactory(arr) {
    enemyCont.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        let enemyCard = document.createElement(`div`)
        enemyCard.setAttribute(`class`, `enemy-card`)
        enemyCard.setAttribute(`id`, `enemy-${i + 1}`)
        enemyCard.innerHTML = (`
        <div class="enemy-header">
        <p class="enemy-text">${arr[i].name}</p>
        </div>
        <div class="enemy-image-cont">
        <img src="${arr[i].image}" alt="enemy image" class="enemy-image">
        </div>
        <div class="enemy-hp">
        <p class="enemy-text" id="temp-enemy-hp">${arr[i].curHp}/${arr[i].maxHp}</p>
        </div>
        `)
        enemyCont.appendChild(enemyCard)
    }
}

//no use
function createEnemyCardById(enemyId) {
    getEnemyById(enemyId)
    console.log(enemyArr)
    enemyCardFactory(enemyArr)
}

function introTransition() {
    document.getElementById("start-screen-section").style.display = "none";
    document.getElementById("intro-section").style.display = "flex";
}

function infoAppend(string) {
    let children = infoRead.childElementCount;
    if (children < 33) {
        let infoText = document.createElement(`p`)
        infoText.setAttribute(`class`, `game-text`)
        infoText.innerHTML = (`> ${string}`)
        infoRead.appendChild(infoText)
    } else {
        infoRead.replaceChildren()
        infoAppend(`CLS`)
        infoAppend("dir C:\\actions\\*.TXT")
        let infoText = document.createElement(`p`)
        infoText.setAttribute(`class`, `game-text`)
        infoText.innerHTML = (`> ${string}`)
        infoRead.appendChild(infoText)
    }
}



// create run info
async function displayCatSelection() {
    document.getElementById("intro-section").style.display = "none";
    document.getElementById("party-selection-section").style.display = "flex";
    await getAllOriginalCats()
    catCardSelectionFactory(catArr)

    //timing issue
    console.log(catArr.length)
    console.log("display cat selection finished")

    //adds all selected cats to temporary array to be copied, checks if cats all have unique id beforehand
    for (let i = 0; i < assembleCatCardSel.length; i++) {
        assembleCatCardSel[i].addEventListener(`click`, e => {
            let selcat = e.target.getAttribute(`cat-id`)
            if (selPartyIdArr.length < 3) {
                //!= 0 check to ensure that the div with an id is selected
                if (!selPartyIdArr.includes(+selcat) && +selcat != 0) {
                    selPartyIdArr.push(+selcat)
                    getCatByIdAddParty(+selcat)
                } else {
                    alert(`This cat is already in your party!`)
                }
            } else {
                alert(`Your party is full!`)
            }
        }, false)
    }

}

// functions and calculations related to enemies need to be redone if > 1 enemy
async function combatLoop() {
    console.log(`combat loop start`)

    //TODO
    //"async" combat order with friendly cats, allows cd tracking for util. would remove need for moveArr
    //wont work with > 1 enemy, could use check similar to alivePartyMems
    if (enemyArr[0].curHp > 0 && alivePartyMems > 0) {

        let atkBuff = 1
        let defBuff = 1

        if (moveArr.length == alivePartyMems) {

            for (let i = 0; i < moveArr.length; i++) {
                if (moveArr[i].type == "atk") {
                    if (enemyArr[0].curHp - (moveArr[i].value * atkBuff) <= 0) {
                        enemyArr[0].curHp = 0
                        infoAppend(`You dealt ${moveArr[i].value * atkBuff} damage to: ${enemyArr[0].name} and vanquished it!`)
                        let bing = document.getElementById(`temp-enemy-hp`)
                        bing.innerHTML = (`${enemyArr[0].curHp}/${enemyArr[0].maxHp}`)
                    } else {
                        enemyArr[0].curHp -= moveArr[i].value * atkBuff
                        infoAppend(`you dealt ${moveArr[i].value * atkBuff} damage to: ${enemyArr[0].name}`)
                        let bing = document.getElementById(`temp-enemy-hp`)
                        bing.innerHTML = (`${enemyArr[0].curHp}/${enemyArr[0].maxHp}`)
                    }

                } else if (moveArr[i].type == "atk_buff") {
                    atkBuff += (moveArr[i].value / 100)
                    infoAppend(`your party's attack has been buffed by ${moveArr[i].value}%`)


                } else if (moveArr[i].type == "def_buff") {
                    defBuff -= (moveArr[i].value / 100)
                    infoAppend(`your party's defense has been buffed by ${moveArr[i].value}%`)

                } else if (moveArr[i].type == "multi_heal") {
                    console.log(`healing start`)
                    for (let x = 0; x < partyArr.length; x++) {
                        if ((partyArr[x].curHp + moveArr[i].value) < partyArr[x].maxHp && partyArr[x].curHp != 0) {
                            partyArr[x].curHp += moveArr[i].value
                            document.getElementById(`cat${partyArr[x].id}-hp`).innerHTML = (`${partyArr[x].curHp}/${partyArr[x].maxHp}`)

                        } else if ((partyArr[x].curHp + moveArr[i].value) >= partyArr[x].maxHp && partyArr[x].curHp != 0) {
                            partyArr[x].curHp += partyArr[x].maxHp - partyArr[x].curHp
                            document.getElementById(`cat${partyArr[x].id}-hp`).innerHTML = (`${partyArr[x].curHp}/${partyArr[x].maxHp}`)

                        } else if (partyArr[x].curHp == 0) {
                            console.log("cat is kill")
                        } else {
                            console.log("healing check broken")
                        }
                    }
                    infoAppend(`your party has been healed for ${moveArr[i].value}HP`)

                    //future expansion for new utils
                } else {
                    console.log("party attack broken")
                }
            }

            //temporary fix, wont work with > 1 enemy, needs for loop check for more enemies
            if (enemyArr[0].curHp > 0) {

                console.log(`beginning enemy attack loop`)

                for (let i = 0; i < enemyArr.length; i++) {
                    let enemyMovChoice = Math.floor(Math.random() * 3)
                    let enemyTarChoice = Math.floor(Math.random() * 3)

                    if (turnCounter % enemyArr[i].utilCd == 0 && turnCounter != 0) {
                        if (enemyArr[i].utilType == "single_atk") {
                            console.log(`enemy util single attack`)
                            if (partyArr[enemyTarChoice].curHp - enemyArr[i].util <= 0) {
                                if (partyArr[enemyTarChoice].curHp != 0) {
                                    partyArr[enemyTarChoice].curHp = 0
                                    infoAppend(`${partyArr[enemyTarChoice].name} has taken ${enemyArr[i].atk2 * defBuff} damage and PERISHED!`)
                                    document.getElementById(`cat${partyArr[enemyTarChoice].id}-hp`).innerHTML = (`0/${partyArr[enemyTarChoice].maxHp}`)
                                }
                            } else {
                                //check that targeted party member isnt dead and reassign target, choose num != targetChoice && < party.length
                                partyArr[enemyTarChoice].curHp -= enemyArr[i].util * defBuff
                                //apend to readout, party[i] took x dmg
                                infoAppend(`${partyArr[enemyTarChoice].name} has taken ${enemyArr[i].util * defBuff} damage!`)
                                document.getElementById(`cat${partyArr[enemyTarChoice].id}-hp`).innerHTML = (`${partyArr[enemyTarChoice].curHp}`)
                            }
                        } else if (enemyArr[i].utilType == "multi_atk") {
                            console.log(`enemy util multi attack`)
                            for (let j = 0; j < partyArr.length; j++) {
                                if (partyArr[j].curHp - enemyArr[i].util <= 0) {
                                    if (partyArr[j].curHp != 0) {
                                        partyArr[j].curHp = 0
                                        infoAppend(`${partyArr[j].name} has taken ${enemyArr[i].atk * defBuff} damage and PERISHED!`)
                                        document.getElementById(`cat${partyArr[j].id}-hp`).innerHTML = (`0/${partyArr[j].maxHp}`)
                                    }
                                } else {
                                    partyArr[j].curHp -= enemyArr[i].util * defBuff
                                    infoAppend(`${partyArr[j].name} has taken ${enemyArr[i].util * defBuff} damage!`)
                                    document.getElementById(`cat${partyArr[j].id}-hp`).innerHTML = (`${partyArr[j].curHp}/${partyArr[j].maxHp}`)
                                }
                            }
                        }

                        if (enemyArr[i].utilType == "single_heal") {
                            console.log(`enemy single heal`)

                            if (enemyArr[i].curHp + enemyArr[i].util >= enemyArr[i].maxHp) {
                                enemyArr[i].curHp == enemyArr[i].maxHp
                                document.getElementById(`temp-enemy-hp`).innerHTML = (`${enemyArr[0].curHp}/${enemyArr[0].maxHp}`)
                            } else {
                                enemyArr[i].curHp += enemyArr[i].util
                                document.getElementById(`temp-enemy-hp`).innerHTML = (`${enemyArr[0].curHp}/${enemyArr[0].maxHp}`)
                                infoAppend(`${enemyArr[i].name} has healed themselves for ${enemyArr[i].util}HP!`)
                            }
                        }
                    }

                    if (enemyMovChoice == 2) {
                        console.log(`enemy basic multi attack`)
                        for (let j = 0; j < partyArr.length; j++) {
                            if (partyArr[j].curHp - enemyArr[i].atk2 <= 0) {
                                if (partyArr[j].curHp != 0) {
                                    partyArr[j].curHp = 0
                                    infoAppend(`${partyArr[j].name} has taken ${enemyArr[i].atk2 * defBuff} damage and PERISHED!`)
                                    document.getElementById(`cat${partyArr[j].id}-hp`).innerHTML = (`0/${partyArr[j].maxHp}`)
                                }

                            } else {
                                // console.log(enemyArr[i].atk2 * defBuff)
                                partyArr[j].curHp -= enemyArr[i].atk2 * defBuff
                                infoAppend(`${partyArr[j].name} has taken ${enemyArr[i].atk2 * defBuff} damage!`)
                                //update cat card hp
                                document.getElementById(`cat${partyArr[j].id}-hp`).innerHTML = (`${partyArr[j].curHp}/${partyArr[j].maxHp}`)
                            }
                        }

                    } else if (enemyMovChoice < 2) {
                        //not targeting dead check
                        console.log(`enemy basic attack`)
                        if (partyArr[enemyTarChoice].curHp - enemyArr[i].atk <= 0) {
                            if (partyArr[enemyTarChoice].curHp != 0) {
                                partyArr[enemyTarChoice].curHp = 0
                                console.log(partyArr[enemyTarChoice].curHp)
                                infoAppend(`${partyArr[enemyTarChoice].name} has taken ${enemyArr[i].atk * defBuff} damage and PERISHED!`)
                                document.getElementById(`cat${partyArr[enemyTarChoice].id}-hp`).innerHTML = (`0/${partyArr[enemyTarChoice].maxHp}`)
                            }
                        } else {
                            partyArr[enemyTarChoice].curHp -= enemyArr[i].atk * defBuff
                            infoAppend(`${partyArr[enemyTarChoice].name} has taken ${enemyArr[i].atk * defBuff} damage!`)
                            document.getElementById(`cat${partyArr[enemyTarChoice].id}-hp`).innerHTML = (`${partyArr[enemyTarChoice].curHp}/${partyArr[enemyTarChoice].maxHp}`)
                        }
                    }

                }

                //create number of not dead party mems here with loop checking curHp
                alivePartyMems = 0
                for (let i = 0; i < partyArr.length; i++) {
                    console.log(`alive party check`)
                    if (partyArr[i].curHp > 0) {
                        alivePartyMems += 1
                    } else if (partyArr[i].curHp == 0) {
                        // document.getElementById(`cat${partyArr[i].id}-buttons`).innerHTML = (`<p class="game-text">PERISHED</p>`)
                    document.getElementById(`cat${partyArr[i].id}-buttons`).style.display = "none";

                    }
                }

                turnCounter++
                document.getElementById(`turn-display`).innerHTML = `> turn:${turnCounter}`
            }
        }
    }

    if (enemyArr[0].curHp <= 0) {
        console.log(`level over`)
        await updateLevel(runInfoArr[0].level + 1)
        enemyArr = []
        turnCounter = 0;
        //hiding action buttons
        //healing for demo purposes only
        for (let i = 0; i < partyArr.length; i++) {
            partyArr[i].curHp = partyArr[i].maxHp
            document.getElementById(`cat${partyArr[i].id}-hp`).innerHTML = (`${partyArr[i].curHp}/${partyArr[i].maxHp}`)
            document.getElementById(`cat${partyArr[i].id}-buttons`).style.display = "none";
            //Button order broken on victory message
            // enemyCont.innerHTML = `<p class="game-text">VICTORY!</p>`
        }
        //demo purposes only
        alivePartyMems = 3

        console.log(`e`)

        runInfoCont.removeChild(document.getElementById(`turn-display`))
        document.getElementById(`level-display`).innerHTML = `> level:${runInfoArr[0].level}`
        combatBtn.innerHTML = `Continue`
    } else if (alivePartyMems == 0) {
        enemyCont.innerHTML = `<p class="game-text">YOUR PARTY HAS PERISHED<br>Their souls will forever wander the labyrinth...</p>`
        combatBtn.innerHTML = `GAME OVER`
        await updateLevel(1)
        //backend party clear function here
        partyArr = []
        //redirect to start here
    }

    console.log(`bottoms ups`)

    moveArr = []
    selCatArr = []
}


const catCardSelector = document.getElementsByClassName("cat-card")

startScreenBtn.addEventListener(`click`, introTransition)
partyStartBtn.addEventListener(`click`, displayCatSelection)
gameStartBtn.addEventListener(`click`, async (e) => {
    if (selPartyIdArr.length == 3) {
        await createRunInfo()
        document.getElementById("party-selection-section").style.display = "none";
        document.getElementById("game-section").style.display = "flex";

        // console.log(`selPartyIdArr: ${selPartyIdArr}`)

        //copycats from selectedIdArr into run info
        for (let i = 0; i < selPartyIdArr.length; i++) {
            console.log(`copying cat in loop ${selPartyIdArr[i]}`)
            await copyCat(selPartyIdArr[i])
        }

        //required update
        await updateRunInfo()

        //moving party information to local array
        partyArr = runInfoArr[0].party
        console.log(`runinfo party: ${partyArr}`)
        catPartyFactory(partyArr)

        for (let i = 0; i < partyArr.length; i++) {
            document.getElementById(`cat${partyArr[i].id}-buttons`).style.display = "none";
        }


        levelDisplay = document.createElement(`p`)
        levelDisplay.setAttribute(`class`, `game-text`)
        levelDisplay.setAttribute(`id`, `level-display`)
        levelDisplay.innerHTML = `> level:${runInfoArr[0].level}`
        runInfoCont.appendChild(levelDisplay)

    } else {
        alert("You need to select 3 party members!")
    }
})

//might be a bit reductive to call it `combat-button` at this point
document.getElementById(`combat-button`).addEventListener(`click`, async e => {
    console.log(runInfoArr[0])
    if (runInfoArr[0].level == 1) {
        if (turnCounter == 0) {
            enemyCont.replaceChildren()
            let flavorText = document.createElement(`p`)
            flavorText.setAttribute(`class`, `game-text`)
            flavorText.innerHTML = `The labyrinth is beginning to take its toll on your party, the seemingly endless number of enemies and cramped spaces having whittled down morale.
            But your party must continue forward, and with a shaky paw the door is cracked open. Light floods into the dark corridor, and an impossibly large hallway comes into view.
            The hallway appears to be suspended in the sky, the only impression of its existence being the faint outline of its surfaces in the endless expanse of the sky.
            A booming voice that can be felt in your bones is heard from somewhere down the hallway, saying, "You have intruded upon my domain travelers, and I, Theodore the Endless will end you here." 
            Knowing this must be another Keeper, your party readies it weapons - and prepares for combat.`
            enemyCont.appendChild(flavorText)

            turnCounter = 1
        } else if (enemyArr.length == 0 && turnCounter == 1) {
            await getEnemiesByThreat(bossEnemyArr[runInfoArr[0].level - 1])
            enemyCardFactory(enemyArr)
            infoAppend(`You have encountered ${enemyArr[0].name}!`)
            //displaying action buttons
            for (let i = 0; i < partyArr.length; i++) {
                console.log(`button time`)
                document.getElementById(`cat${partyArr[i].id}-buttons`).style.display = "flex";
            }
            
            let turnDisplay = document.createElement(`p`)
            turnDisplay.setAttribute(`class`, `game-text`)
            turnDisplay.setAttribute(`id`, `turn-display`)
            turnDisplay.innerHTML = `> turn:${turnCounter}`
            runInfoCont.appendChild(turnDisplay)

            combatBtn.innerHTML = `End Turn`
        } else {
            if (moveArr.length == alivePartyMems) {
               await combatLoop()
            } else {
                alert(`Select more actions!`)
            }
        }
    }
    //actually the threat 14 boss
    if (runInfoArr[0].level == 2) {
        if (turnCounter == 0) {
            enemyCont.replaceChildren()
            let flavorText = document.createElement(`p`)
            flavorText.setAttribute(`class`, `game-text`)
            flavorText.innerHTML = `The smell of rot fills the party's noses as they descend yet another staircase, and by now the reason is obvious - yet another Keeper.
            The gate at the bottom of the staircase is battered and worn, and dried blood stains what little wood remains upon the door. A tentative push on the door yields no results,
            the gate likely being too damaged to open properly. Instead the gate is forcefully opened, and the sight the greets your party's eyes is one of nightmares. Corpses litter the streets of a destroyed city,
            all in various stages of rot and decay. The corpses create countless scenes of desperation - rotting mothers futilely cradling their scorched children, a group of skeletons crowding by a door, dismembered hands 
            holding each other. A booming voice bellows from atop a slanted tower, "Willfully join them, and you may yet find peace - or I, Juvenius, will ensure your souls wander these halls endlessly."`
            enemyCont.appendChild(flavorText)

            turnCounter = 1
        } else if (enemyArr.length == 0 && turnCounter == 1) {
            await getEnemiesByThreat(bossEnemyArr[runInfoArr[0].level - 1])
            enemyCardFactory(enemyArr)
            infoAppend(`You have encountered ${enemyArr[0].name}!`)

            for (let i = 0; i < partyArr.length; i++) {
                console.log(`button time`)
                document.getElementById(`cat${partyArr[i].id}-buttons`).style.display = "flex";
            }

            let turnDisplay = document.createElement(`p`)
            turnDisplay.setAttribute(`class`, `game-text`)
            turnDisplay.setAttribute(`id`, `turn-display`)
            turnDisplay.innerHTML = `> turn:${turnCounter}`
            runInfoCont.appendChild(turnDisplay)

            combatBtn.innerHTML = `End Turn`
        } else {
            if (moveArr.length == alivePartyMems) {
               await combatLoop()
            } else {
                alert(`Select more actions!`)
            }
        }
    }
    //actually the threat 16 boss
    if (runInfoArr[0].level == 3) {
        if (turnCounter == 0) {
            enemyCont.replaceChildren()
            let flavorText = document.createElement(`p`)
            flavorText.setAttribute(`class`, `game-text`)
            flavorText.innerHTML = `A set of stairs leading upwards is simply something you do not see in the labyrinth, especially those constructed out of pristine marble and gold. This must be the domain 
            of the 6th Keeper, the rumoured "Scripter of Fate". A quiet walk to the top of stairs leads your party to a simple, yet elegantly decorated, door. With your party's weapons drawn, the door is slowly pushed open. 
            what greets them is not a wartorn hellscape or ethereal plane, but instead a lavish study. Behind its centrally placed desk sits a cat writing away on a book - each page filled top to bottom. Seemingly now alerted to your 
            presence, the cat looks upon your party and smiles. Discarding their pen and closing their book, they stand and greet your anxious party, "Ah excellent, I've been expecting you for awhile now, please, take a seat." as they motion to three 
            luxurious chairs opposite of their own. After your party begrudgingly takes their seats they continue, "Where are my manners? It seems I have forgotten to introduce myself, my name is Vernier, although you may know me better as "The Scripter of Fate"." 
            The cat, now identified as Vernier, continues to ramble, "Now, I know it may seem an outrageous request, but I would like to ask all of you to kill yourselves. It would save me a lot of trouble, seeing as any fight between us is already decided." 
            Your party members are shocked, and they immediately rise to their feet, weapons at the ready. Vernier is clearly annoyed by this, saying, "I would have liked to discuss your travels before of course, but it seems you have forced my hand...I will simply ask 
            your corpses!"`
            enemyCont.appendChild(flavorText)

            turnCounter = 1
        } else if (enemyArr.length == 0 && turnCounter == 1) {
            await getEnemiesByThreat(bossEnemyArr[runInfoArr[0].level - 1])
            enemyCardFactory(enemyArr)
            infoAppend(`You have encountered ${enemyArr[0].name}!`)

            for (let i = 0; i < partyArr.length; i++) {
                console.log(`button time`)
                document.getElementById(`cat${partyArr[i].id}-buttons`).style.display = "flex";
            }

            let turnDisplay = document.createElement(`p`)
            turnDisplay.setAttribute(`class`, `game-text`)
            turnDisplay.setAttribute(`id`, `turn-display`)
            turnDisplay.innerHTML = `> turn:${turnCounter}`
            runInfoCont.appendChild(turnDisplay)

            combatBtn.innerHTML = `End Turn`
        } else {
            if (moveArr.length == alivePartyMems) {
               await combatLoop()
            } else {
                alert(`Select more actions!`)
            }
        }
    }


})
