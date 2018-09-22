
var app = {

  inicio: function() {

    this.iniciaBotones();
    var user = window.localStorage.getItem("user");
    var password = window.localStorage.getItem("password");
    //window.addEventListener('orientationchange',  app.rotacion(),  false);


    if (user != null){
      app.horario(user,password);
    } else {
      document.getElementById("login").style.display = "block";
    }
  },

  /*iniciaHeader: function() {
    var ancho = document.documentElement.clientWidth;

    if (ancho <= 500) {
        document.getElementById("header").className = "header";
    }else{
        document.getElementById("header").className = "header-big";
    }

  },*/

  iniciaBotones: function(){
    var entrar = document.querySelector('#entrar');
    entrar.addEventListener('click', this.login, false);

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

    var add = document.querySelector("#add");
    add.addEventListener('click', this.add, false);

    var salir = document.querySelector("#salir");
    salir.addEventListener('click', this.salir, false);

    var logout = document.querySelector("#logout");
    logout.addEventListener('click', this.logout, false);

    var ver = document.querySelector("#ver");
    ver.addEventListener('click', this.ver,false);

    var cuenta = document.querySelector("#cuenta");
    cuenta.addEventListener('click', this.cuenta, false);

    var out = document.querySelector("#out");
    out.addEventListener('click', this.out, false);

    var forgot = document.querySelector("#forgot");
    forgot.addEventListener('click', function(){
      alert("Para recuperar su contraseña, entre en www.pilatesmanzaneque.es");
    },false);

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
                document.getElementById("bienvenido").innerHTML = "Hola " +data.nombre + " " + data.apellido;

                if(data.diahora1 =="") {
                  document.getElementById("dia1").style.display = "none";
                } else{
                  document.getElementById("dia1").style.display = "block";
                }
                document.getElementById("dia1").innerHTML = app.dia(data.diahora1);
                document.getElementById("dia1").title = app.link(data.diahora1,user);

                if(data.diahora2 =="") {
                  document.getElementById("dia2").style.display = "none";
                } else{
                  document.getElementById("dia2").style.display = "block";
                }
                document.getElementById("dia2").innerHTML = app.dia(data.diahora2);
                document.getElementById("dia2").title = app.link(data.diahora2,user);


                if(data.diahora3 =="") {
                  document.getElementById("dia3").style.display = "none";
                } else{
                  document.getElementById("dia3").style.display = "block";
                }
                document.getElementById("dia3").innerHTML = app.dia(data.diahora3);
                document.getElementById("dia3").title = app.link(data.diahora3,user);


                if(data.diahora4 =="") {
                  document.getElementById("dia4").style.display = "none";
                } else{
                  document.getElementById("dia4").style.display = "block";
                }
                document.getElementById("dia4").innerHTML = app.dia(data.diahora4);
                document.getElementById("dia4").title = app.link(data.diahora4,user);

                document.getElementById("login").style.display = "none";
                document.getElementById("grupo").style.display = "none";
                document.getElementById("horarios").style.display = "block";
                document.getElementById("exit").style.display = "none";
                document.getElementById("tabla").style.display = "none";
                document.getElementById("tabla1").style.display = "none";
                document.getElementById("tabla1").style.display = "none";
                document.getElementById('tabla2').style.display ='none';

              } else{
              	window.localStorage.clear();
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
    var peticion = document.getElementById(dia).title ;

    $.getJSON(peticion,function(data){
        console.log(JSON.stringify(data));

        $(data).each(function(index,data) {
          document.getElementById("hora").innerHTML = hora;
          document.getElementById("plazas").innerHTML = "Quedan " + data.plazas + " plazas.";
          document.getElementById("mens").innerHTML = data.mens;

          if (data.pert == 1){
            document.getElementById("pert").innerHTML = "Ya pertenece a este grupo";
          } else {
            document.getElementById("pert").innerHTML = "";
          }

          if (data.plazas <= 0 ) {
            document.getElementById("add").style.visibility = "hidden";
          } else {
          	document.getElementById("add").style.visibility = "visible";
          }


        });
    });

    document.getElementById("horarios").style.display = "none";
    document.getElementById("grupo").style.display = "block";
    document.getElementById("exit").style.display = "none";
    document.getElementById("tabla").style.display = "none";
    document.getElementById("tabla1").style.display = "none";
    document.getElementById('tabla2').style.display ='none';
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
    document.getElementById("exit").style.display = "none";
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
          } else {
            document.getElementById("pert").innerHTML = "";
          }


          if (data.plazas <= 0 ) {
            document.getElementById("add").style.visibility = "hidden";
          } else {
          	document.getElementById("add").style.visibility = "visible";
          }


        });
    });

    document.getElementById("horarios").style.display = "none";
    document.getElementById("grupo").style.display = "block";
    document.getElementById("exit").style.display = "none";
    document.getElementById("tabla").style.display = "none";
    document.getElementById("tabla1").style.display = "none";
    document.getElementById('tabla2').style.display ='none';
   },

   ver: function() {

    if (window.localStorage.getItem("user") != null){
        ancho = document.documentElement.clientWidth;

        if (ancho <= 500) {
            document.getElementById("tabla").style.display = "block";
        }else{
            document.getElementById("tabla").style.display = "block";
        }
        document.getElementById("horarios").style.display = "none";
        document.getElementById("grupo").style.display = "none";
        document.getElementById("exit").style.display = "none";
      } else {
        alert('Debe iniciar sesión para ver los horarios');
      }
   },

   cuenta: function(){
        if(window.localStorage.getItem("user") != null){
                    var peticion = 'http://pilatesmanzaneque.es/login.php?user=' + window.localStorage.getItem("user") +'&password=' + window.localStorage.getItem("password");

                    $.getJSON(peticion,function(data){
                        console.log(JSON.stringify(data));

                        $(data).each(function(index, data) {
                            if (data.usuario){
                              document.getElementById("bienvenido").innerHTML = "Hola " +data.nombre + " " + data.apellido;

                              if(data.diahora1 =="") {
                                document.getElementById("dia1").style.display = "none";
                              } else{
                                document.getElementById("dia1").style.display = "block";
                              }
                              document.getElementById("dia1").innerHTML = app.dia(data.diahora1);
                              document.getElementById("dia1").title = app.link(data.diahora1,user);

                              if(data.diahora2 =="") {
                                document.getElementById("dia2").style.display = "none";
                              } else{
                                document.getElementById("dia2").style.display = "block";
                              }
                              document.getElementById("dia2").innerHTML = app.dia(data.diahora2);
                              document.getElementById("dia2").title = app.link(data.diahora2,user);


                              if(data.diahora3 =="") {
                                document.getElementById("dia3").style.display = "none";
                              } else{
                                document.getElementById("dia3").style.display = "block";
                              }
                              document.getElementById("dia3").innerHTML = app.dia(data.diahora3);
                              document.getElementById("dia3").title = app.link(data.diahora3,user);


                              if(data.diahora4 =="") {
                                document.getElementById("dia4").style.display = "none";
                              } else{
                                document.getElementById("dia4").style.display = "block";
                              }
                              document.getElementById("dia4").innerHTML = app.dia(data.diahora4);
                              document.getElementById("dia4").title = app.link(data.diahora4,user);

                              document.getElementById("login").style.display = "none";
                              document.getElementById("grupo").style.display = "none";
                              document.getElementById("horarios").style.display = "block";
                              document.getElementById("exit").style.display = "none";
                              document.getElementById("tabla").style.display = "none";
                              document.getElementById("tabla1").style.display = "none";
                              document.getElementById("tabla1").style.display = "none";
                              document.getElementById('tabla2').style.display ='none';

                            } 

                        });
                    });
              }
   },

   out: function() {
      if(window.localStorage.getItem("user") != null){
                document.getElementById("login").style.display = "none";
                document.getElementById("grupo").style.display = "none";
                document.getElementById("horarios").style.display = "none";
                document.getElementById("exit").style.display = "block";
                document.getElementById("tabla").style.display = "none";
                document.getElementById("tabla1").style.display = "none";
                document.getElementById("tabla1").style.display = "none";
                document.getElementById('tabla2').style.display ='none';
      } else {
        alert("No ha iniciado sesión");
      }
   },

   siguiente: function() {
      document.getElementById('tabla1').style.display ='none';
      document.getElementById('tabla2').style.display ='block';
   },

   anterior: function() {
    document.getElementById('tabla1').style.display ='block';
    document.getElementById('tabla2').style.display ='none';
   },

   /*rotacion: function () {
    var ancho = document.documentElement.clientWidth;
    var header = document.getElementById("header").className;

    if (ancho <=500 && header == "header") {
      document.getElementById("header").className = "header-big";
    } else if (ancho <= 500 && header == "header-big")  {
      document.getElementById("header").className= "header";
    }


   }*/

};

if ('addEventListener' in document) {
  document.addEventListener("deviceready", function() {
    app.inicio();
  }, false);
};

document.addEventListener("offline", function(){
  alert('Ups, parece que no hay conexión a internet');
}, false);

document.addEventListener("backbutton", function(){
  app.volver();
}, false);
