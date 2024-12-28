document.addEventListener('DOMContentLoaded', () => {
    const propertyId = new URLSearchParams(window.location.search).get('id');
    const propertyTitle = document.getElementById('property-title');
    const propertyImage = document.getElementById('property-image');
    const propertyPrice = document.getElementById('property-price');
    const propertyDescription = document.getElementById('property-description');
    const propertyLocation = document.getElementById('property-location');
  
    // Cargar datos desde propiedades.json
    fetch('data/propiedades.json')
      .then(response => response.json())
      .then(data => {
        const property = data.find(prop => prop.id === parseInt(propertyId));
        if (property) {
          // Rellenar la información de la propiedad
          propertyTitle.textContent = property.titulo;
          propertyImage.src = property.imagen;
          propertyPrice.textContent = `${property.precio.toLocaleString()} €`;
          propertyDescription.textContent = property.descripcion || 'Descripción no disponible.';
          propertyLocation.textContent = property.ubicacion;
  
          // Inicializar el mapa
          initMap(property.ubicacion);
        } else {
          document.body.innerHTML = '<p>Propiedad no encontrada.</p>';
        }
      })
      .catch(error => console.error('Error al cargar las propiedades:', error));
  });
  
  // Inicializar el mapa
  function initMap(location) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const map = new google.maps.Map(document.getElementById('map'), {
          center: results[0].geometry.location,
          zoom: 15,
        });
        new google.maps.Marker({
          position: results[0].geometry.location,
          map: map,
        });
      } else {
        document.getElementById('map').innerHTML = '<p>No se pudo cargar el mapa.</p>';
      }
    });
  }
  