package com.licenta.licenta.service;

import com.licenta.licenta.data.dto.UserProjectDto;
import com.licenta.licenta.data.entity.Project;
import com.licenta.licenta.data.entity.User;
import com.licenta.licenta.data.entity.UserProject;
import com.licenta.licenta.exception.ResourceNotFoundException;
import com.licenta.licenta.repo.ProjectRepo;
import com.licenta.licenta.repo.UserProjectRepo;
import com.licenta.licenta.repo.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserProjectService {
    @Autowired
    private UserProjectRepo userProjectRepo;

    @Autowired
    private UsersRepo usersRepo;
    @Autowired
    private ProjectRepo projectRepo;

    public UserProjectDto assignUserToProject(UserProjectDto userProjectDto) {
        Project project = projectRepo.findById(userProjectDto.getProject())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id " + userProjectDto.getProject()));

        User user = usersRepo.findById(userProjectDto.getUser())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userProjectDto.getUser()));

        boolean exists = userProjectRepo.existsByUserIdAndProjectId(userProjectDto.getUser(), userProjectDto.getProject());
        if (exists) {
            throw new IllegalArgumentException("User is already assigned to this project.");
        }

        UserProject userProject = new UserProject();
        userProject.setProject(project);
        userProject.setUser(user);

        UserProject savedUserProject = userProjectRepo.save(userProject);

        return convertToDto(savedUserProject);
    }

    public void removeUserFromProject(UUID id) {
        userProjectRepo.deleteById(id);
    }

    public List<UserProjectDto> findAllUserProjects() {
        return userProjectRepo.findAllUserProjects();
    }

    public UserProjectDto findById(UUID id) {
        return userProjectRepo.findUserProjectById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TeamProject not found with id " + id));
    }

    public List<UserProject> getUsersByProjectId(UUID projectId) {
        return userProjectRepo.findByProjectId(projectId);
    }

    private UserProjectDto convertToDto(UserProject userProject) {
        UserProjectDto dto = new UserProjectDto();
        dto.setId(userProject.getId());
        dto.setUser(userProject.getUser().getId());
        dto.setProject(userProject.getProject().getId());
        return dto;
    }
}

