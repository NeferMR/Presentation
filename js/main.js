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

const ProjectsApp = {
  projects: [],
  technologies: [],
  stacks: [],
  selectedTechnology: null,
  selectedStack: null,
  selectedProject: null,

  init() {
      this.fetchProjects();
      this.setupEventListeners();
  },

  async fetchProjects() {
      try {
          const response = await fetch('https://mongodbapi.glitch.me/api/items');
          this.projects = await response.json();
          this.prepareFilters();
          this.renderProjects();
      } catch (error) {
          console.error('Error fetching projects:', error);
      }
  },

  prepareFilters() {
      // Tecnologías
      const techs = [...new Set(this.projects.flatMap(p => p.Tecnologia))];
      const techSelect = document.getElementById('technologyFilter');
      techs.forEach(tech => {
          const option = document.createElement('option');
          option.value = tech;
          option.textContent = tech;
          techSelect.appendChild(option);
      });

      // Stacks
      const stacks = [...new Set(this.projects.flatMap(p => p.Stack))];
      const stackSelect = document.getElementById('stackFilter');
      stacks.forEach(stack => {
          const option = document.createElement('option');
          option.value = stack;
          option.textContent = stack;
          stackSelect.appendChild(option);
      });
  },

  renderProjects() {
      const container = document.getElementById('projectsContainer');
      container.innerHTML = '';

      const filtered = this.projects.filter(proj => {
          const techMatch = !this.selectedTechnology || 
                          proj.Tecnologia.includes(this.selectedTechnology);
          const stackMatch = !this.selectedStack || 
                           proj.Stack === this.selectedStack;
          return techMatch && stackMatch;
      });

      if (filtered.length === 0) {
          container.innerHTML = '<p>No se encontraron proyectos</p>';
          return;
      }

      filtered.forEach(project => {
          const card = document.createElement('div');
          card.className = 'project-card';
          card.innerHTML = `
              <img src="${project.Imagen}" alt="${project.Nombre}" class="project-image">
              <h3>${project.Nombre}</h3>
              <p>${project.Descripcion}</p>
              ${project.Tecnologia.map(tech => 
                  `<span class="tech-tag">${tech}</span>`
              ).join('')}
              <p class="project-view">Ver proyecto →</p>
          `;
          card.addEventListener('click', () => this.showModal(project));
          container.appendChild(card);
      });
  },

  showModal(project) {
      this.selectedProject = project;
      const modal = document.createElement('div');
      modal.className = 'modal-overlay-project';
      modal.innerHTML = `
          <div class="modal-content-project">
              <button class="modal-close">&times;</button>
              <h2>${project.Nombre}</h2>
              <p>${project.LongText}</p>
              <p><strong>Tecnologías:</strong> ${project.Tecnologia.join(', ')}</p>
              <p><strong>Stack:</strong> ${project.Stack}</p>
              ${project.Imagen ? 
                  `<img src="${project.Imagen}" alt="${project.Nombre}" class="project-image">` : ''}
              ${project.Link ? 
                  `<a href="${project.Link}" target="_blank" class="project-link">Ver más</a>` : 
                  '<p>No hay link disponible</p>'}
          </div>
      `;
      
      modal.querySelector('.modal-close').addEventListener('click', () => {
          document.body.removeChild(modal);
      });
      
      modal.addEventListener('click', (e) => {
          if (e.target === modal) {
              document.body.removeChild(modal);
          }
      });

      document.body.appendChild(modal);
  },

  setupEventListeners() {
      document.getElementById('technologyFilter').addEventListener('change', (e) => {
          this.selectedTechnology = e.target.value || null;
          this.renderProjects();
      });

      document.getElementById('stackFilter').addEventListener('change', (e) => {
          this.selectedStack = e.target.value || null;
          this.renderProjects();
      });
  }
};

// Inicializar la aplicación
ProjectsApp.init();