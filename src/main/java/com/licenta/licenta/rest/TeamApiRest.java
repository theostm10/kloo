package com.licenta.licenta.rest;

import com.licenta.licenta.data.dto.TeamDto;
import com.licenta.licenta.data.entity.Team;
import com.licenta.licenta.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/teams")
@CrossOrigin(origins = "http://localhost:3000")
public class TeamApiRest {

    @Autowired
    private TeamService teamsService;

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_TEAMMANAGER')")
    @PostMapping
    public ResponseEntity<?> createTeam(@RequestBody TeamDto teamDTO) {
        try {
            TeamDto createdTeam = teamsService.createTeam(teamDTO);
            return new ResponseEntity<>(createdTeam, HttpStatus.CREATED);
        } catch (ResponseStatusException ex) {
            // Catch ResponseStatusException and return custom error response
            return new ResponseEntity<>(ex.getReason(), ex.getStatusCode());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<TeamDto> updateTeam(@PathVariable UUID id, @RequestBody TeamDto teamDTO) {
        TeamDto updatedTeam = teamsService.updateTeam(id, teamDTO);
        return ResponseEntity.ok(updatedTeam);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable UUID id) {
        teamsService.deleteTeam(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable UUID id) {
        Team team = teamsService.getTeamById(id);
        return ResponseEntity.ok(team);
    }

    @GetMapping
    public ResponseEntity<List<TeamDto>> getAllTeams() {
        List<TeamDto> teams = teamsService.getAllTeams();
        return ResponseEntity.ok(teams);
    }
}
