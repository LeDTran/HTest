var Player = function(name)
{   this.name = name;
    this.psyhp = 100;
    this.coghp = 200;
    this.physhp = 300;
    this.inningPitch = 'None';

    //Prefer
    this.preferPi = false;
    this.preferCa = false;
    this.prefer1B = false;
    this.prefer2B = false;
    this.prefer3B = false;
    this.preferSS = false;
    this.preferLF = false;
    this.preferCF = false;
    this.preferRF = false;

    //Avoid
    this.avoidPi = false;
    this.avoidCa = false;
    this.avoid1B = false;
    this.avoid2B = false;
    this.avoid3B = false;
    this.avoidSS = false;
    this.avoidLF = false;
    this.avoidCF = false;
    this.avoidRF = false;
}