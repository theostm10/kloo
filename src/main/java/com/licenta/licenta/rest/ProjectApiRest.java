package com.licenta.licenta.rest;

import com.licenta.licenta.data.dto.ProjectDto;
import com.licenta.licenta.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/projects")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectApiRest{

    @Autowired
    private ProjectService projectService;

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_PROJECTMANAGER')")
    @PostMapping
    public ResponseEntity<ProjectDto> createProject(@RequestBody ProjectDto projectDTO) {
        ProjectDto createdProject = projectService.createProject(projectDTO);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDto> updateProject(@PathVariable UUID id, @RequestBody ProjectDto projectDTO) {
        ProjectDto updatedProject = projectService.updateProject(id, projectDTO);
        return ResponseEntity.ok(updatedProject);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable UUID id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable UUID id) {
        ProjectDto projectDTO = projectService.getProjectById(id);
        return ResponseEntity.ok(projectDTO);
    }

    @GetMapping
    public ResponseEntity<List<ProjectDto>> getAllProjects() {
        List<ProjectDto> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ProjectDto>> getProjectsByUser(@PathVariable UUID userId) {
        List<ProjectDto> projects = projectService.getProjectsByUser(userId);
        return ResponseEntity.ok(projects);
    }
}

