import Producto from "./classes/Producto.js";

const form = document.getElementById("formProducto");
const tabla = document.getElementById("tablaProductos");

Producto.cargarDeLocalStorage();
renderTabla();

form.addEventListener("submit", e => {
  e.preventDefault();

  const codigo = document.getElementById("codigo").value;
  const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const imagen = document.getElementById("imagen").value;

  const nuevoProducto = new Producto(codigo, nombre, precio, imagen);
  Producto.agregar(nuevoProducto);

  renderTabla();
  form.reset();
});

function renderTabla() {
  tabla.innerHTML = "";
  Producto.items.forEach(p => {
    const fila = document.createElement("tr");
    fila.className = "hover:bg-gray-700 transition";

    fila.innerHTML = `
      <td class="p-2">${p.codigo}</td>
      <td class="p-2">${p.nombre}</td>
      <td class="p-2">$${p.precio}</td>
      <td class="p-2"><img src="${p.imagen}" alt="${p.nombre}" class="w-12 h-12 object-cover rounded"></td>
      <td class="p-2">
        <button class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition" data-codigo="${p.codigo}">Eliminar</button>
      </td>
    `;

    fila.querySelector("button").addEventListener("click", () => {
     const seguro = confirm(`¿Deseas eliminar el producto "${p.nombre}"?`);
     if (seguro) {
      Producto.eliminar(p.codigo);
      renderTabla();
     }
     });

    tabla.appendChild(fila);
  });
}
