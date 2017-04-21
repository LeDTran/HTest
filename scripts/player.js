var Player = function(name)
{   this.name = name;
    this.psyhp = 100;
    this.coghp = 200;
    this.physhp = 300;
    this.inningPitch = 'None';

    //Preferred positions
    //DUMMY 0, Pi 1, Ca 2, 1B 3, 2B 4, 3B 5, SS 6, LF 7, CF 8, RF 9    
    this.preferPos = [false,true,true,true,false,false,false,true,true,true];

    //Avoided positions
    this.avoidPos = [false,false,false,false,true,true,true,false,false,false];

}

