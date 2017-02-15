
var app = {

  inicio: function() {

    this.iniciaBotones();
    var user = window.localStorage.getItem("user");
    var password = window.localStorage.getItem("password");

    if (user != null){
      app.horario(user,password);
    }
  },

  iniciaBotones: function(){


    var dia1 = document.querySelector('#dia1');
    dia1.addEventListener('click', function(){app.grupo('dia1');},false);

    var dia2 = document.querySelector('#dia2');
    dia2.addEventListener('click', function(){app.grupo('dia2');},false);

    var dia3 = document.querySelector('#dia3');
    dia3.addEventListener('click', function(){app.grupo('dia3');},false);

    var dia4 = document.querySelector('#dia4');
    dia4.addEventListener('click', function(){app.grupo('dia4');},false);

    var volver = document.querySelector("#volver");
    volver.addEventListener('click', this.volver, false);

    var back = document.querySelector("#back");
    back.addEventListener('click', this.volver, false);

    var add = document.querySelector("#add");
    add.addEventListener('click', this.add, false);

    var salir = document.querySelector("#salir");
    salir.addEventListener('click', this.salir, false);

    var logout = document.querySelector("#logout");
    logout.addEventListener('click', this.logout, false);

    var ver = document.querySelector("#ver");
    ver.addEventListener('click', this.ver,false);

  },

  login: function() {

    var user = document.getElementById("user").value;
    var password = document.getElementById("password").value;

    window.localStorage.setItem("user",user);
    window.localStorage.setItem("password",password);

    app.horario(user,password); 
  },


  horario: function(user,password) {
    var peticion = 'http://pilatesmanzaneque.es/login.php?user=' + user +'&password=' + password;


      $.getJSON(peticion,function(data){
          console.log(JSON.stringify(data));

          $(data).each(function(index, data) {
              if (data.usuario){
                document.getElementById("bienvenido").innerHTML = "Bienvenid@ " +data.nombre + " " + data.apellido;
                document.getElementById("dia1").innerHTML = app.dia(data.diahora1);
                document.getElementById("dia1").href = app.link(data.diahora1,user);

                document.getElementById("dia2").innerHTML = app.dia(data.diahora2);
                document.getElementById("dia2").href = app.link(data.diahora2,user);

                document.getElementById("dia3").innerHTML = app.dia(data.diahora3);
                document.getElementById("dia3").href = app.link(data.diahora3,user);

                document.getElementById("dia4").innerHTML = app.dia(data.diahora4);
                document.getElementById("dia4").href = app.link(data.diahora4,user);

                document.getElementById("login").style.display = "none";
                document.getElementById("grupo").style.display = "none";
                document.getElementById("horarios").style.display = "block";
                document.getElementById("logout").style.display = "block";
                document.getElementById("tabla").style.display = "none";

              } else{
                alert("Usuario o contraseña incorrectos");
                document.getElementById("password").value = "";
              } 

          });
      });
  },


  dia: function(horario) {
      var day = horario.substring(0,1);
      var hora = horario.substring(2,7);

      if (day == "L") {
        var dia = "Lunes";
      } else if(day == "M") {
        var dia = "Martes";
      } else if(day == "X") {
        var dia = "Miércoles";
      } else if(day == "J"){
        var dia = "Jueves";
      } else {
        var dia = "";
      }

      var answer = dia + " " + hora;

      return answer;
  },

  link: function(horario,user) {
    var enlace = "http://pilatesmanzaneque.es/group.php?diahora=" + horario + "&user=" + user;
    return enlace;
  },

  grupo: function(dia){
    var hora = document.getElementById(dia).innerHTML;
    var peticion = document.getElementById(dia).href ;

    $.getJSON(peticion,function(data){
        console.log(JSON.stringify(data));

        $(data).each(function(index,data) {
          document.getElementById("hora").innerHTML = hora;
          document.getElementById("plazas").innerHTML = "Quedan " + data.plazas + " plazas.";
          document.getElementById("mens").innerHTML = data.mens;

          if (data.pert == 1){
            document.getElementById("pert").innerHTML = "Ya pertenece a este grupo";
          }


        });
    });

    document.getElementById("horarios").style.display = "none";
    document.getElementById("grupo").style.display = "block";
    document.getElementById("logout").style.display = "none";
    document.getElementById("tabla").style.display = "none";
  },

  volver: function(){
    var user = window.localStorage.getItem("user");
    var password = window.localStorage.getItem("password");

    app.horario(user,password);
  },

  logout: function(){
    window.localStorage.clear();

    document.getElementById("login").style.display = "block";
    document.getElementById("horarios").style.display = "none";
    document.getElementById("logout").style.display = "none";
    document.getElementById("user").value = "";
    document.getElementById("password").value = "";
   },

   add: function() {
    var user = window.localStorage.getItem("user");
    var raw = document.getElementById("hora").innerHTML;
    var hour = app.diahora(raw);

    var peticion = "http://pilatesmanzaneque.es/group.php?diahora="+hour+"&user="+user+"&send=add";


       $.getJSON(peticion,function(data){
        console.log(JSON.stringify(data));

        $(data).each(function(index,data) {
          document.getElementById("hora").innerHTML = raw;
          document.getElementById("plazas").innerHTML = "Quedan " + data.plazas + " plazas.";
          document.getElementById("mens").innerHTML = data.mens;

          if (data.pert == 1){
            document.getElementById("pert").innerHTML = "Ya pertenece a este grupo";
          } else {
            document.getElementById("pert").innerHTML = "";
          }


        });
    });
   },

   salir: function() {
    var user = window.localStorage.getItem("user");
    var raw = document.getElementById("hora").innerHTML;
    var hour = app.diahora(raw);

    var peticion = "http://pilatesmanzaneque.es/group.php?diahora="+hour+"&user="+user+"&send=salir";


       $.getJSON(peticion,function(data){
        console.log(JSON.stringify(data));

        $(data).each(function(index,data) {
          document.getElementById("hora").innerHTML = raw;
          document.getElementById("plazas").innerHTML = "Quedan " + data.plazas + " plazas.";
          document.getElementById("mens").innerHTML = data.mens;

          if (data.pert == 1){
            document.getElementById("pert").innerHTML = "Ya pertenece a este grupo";
          } else {
            document.getElementById("pert").innerHTML = "";
          }


        });
    });
   },


   diahora: function(horario) {
    var n = horario.length; 
    var start = n-6;
    var begin = n-5;

    var day = horario.substring(0,start);
    var hour = horario.substring(begin,n);

      if (day == "Lunes") {
        var dia = "L";
      } else if(day == "Martes") {
        var dia = "M";
      } else if(day == "Miércoles") {
        var dia = "X";
      } else if(day == "Jueves"){
        var dia = "J";
      } else {
        var dia = "";
      }

      var answer = dia + "("+ hour + ")";

      return answer;

   },

   tabla: function(hora) {

    var user = window.localStorage.getItem("user");
    var peticion = "http://pilatesmanzaneque.es/group.php?diahora=" + hora + "&user=" + user;

    $.getJSON(peticion,function(data){
        console.log(JSON.stringify(data));

        $(data).each(function(index,data) {
          document.getElementById("hora").innerHTML = app.dia(hora);
          document.getElementById("plazas").innerHTML = "Quedan " + data.plazas + " plazas.";
          document.getElementById("mens").innerHTML = data.mens;

          if (data.pert == 1){
            document.getElementById("pert").innerHTML = "Ya pertenece a este grupo";
          }


        });
    });

    document.getElementById("horarios").style.display = "none";
    document.getElementById("grupo").style.display = "block";
    document.getElementById("logout").style.display = "none";
    document.getElementById("tabla").style.display = "none";
   },

   ver: function() {
    document.getElementById("tabla").style.display = "block";
    document.getElementById("horarios").style.display = "none";
    document.getElementById("grupo").style.display = "none";
    document.getElementById("logout").style.display = "none";
   }

};

if ('addEventListener' in document) {
  document.addEventListener("deviceready", function() {
    app.inicio();
  }, false);
};





