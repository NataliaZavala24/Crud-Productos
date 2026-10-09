export default class Producto {
 static items = [];
    constructor(codigo, nombre, precio, imagen){
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }

  static agregar(producto) {
    Producto.items.push(producto);
    Producto.guardarEnLocalStorage();
  }

  static eliminar(codigo) {
    Producto.items = Producto.items.filter(p => p.codigo !== codigo);
    Producto.guardarEnLocalStorage();
  }

  static guardarEnLocalStorage() {
    localStorage.setItem("productos", JSON.stringify(Producto.items));
  }

  static cargarDeLocalStorage() {
    const data = localStorage.getItem("productos");
    if (data) {
      Producto.items = JSON.parse(data);
    }
  }
}