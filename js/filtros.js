document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('propiedades-grid');
    const form = document.getElementById('filters-form');
  
    // Cargar propiedades desde el JSON
    fetch('data/propiedades.json')
      .then(response => response.json())
      .then(data => {
        mostrarPropiedades(data);
  
        form.addEventListener('submit', event => {
          event.preventDefault();
          const filtros = obtenerFiltros();
          const propiedadesFiltradas = filtrarPropiedades(data, filtros);
          mostrarPropiedades(propiedadesFiltradas);
        });
      });
  
    function mostrarPropiedades(propiedades) {
      grid.innerHTML = propiedades
        .map(prop => `
          <div class="propiedad">
            <img src="${prop.imagen}" alt="${prop.titulo}">
            <h3>${prop.titulo}</h3>
            <p>${prop.precio.toLocaleString()} €</p>
            <a href="single-property.html?id=${prop.id}" class="btn">Ver más</a>
          </div>
        `)
        .join('');
    }
  
    function obtenerFiltros() {
      return {
        tipo: form.tipo.value,
        precioMin: parseFloat(form['precio-min'].value) || 0,
        precioMax: parseFloat(form['precio-max'].value) || Infinity
      };
    }
  
    function filtrarPropiedades(propiedades, filtros) {
      return propiedades.filter(prop =>
        (filtros.tipo === 'todos' || prop.tipo === filtros.tipo) &&
        prop.precio >= filtros.precioMin &&
        prop.precio <= filtros.precioMax
      );
    }
  });
  