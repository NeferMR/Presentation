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
