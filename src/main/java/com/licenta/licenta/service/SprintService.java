package com.licenta.licenta.service;

import com.licenta.licenta.data.dto.SprintDto;
import com.licenta.licenta.data.entity.Project;
import com.licenta.licenta.data.entity.Sprint;
import com.licenta.licenta.exception.ResourceNotFoundException;
import com.licenta.licenta.repo.ProjectRepo;
import com.licenta.licenta.repo.SprintRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SprintService {

    @Autowired
    private SprintRepo sprintRepo;

    @Autowired
    private ProjectRepo projectRepo;

    public SprintDto createSprint(SprintDto sprintDto) {
        if (sprintDto.getProject() == null) {
            throw new IllegalArgumentException("Project ID must not be null");
        }

        // Fetch the project entity using the projectId
        Project project = projectRepo.findById(sprintDto.getProject())
                .orElseThrow(() -> new IllegalArgumentException("Invalid project ID"));

        // Set the project entity in the sprint
        Sprint sprint = new Sprint();
        sprint.setName(sprintDto.getName());
        sprint.setStart_date(sprintDto.getStart_date());
        sprint.setEnd_date(sprintDto.getEnd_date());
        sprint.setProject(project);

        Sprint savedSprint = sprintRepo.save(sprint);
        return convertToDto(savedSprint);
    }

    public SprintDto updateSprint(UUID id, SprintDto sprintDto) {
        Sprint sprint = sprintRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sprint not found with id " + id));

        Project project = projectRepo.findById(sprintDto.getProject())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id " + sprintDto.getProject()));

        sprint.setName(sprintDto.getName());
        sprint.setStart_date(sprintDto.getStart_date());
        sprint.setEnd_date(sprintDto.getEnd_date());
        sprint.setProject(project);

        Sprint updatedSprint = sprintRepo.save(sprint);
        return convertToDto(updatedSprint);
    }

    public void deleteSprint(UUID id) {
        Sprint sprint = sprintRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sprint not found with id " + id));
        sprintRepo.delete(sprint);
    }

    public SprintDto getSprintById(UUID id) {
        Sprint sprint = sprintRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sprint not found with id " + id));
        return convertToDto(sprint);
    }

    public List<SprintDto> getSprintsByProjectId(UUID projectId) {
        List<Sprint> sprints = sprintRepo.findByProjectId(projectId);
        return sprints.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private SprintDto convertToDto(Sprint sprint) {
        return new SprintDto(
                sprint.getId(),
                sprint.getName(),
                sprint.getStart_date(),
                sprint.getEnd_date(),
                sprint.getProject().getId()
        );
    }

    private Sprint convertToEntity(SprintDto sprintDto) {
        Project project = projectRepo.findById(sprintDto.getProject())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id " + sprintDto.getProject()));

        Sprint sprint = new Sprint();
        sprint.setName(sprintDto.getName());
        sprint.setStart_date(sprintDto.getStart_date());
        sprint.setEnd_date(sprintDto.getEnd_date());
        sprint.setProject(project);

        return sprint;
    }
}
