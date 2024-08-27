package com.licenta.licenta.rest;

import com.licenta.licenta.data.dto.SprintDto;
import com.licenta.licenta.service.SprintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/sprints")
@CrossOrigin(origins = "http://localhost:3000")
public class SprintApiRest {

    @Autowired
    private SprintService sprintService;
    
    @PostMapping
    public ResponseEntity<SprintDto> createSprint(@RequestBody SprintDto sprintDto) {
        // Log the received DTO to check values
        System.out.println("Received Sprint DTO: " + sprintDto);

        SprintDto createdSprint = sprintService.createSprint(sprintDto);
        return new ResponseEntity<>(createdSprint, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SprintDto> updateSprint(@PathVariable UUID id, @RequestBody SprintDto sprintDto) {
        SprintDto updatedSprint = sprintService.updateSprint(id, sprintDto);
        return ResponseEntity.ok(updatedSprint);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSprint(@PathVariable UUID id) {
        sprintService.deleteSprint(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SprintDto> getSprintById(@PathVariable UUID id) {
        SprintDto sprintDto = sprintService.getSprintById(id);
        return ResponseEntity.ok(sprintDto);
    }

    @GetMapping("/by-project/{projectId}")
    public ResponseEntity<List<SprintDto>> getSprintsByProjectId(@PathVariable UUID projectId) {
        List<SprintDto> sprints = sprintService.getSprintsByProjectId(projectId);
        return ResponseEntity.ok(sprints);
    }
}
