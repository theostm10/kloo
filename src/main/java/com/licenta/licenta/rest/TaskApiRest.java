package com.licenta.licenta.rest;

import com.licenta.licenta.data.dto.TaskDto;
import com.licenta.licenta.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskApiRest {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto taskDto) {
        TaskDto createdTask = taskService.createTask(taskDto);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable UUID id, @RequestBody TaskDto taskDto) {
        TaskDto updatedTask = taskService.updateTask(id, taskDto);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable UUID id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable UUID id) {
        TaskDto taskDto = taskService.getTaskById(id);
        return ResponseEntity.ok(taskDto);
    }

    @GetMapping("/by-project/{projectId}")
    public ResponseEntity<List<TaskDto>> getTasksByProjectId(@PathVariable UUID projectId) {
        List<TaskDto> tasks = taskService.getTasksByProjectId(projectId);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/by-sprint/{sprintId}")
    public ResponseEntity<List<TaskDto>> getTasksBySprintId(@PathVariable UUID sprintId) {
        List<TaskDto> tasks = taskService.getTasksBySprintId(sprintId);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/by-user/{userId}")
    public ResponseEntity<List<TaskDto>> getTasksByAssignedToId(@PathVariable UUID userId) {
        List<TaskDto> tasks = taskService.getTasksByAssignedToId(userId);
        return ResponseEntity.ok(tasks);
    }
}
