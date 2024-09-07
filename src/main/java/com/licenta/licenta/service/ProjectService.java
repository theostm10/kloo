package com.licenta.licenta.service;

import com.licenta.licenta.data.dto.ProjectDto;
import com.licenta.licenta.data.entity.Project;
import com.licenta.licenta.data.entity.User;
import com.licenta.licenta.exception.ResourceNotFoundException;
import com.licenta.licenta.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    private SprintRepo sprintRepo;

    @Autowired
    private UserProjectRepo userProjectRepo;

    public ProjectDto createProject(ProjectDto projectDTO) {
        String username = getAuthenticatedUsername();
        Project project = new Project();
        project.setName(projectDTO.getName());
        project.setDescription(projectDTO.getDescription());
        project.setUser(usersRepo.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + projectDTO.getUserId())));

        Project savedProject = projectRepo.save(project);
        return convertToDto(savedProject);
    }

    public ProjectDto updateProject(UUID id, ProjectDto projectDTO) {
        Project project = projectRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id " + id));

        project.setName(projectDTO.getName());
        project.setDescription(projectDTO.getDescription());
        project.setUser(usersRepo.findById(projectDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + projectDTO.getUserId())));

        Project updatedProject = projectRepo.save(project);
        return convertToDto(updatedProject);
    }

    @Transactional
    public void deleteProject(UUID id) {
        Project project = projectRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id " + id));
        // Delete all related tasks
        taskRepo.deleteByProjectId(id);

        // Delete all related sprints
        sprintRepo.deleteByProjectId(id);

        // Delete all related user-project assignments
        userProjectRepo.deleteByProjectId(id);

        // Finally, delete the project
        projectRepo.delete(project);
    }

    public ProjectDto getProjectById(UUID id) {
        Project project = projectRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with name " + id));
        return convertToDto(project);
    }

    public List<ProjectDto> getAllProjects() {
        List<Project> projects = projectRepo.findAll();
        return projects.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<ProjectDto> getProjectsByUser(UUID userId) {
        User user = usersRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));
        List<Project> projects = projectRepo.findByUser(user);
        return projects.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private ProjectDto convertToDto(Project project) {
        ProjectDto projectDTO = new ProjectDto();
        projectDTO.setId(project.getId());
        projectDTO.setName(project.getName());
        projectDTO.setDescription(project.getDescription());
        projectDTO.setUserId(project.getUser().getId());
        return projectDTO;
    }

    private String getAuthenticatedUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }

}

