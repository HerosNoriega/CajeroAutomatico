var imagenes = [];
imagenes['1'] = "1.png";
imagenes['2'] = "2.png";
imagenes['5'] = "5.png";
imagenes['10'] = "10.png";
imagenes['20'] = "20.png";
imagenes['50'] = "50.png";
imagenes['100'] = "100.png";

/**
 *Clase Billete con propiedades y metodos
 * */
class Billete {
    constructor(valor, cantidad) {
        this.imagen = new Image();
        this.valor = valor;
        this.cantidad = cantidad;

        this.imagen.src = imagenes[this.valor];
    }

    retirarEfectivo()
    {
        document.body.appendChild(this.imagen);
    }

    restar(c)
    {
        this.cantidad -= c;
    }

    agregar(a)
    {
        this.cantidad += a;
    }
}

/**
 * Clase Historia con sus propiedades
 * transaccion guarda el numero de transaccion operada empezando
 * desde 1
 *
 * date guarda la fecha en que se genera la transaccion en formato
 * Mes/Dia/Año Hora:Minuto:Segundo
 *
 * retirado guarda la cantidad retirada
 * */
class Historial {
    constructor(retirado, transaccion) {
        this.transaccion = transaccion;
        this.date = new Date();
        this.retirado = retirado;
    }
}


/**
 * caja guarda la cantidad disponible de billetes
 * entregado guarda las transacciones con los billetes retirados
 * retiros guarda un registro de la transaccion con detalles de fecha y tiempo
 * 
 * */
var caja = [];
var entregado = [];
var retiros = [];

caja.push(new Billete(100, 15));
caja.push(new Billete(50, 30));
caja.push(new Billete(20, 20));
caja.push(new Billete(10, 20));
caja.push(new Billete(5, 10));
caja.push(new Billete(2, 10));
caja.push(new Billete(1, 10));

/**
 * 
 * */
var dinero = 0;
var div = 0;
var papeles = 0;
var retiroExitoso = false;
var retiro;
var transaccion = 0;

var resultado = document.getElementById("resultado");
var b = document.getElementById("extraer");
b.addEventListener("click", entregarDinero);


/**
 * efectivoDisponible
 * calcula la cantidad disponible en efectivo dependiendo de los
 * billetes disponibles
 * */
function efectivoDisponible()
{
    var total = 0;
    for (var billete of caja)
    {
        total = total + (billete.valor * billete.cantidad);
    }

    return total;
}

console.log("Efectivo disponible: " + efectivoDisponible());

function entregarDinero()
{
    var t = document.getElementById("dinero");

    /*
     * variable dinero se guarda la cantidad a retirar
     * a ser usada en la iteracion que corre el array de caja
     *
     * variable retiro se guarda el valor de dinero sin afectar
     * ya que este valor se usara en dado caso la operacion sea realizada
     * con exito
     */
    dinero = parseInt(t.value);
    retiro = dinero;

    console.log("Dinero a retirar: " + dinero);
    if (dinero <= efectivoDisponible()) {
        for (var bi of caja) {
            if (dinero > 0) {
                div = Math.floor(dinero / bi.valor);
                if (div > bi.cantidad) {
                    papeles = bi.cantidad;
                } else {
                    papeles = div;
                }
                entregado.push(new Billete(bi.valor, papeles));
                bi.restar(papeles);
                dinero = dinero - (bi.valor * papeles);
            }

        }

        /*resultado.innerHTML = "" limpia cualquier iteracion anterior
        solo mostrando cada nuevo retiro*/

        resultado.innerHTML = " ";
        for (var e of entregado) {
            if (e.cantidad > 0) {
                resultado.innerHTML += e.cantidad +
                    " billetes de $" + e.valor + "<br />";
                e.retirarEfectivo();
            }
        }

        
        retiroExitoso = true;
        transaccion += 1;

        if (retiroExitoso) {
            retiros.push(new Historial(retiro, transaccion));
            console.log(retiros);
        }

    } else {
        resultado.innerHTML = "No hay efectivo disponible a retirar";
    }

    console.log("2. Efectivo disponible: " + efectivoDisponible());
    console.log(entregado);
}

