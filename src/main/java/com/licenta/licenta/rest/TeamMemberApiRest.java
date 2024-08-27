package com.licenta.licenta.rest;

import com.licenta.licenta.data.dto.TeamMemberDto;
import com.licenta.licenta.data.entity.Team;
import com.licenta.licenta.data.entity.TeamMember;
import com.licenta.licenta.data.entity.User;
import com.licenta.licenta.service.TeamMemberService;
import com.licenta.licenta.service.TeamService;
import com.licenta.licenta.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/team-members")
@CrossOrigin(origins = "http://localhost:3000")
public class TeamMemberApiRest {

    @Autowired
    private TeamMemberService teamMemberService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<TeamMemberDto> addTeamMember(@RequestBody TeamMemberDto teamMemberDto) {
        TeamMemberDto createdTeamMember = teamMemberService.addTeamMember(teamMemberDto);
        return new ResponseEntity<>(createdTeamMember, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeTeamMember(@PathVariable UUID id) {
        teamMemberService.removeTeamMember(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-team/{teamId}")
    public ResponseEntity<List<TeamMember>> getTeamMembersByTeamId(@PathVariable UUID teamId) {
        List<TeamMember> teamMembers = teamMemberService.getTeamMembersByTeamId(teamId);
        return ResponseEntity.ok(teamMembers);
    }

    @GetMapping("/by-user/{userId}")
    public ResponseEntity<List<TeamMember>> getTeamMembersByUserId(@PathVariable UUID userId) {
        List<TeamMember> teamMembers = teamMemberService.getTeamMembersByUserId(userId);
        return ResponseEntity.ok(teamMembers);
    }
}

