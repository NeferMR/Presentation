document.addEventListener('DOMContentLoaded', function() {
  const skills = document.querySelectorAll('.skill-circle');
  
  skills.forEach(skill => {
    const percentage = skill.querySelector('.skill-percentage').textContent;
    const numericPercentage = parseInt(percentage);
    
    // Establecer el porcentaje inicial en 0
    skill.style.setProperty('--percentage', '0%');
    
    // Animar hasta el porcentaje final
    setTimeout(() => {
      skill.style.setProperty('--percentage', `${numericPercentage}%`);
    }, 100);
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const saberMasBtn = document.getElementById('saberMasBtn');
    console.log(saberMasBtn);
    
    const modal = document.getElementById('techModal');
    const closeModal = document.querySelector('.close-modal');

    saberMasBtn.addEventListener('click', () => {
        console.log("Hola");
        modal.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});