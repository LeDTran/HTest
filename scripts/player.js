var Player = function(name)
{   this.name = name;
    this.inningPitch = 'None';


    //DUMMY 0, Pi (1), Ca (2), 1B (3), 2B (4), 3B (5), SS (6), LF (7), CF (8), RF (9)   
    //Preferred positions
    this.preferPos = [false,false,false,false,false,false,false,false,false,false];
    //Avoided positions
    this.avoidPos = [false,false,false,false,false,false,false,false,false,false];
    this.posPlaytime = [100,0,0,0,0,0,0,0,0,0];

    this.showPrefer = true;
    this.showAvoid = true;
}

var initializePlayers = function(){
    var myPlayers = [];
    var p1 = new Player('P1 Sally');
    p1.preferPos=[false,true,true,true,false,false,false,true,true,true];
    myPlayers.push(p1);

    var p2 = new Player('P2 Jim');
    p2.preferPos=[false,true,false,true,false,true,false,true,true,true];
    myPlayers.push(p2);

    var p3 = new Player('P3 Mike');
    p3.preferPos=[false,true,true,true,false,true,true,true,true,true];
    myPlayers.push(p3);

    var p4 = new Player('P4 Lucy');
    p4.preferPos=[false,true,true,true,false,true,false,true,true,true];
    myPlayers.push(p4);

    var p5 = new Player('P5 Nathan');
    p5.preferPos=[false,true,true,true,false,false,false,true,true,false];
    myPlayers.push(p5);

    var p6 = new Player('P6 Clarissa');
    p6.preferPos=[false,true,true,true,true,false,false,false,true,true];
    myPlayers.push(p6);

    var p7 = new Player('P7 Chang');
    p7.preferPos=[false,false,false,true,false,false,false,true,false,true];
    myPlayers.push(p7);
    
    var p8 = new Player('P8 Esperanza');
    p8.preferPos=[false,true,false,true,false,false,false,true,false,false];
    myPlayers.push(p8);

    var p9 = new Player('P9 Sukimoto');
    p9.preferPos=[false,true,false,true,false,false,false,true,false,false];
    myPlayers.push(p9);

    return myPlayers;
}
