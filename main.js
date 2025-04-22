
let manager = new GameStateManager();
let player_billed;
let basic_billed;
let qSlash_billed;
let boots_billed;
let goblin_billed;
let playerV_billed;
let qSlash_icon;
let E1_billed;
let background_billed;
let thunderbeam_ikon1;
let Life_ikon;
let Regen_ikon;
let Armor_ikon;
let AtkSpd_ikon;
let Dmg_ikon;
let Haste_ikon;
let qSlash_ikonL;
let E1Ikon;
function preload () {
  E1Ikon = loadImage('Assets/E1Ikon.png');
  thunderbeam_ikon1 = loadImage('Assets/Thunder Beam.png');
  player_billed = loadImage('Assets/Char.png');
  qSlash_billed = loadImage('Assets/Slashes.png');
  qSlash_ikonL = loadImage('Assets/Slashes.png');
  boots_billed = loadImage('Assets/Boots.png');
  goblin_billed = loadImage('Assets/Goblin.png');
  playerV_billed = loadImage('Assets/Venstre.png');
  qSlash_icon = loadImage('Assets/Slashes.png');
  basic_billed = loadImage('Assets/Basic.png');
  E1_billed = loadImage('Assets/E1Photo.png');
  background_billed = loadImage('Assets/Background.png');
  Life_ikon = loadImage('Assets/LifeIkon.png');
  Regen_ikon = loadImage('Assets/RegenIkon.png');
  Armor_ikon = loadImage('Assets/ArmorIkon.png');
  AtkSpd_ikon = loadImage('Assets/AtkSpdIkon.png');
  Haste_ikon = loadImage('Assets/HasteIkon.png');
  Dmg_ikon = loadImage('Assets/DmgIkon.png');
}
function setup() {
    createCanvas(1535, 772);
    qSlash_icon.resize(30,30);
    qSlash_ikonL.resize(400,400);
    E1_billed.resize(5000,75);
    manager.opretGameState("menu", new MenuSkærm());
    manager.opretGameState("spil", new SpilSkærm());
    manager.opretGameState("slut", new SlutSkærm());
    manager.skiftGameState("menu");
    print(manager.skærme);
}
function draw() {
  manager.runState();
}
function mouseClicked(){
  manager.aktuelleSkærm.musKlikket();
}

