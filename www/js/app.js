// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ui.router', 'ngStorage','ui.materialize',])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'lib/views/login.html',
      controller: 'LoginCtrl'
    })
    .state('main', {
      url: '/main',
      templateUrl: 'lib/views/main.html',
      controller: 'MainCtrl'
    })
    .state('main.ventas', {
      url: '/misventas',
      templateUrl: 'lib/views/ventas.html',
      controller: 'VentasCtrl'
    })    
    .state('main.ventas.venta', {
      url: '/venta',
      templateUrl: 'lib/views/venta.html',
      controller: 'VentasCtrl'
    })  
    .state('main.ventas.lista', {
      url: '/ventas',
      templateUrl: 'lib/views/listaVentas.html',
      controller: 'VentasCtrl'
    }) 
    .state('main.createVenta', {
      url: '/createventa',
      templateUrl: 'lib/views/createVenta.html',
      controller: 'VentasCtrl'
    })
    .state('main.createVenta.paso1', {
      url: '/paso-1',
      templateUrl: 'lib/views/createVenta1.html',
      controller: 'VentasCtrl'
    })
    .state('main.createVenta.paso2', {
      url: '/paso-2',
      templateUrl: 'lib/views/createVenta2.html',
      controller: 'VentasCtrl'
    })
    .state('main.createVenta.paso3', {
      url: '/paso-3',
      templateUrl: 'lib/views/createVenta3.html',
      controller: 'VentasCtrl'
    })
    .state('main.createVenta.paso4', {
      url: '/paso-4',
      templateUrl: 'lib/views/createVenta4.html',
      controller: 'VentasCtrl'
    })
    .state('main.createVenta.paso5', {
      url: '/paso-5',
      templateUrl: 'lib/views/createVenta5.html',
      controller: 'VentasCtrl'
    })

    $urlRouterProvider.otherwise('login')
})

.controller('LoginCtrl', [
  '$scope', '$http', 'LoginFactory', '$state','$localStorage',
  function($scope, $http, LoginFactory, $state, $localStorage) {
    $scope.passError = true;
    $scope.userError = true;

    if ($localStorage.userData) {
      $scope.userData = $localStorage.userData;
      $scope.sideBar = false;
      $state.go('main.ventas.lista');
    };

    $scope.login = function(user, pass) {
      var loginTrue = LoginFactory.login(user, pass);

      if(loginTrue == true){
        $scope.passError = true;
        $scope.userError = true;
        $scope.userData = LoginFactory.setUser(user, pass);
        $state.go('main.ventas.lista');
      }else{
        if (loginTrue == 'userFalse') {
          $scope.userError = false;
          $scope.passError = true;
        }else{
          $scope.passError = false;
          $scope.userError = true;
        }        
      }    

    }
}])

.controller('MainCtrl',['$scope','$localStorage','$state', 'VentasFactoty', function($scope, $localStorage, $state, VentasFactoty) {
  if ($localStorage.userData) {
    $scope.userData = $localStorage.userData;
  }

  $scope.logout = function() {
    delete $localStorage.userData;
    $state.go('login');
  }

}])

