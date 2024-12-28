document.addEventListener('DOMContentLoaded', () => {
    const placeId = "ChIJN1t_tDeuEmsRUsoyG83frY4"; // Reemplaza con el Place ID de la oficina del agente
    const reviewsContainer = document.getElementById("google-reviews");
  
    function fetchReviews() {
      const service = new google.maps.places.PlacesService(document.createElement('div'));
      
      service.getDetails({ placeId: placeId }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
          displayReviews(place.reviews);
        } else {
          reviewsContainer.innerHTML = "<p>No se pudieron cargar las reseñas.</p>";
        }
      });
    }
  
    function displayReviews(reviews) {
      reviewsContainer.innerHTML = reviews
        .slice(0, 3) // Mostrar solo las primeras 3 reseñas
        .map(review => `
          <blockquote>
            <p>"${review.text}"</p>
            <cite>- ${review.author_name}</cite>
          </blockquote>
        `)
        .join('');
    }
  
    fetchReviews();
  });
  