package com.licenta.licenta.rest;

import com.licenta.licenta.data.dto.UserProjectDto;
import com.licenta.licenta.data.entity.UserProject;
import com.licenta.licenta.service.UserProjectService;
import com.licenta.licenta.service.TeamService;
import com.licenta.licenta.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/user-projects")
@CrossOrigin(origins = "http://localhost:3000")
public class UserProjectApiRest {

    @Autowired
    private UserProjectService userProjectService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private ProjectService projectService;

    @PostMapping
    public ResponseEntity<UserProjectDto> assignUserToProject(@RequestBody UserProjectDto userProjectDto) {
        UserProjectDto createdTeamProject = userProjectService.assignUserToProject(userProjectDto);
        return new ResponseEntity<>(createdTeamProject, HttpStatus.CREATED);
    }

    @DeleteMapping("/{userProjectId}")
    public ResponseEntity<?> removeUserFromProject(@PathVariable UUID userProjectId) {
        userProjectService.removeUserFromProject(userProjectId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<UserProjectDto>> getAllUserProjects() {
        List<UserProjectDto> teamProjectsDto = userProjectService.findAllUserProjects();
        return ResponseEntity.ok(teamProjectsDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProjectDto> getUserProjectById(@PathVariable UUID id) {
        UserProjectDto userProjectDto = userProjectService.findById(id);
        return ResponseEntity.ok(userProjectDto);
    }

    @GetMapping("/by-project/{projectId}")
    public ResponseEntity<List<UserProject>> getUsersByProjectId(@PathVariable UUID projectId) {
        List<UserProject> users = userProjectService.getUsersByProjectId(projectId);
        return ResponseEntity.ok(users);
    }
}