.controller('VentasCtrl',['$scope','$localStorage','$state', 'VentasFactoty', function($scope, $localStorage, $state, VentasFactoty) {

  var currentTime = new Date();
  $scope.currentTime = currentTime;
  $scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  $scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  $scope.disable = [false, 1, 7];
  $scope.today = 'Today';
  $scope.clear = 'Clear';
  $scope.close = 'Close';
  var days = 15;
  $scope.minDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
  $scope.maxDate = (new Date($scope.currentTime.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();
  /*$scope.onStart = function () {
      console.log('onStart');
  };
  $scope.onRender = function () {
      console.log('onRender');
  };
  $scope.onOpen = function () {
      console.log('onOpen');
  };
  $scope.onClose = function () {
      console.log('onClose');
  };
  $scope.onSet = function () {
      console.log('onSet');
  };
  $scope.onStop = function () {
      console.log('onStop');
  };*/

  $scope.ventaNew = $localStorage.ventaNew;  

  $scope.venta = VentasFactoty.getVenta();

  $scope.clientes = [
    {
      nombre: 'Blagley',
      id: 1
    },
    {
      nombre: 'Guaymallen',
      id: 2
    },
    {
      nombre: 'Terepin',
      id: 3
    }
  ];

  $scope.franjas = [
    {
      hora: '07hs - 12 hs',
      id: 1
    },
    {
      hora: '12hs - 17 hs',
      id: 2
    },
    {
      hora: '17hs - 22 hs',
      id: 3
    }
  ];

  $scope.tipoTransporte = [
    {
      tipo: 'Refineria',
      id: 1
    },
    {
      tipo: 'Cliente',
      id: 2
    },
    {
      tipo: 'Tercero',
      id: 3
    }
  ];

  $scope.direcciones = [
    {
      direccion: 'Av. Cordoba 56',
      id: 1
    },
    {
      direccion: 'Guemes 5410',
      id: 2
    },
    {
      direccion: 'Otro',
      id: 3
    }
  ];

  $scope.productos = [
    {
      nombre: 'Hálcon',
      cantidad: 5,
      tipoCantidad: 'kg',
      precioUnitario: 40
    },
    {
      nombre: 'Hurricane',
      cantidad: 10,
      tipoCantidad: 'kg',
      precioUnitario: 50
    },
    {
      nombre: 'Primicia',
      cantidad: 50,
      tipoCantidad: 'kg',
      precioUnitario: 100
    }
  ];

  $scope.tiposVentas = [
    {
      tipo: 1
    },
    {
      tipo: 2
    },
    {
      tipo: 3
    }
  ];

  $scope.ventas = VentasFactoty.getVentas();
  $scope.newProducto = $localStorage.newProducto;

  $scope.clienteError = true;
  $scope.franjaError = true;
  $scope.fechaError = true;
  $scope.transporteError = true;
  $scope.direccionError = true;
  $scope.productoError = true;
  $scope.cantidadError = true;
  $scope.precioError = true;
  $scope.tipoVentaError = true;

  $scope.createVenta = function() {    

    $localStorage.ventaNew = {
      cliente: null,
      hora: null,
      trasporte: null,
      direccion: null,
      fecha: '',
      productos: []
    };
    $state.go('main.createVenta.paso1');
  }

  $scope.getVenta = function(id) {
    for (var i = 0; i < $scope.ventas.length; i++) {
      if($scope.ventas[i].id == id) {
        VentasFactoty.setVenta($scope.ventas[i]);
      }
    }
    $state.go('main.ventas.venta');
  }

  $scope.setCliente = function(cli) {
    console.log($scope.cliente);
    var clienteAux;
    for (var i = 0; i < $scope.clientes.length; i++) {
      if(cli == $scope.clientes[i].id) {
        clienteAux = $scope.clientes[i];
      }      
    };
    $localStorage.ventaNew.cliente = clienteAux;  
  }

  $scope.setFranja = function(franja) {
    var franjaAux;
    for (var i = 0; i < $scope.franjas.length; i++) {
      if(franja == $scope.franjas[i].id) {
        franjaAux = $scope.franjas[i];
      }      
    };
    $localStorage.ventaNew.hora = franjaAux.hora;    
  }

  $scope.setTransporte = function(trasporte) {
    var traspAux;
    for (var i = 0; i < $scope.tipoTransporte.length; i++) {
      if(trasporte == $scope.tipoTransporte[i].id) {
        traspAux = $scope.tipoTransporte[i];
      }      
    };
    $localStorage.ventaNew.trasporte = traspAux;
  }

  $scope.setDireccion = function(direccion) {
    var direAux;
    for (var i = 0; i < $scope.direcciones.length; i++) {
      if(direccion == $scope.direcciones[i].id) {
        direAux = $scope.direcciones[i];
      }      
    };
    $localStorage.ventaNew.direccion = direAux;
  }

  $scope.setProducto = function(producto) {
    var prodAux;
    for (var i = 0; i < $scope.productos.length; i++) {
      if(producto == $scope.productos[i].nombre) {
        prodAux = $scope.productos[i];
        $localStorage.newProducto = $scope.productos[i];
      }      
    };
  }  

  $scope.setTipoProducto = function(tipo) {
    var tipoAux;
    for (var i = 0; i < $scope.tiposVentas.length; i++) {
      if(tipo == $scope.tiposVentas[i].tipo) {
        tipoAux = $scope.tiposVentas[i];
      }      
    };
    $localStorage.ventaNew.tipoVenta = tipoAux;
  }


  $scope.createPaso1 = function() {
    if($localStorage.ventaNew.cliente != null) {
      if($localStorage.ventaNew.hora != null) {
        $scope.clienteError = true;
        $scope.franjaError = true;
        $state.go('main.createVenta.paso2');
      }else{
        $scope.franjaError = false;
        $scope.clienteError = true;
      };
    }else{
      $scope.clienteError = false;
      $scope.franjaError = true;
    };
  }

  $scope.createPaso2 = function() {
    console.log($scope.currentTime)
    if($localStorage.ventaNew.trasporte != null) {
      if($localStorage.ventaNew.direccion != null) {
        if ($scope.currentTime != '') {
          $localStorage.ventaNew.fecha = moment($scope.currentTime).format('DD/MM/YYYY');
          $scope.fechaError = true;
          $scope.clienteError = true;
          $scope.franjaError = true;
          $state.go('main.createVenta.paso3');
        }else{
          $scope.transporteError = true;
          $scope.direccionError = true;
          $scope.fechaError = false;
        }
      }else{
        $scope.fechaError = true;
        $scope.transporteError = true;
        $scope.direccionError = false;
      }
    }else{
      $scope.fechaError = true;
      $scope.transporteError = false;
      $scope.direccionError = true;
    };
  }
  $scope.createPaso3 = function() {
    console.log($scope.prod)
    if($scope.prod != null) {
      if($scope.cantidadProducto != null) {        
        $localStorage.newProducto.cantidad  = $scope.cantidadProducto;
        $scope.productoError = true;
        $scope.cantidadError = true;
        $state.go('main.createVenta.paso4');  
      }else{
        $scope.productoError = true;
        $scope.cantidadError = false;
      }
    }else{
      $scope.productoError = false;
      $scope.cantidadError = true;
    };
  }

  $scope.createPaso4 = function() {
    if($scope.precio != '') {
      if($scope.tipoVenta != null) {
        console.log($scope.precio,'dfs');        
        $localStorage.newProducto.precioUnitario = $scope.precio;
        $scope.precioError = true;
        $scope.tipoVentaError = true;
        $state.go('main.createVenta.paso5');  
      }else{
        $scope.precioError = true;
        $scope.tipoVentaError = false;
      }
    }else{
      $scope.tipoVentaError = true;
      $scope.precioError = false;
    }
  }

  $scope.createPaso5 = function() {
    if($scope.comentario != null) {
      $localStorage.ventaNew.comentario = $scope.comentario;
    }else{
      $localStorage.ventaNew.comentario = ' ';      
    }
    $localStorage.ventaNew.productos.push($localStorage.newProducto);
    $localStorage.ventas.push($localStorage.ventaNew);
    $state.go('main.ventas.createPaso1');
  }

  $scope.endCreate = function() {
    if($scope.comentario != null) {
      $localStorage.ventaNew.comentario = $scope.comentario;
    }else{
      $localStorage.ventaNew.comentario = ' ';      
    }
    $localStorage.ventaNew.productos.push($localStorage.newProducto);
    $localStorage.ventas.push($localStorage.ventaNew);
    $state.go('main.ventas.lista');
  }

}])


.factory('LoginFactory', function($http, $localStorage) {
  var factory = {};
  factory.login = function(user, pass) {
      if (user == 'admin') {
        if (pass == 'admin') {
          return true;
        }else{
          return 'passFalse';
        }
      }else{
        return 'userFalse';        
      }
    }

  factory.setUser = function(user,pass) {
    var userData = {
      userName : user,
      password: pass
    }

    $localStorage.userData = userData;
    return $localStorage.userData;
  }
  return factory;
})

.factory('VentasFactoty', function($http, $localStorage) {
  var factory = {};

  factory.getVentas = function() {
    var vtas = [
      {
        id: 1,
        fecha: '24/06/2016',
        hora: '17:00',
        cliente: 'Bagley',
        nroPedido: 1714,
        productos: [
          {
            nombre: 'Hálcon',
            cantidad: 5,
            tipoCantidad: 'kg',
            precioUnitario: 40
          },
          {
            nombre: 'Hurricane',
            cantidad: 10,
            tipoCantidad: 'kg',
            precioUnitario: 50
          },
          {
            nombre: 'Primicia',
            cantidad: 50,
            tipoCantidad: 'kg',
            precioUnitario: 100
          }
        ]

      },
      {
        id: 2,
        fecha: '24/06/2016',
        hora: '17:00',
        cliente: 'Bagley',
        nroPedido: 1714,
        productos: [
          {
            nombre: 'Hálcon',
            cantidad: 5,
            tipoCantidad: 'kg',
            precioUnitario: 40
          },
          {
            nombre: 'Hurricane',
            cantidad: 10,
            tipoCantidad: 'kg',
            precioUnitario: 50
          },
          {
            nombre: 'Primicia',
            cantidad: 50,
            tipoCantidad: 'kg',
            precioUnitario: 100
          }
        ]

      },
      {
        id: 3,
        fecha: '24/06/2016',
        hora: '17:00',
        cliente: 'Bagley',
        nroPedido: 1714,
        productos: [
          {
            nombre: 'Hálcon',
            cantidad: 5,
            tipoCantidad: 'kg',
            precioUnitario: 40
          },
          {
            nombre: 'Hurricane',
            cantidad: 10,
            tipoCatntidad: 'kg',
            precioUnitario: 50
          },
          {
            nombre: 'Primicia',
            cantidad: 50,
            tipoCantidad: 'kg',
            precioUnitario: 100
          }
        ]

      },
      {
        id: 4,
        fecha: '24/06/2016',
        hora: '17:00',
        cliente: 'Bagley',
        nroPedido: 1714,
        productos: [
          {
            nombre: 'Hálcon',
            cantidad: 5,
            tipoCantidad: 'kg',
            precioUnitario: 40
          },
          {
            nombre: 'Hurricane',
            cantidad: 10,
            tipoCantidad: 'kg',
            precioUnitario: 50
          },
          {
            nombre: 'Primicia',
            cantidad: 50,
            tipoCantidad: 'kg',
            precioUnitario: 100
          }
        ]

      }
    ]

    if($localStorage.ventas == null) {
      $localStorage.ventas = vtas;   
    }
    return $localStorage.ventas;
  }

  factory.setVenta = function(venta) {
    $localStorage.venta = venta;
  }

  factory.getVenta = function() {
    return $localStorage.venta;
  }

  factory.setNewVenta = function(venta) {
    $localStorage.ventas.push(venta);
    return $localStorage.ventas;
  }

  return factory;
})