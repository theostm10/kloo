package com.licenta.licenta.service;

import com.licenta.licenta.data.dto.TeamMemberDto;
import com.licenta.licenta.data.entity.Team;
import com.licenta.licenta.data.entity.TeamMember;
import com.licenta.licenta.data.entity.User;
import com.licenta.licenta.exception.ResourceNotFoundException;
import com.licenta.licenta.repo.TeamMemberRepo;
import com.licenta.licenta.repo.TeamsRepo;
import com.licenta.licenta.repo.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TeamMemberService {

    @Autowired
    private TeamMemberRepo teamMemberRepo;

    @Autowired
    private TeamsRepo teamRepo;
    @Autowired
    private UsersRepo userRepo;

    public TeamMemberDto addTeamMember(TeamMemberDto teamMemberDto) {
        Team team = teamRepo.findById(teamMemberDto.getTeam())
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id " + teamMemberDto.getTeam()));

        User user = userRepo.findById(teamMemberDto.getUser())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + teamMemberDto.getUser()));

        TeamMember teamMember = new TeamMember();
        teamMember.setTeam(team);
        teamMember.setUser(user);
        teamMember.setRole(user.getRole());

        TeamMember savedTeamMember = teamMemberRepo.save(teamMember);
        return convertToDto(savedTeamMember);
    }

    public void removeTeamMember(UUID id) {
        TeamMember teamMember = teamMemberRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TeamMember not found with id " + id));
        teamMemberRepo.delete(teamMember);
    }

    public List<TeamMember> getTeamMembersByTeamId(UUID teamId) {
        return teamMemberRepo.findByTeamId(teamId);
    }

    public List<TeamMember> getTeamMembersByUserId(UUID userId) {
        return teamMemberRepo.findByUserId(userId);
    }

    private TeamMemberDto convertToDto(TeamMember teamMember) {
        TeamMemberDto dto = new TeamMemberDto();
        dto.setId(teamMember.getId());
        dto.setTeam(teamMember.getTeam().getId());
        dto.setUser(teamMember.getUser().getId());
        dto.setRole(teamMember.getRole().getCode().toString());
        return dto;
    }
}
