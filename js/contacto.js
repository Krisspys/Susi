// Lógica para manejar el formulario de contacto
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const formMessage = document.getElementById("formMessage");
  
    // Simulación de envío
    formMessage.textContent = "Enviando mensaje...";
    setTimeout(() => {
      formMessage.textContent = `Gracias, ${name}. Tu mensaje ha sido enviado con éxito.`;
      formMessage.style.color = "green";
  
      // Resetear formulario
      document.getElementById("contactForm").reset();
    }, 2000);
  });
  