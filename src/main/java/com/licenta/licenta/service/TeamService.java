package com.licenta.licenta.service;

import com.licenta.licenta.data.dto.TeamDto;
import com.licenta.licenta.data.entity.Team;
import com.licenta.licenta.data.entity.User;
import com.licenta.licenta.exception.DuplicateTeamException;
import com.licenta.licenta.exception.ResourceNotFoundException;
import com.licenta.licenta.repo.TeamsRepo;
import com.licenta.licenta.repo.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class TeamService {

    @Autowired
    private TeamsRepo teamsRepo;

    @Autowired
    private UsersRepo usersRepo;

    public TeamDto createTeam(TeamDto teamDto) {
        String username = getAuthenticatedUsername();
        Team team = new Team();
        team.setUser(usersRepo.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + teamDto.getUserId())));

        if (teamsRepo.findByName(teamDto.getName()).isPresent()) {
            throw new DuplicateTeamException("Team with name " + teamDto.getName() + " already exists.");
        }
        team.setName(teamDto.getName());
        Team savedTeam = teamsRepo.save(team);
        return convertToDto(savedTeam);
    }

    public TeamDto updateTeam(UUID id, TeamDto teamDto) {
        Team team = teamsRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id " + id));

        team.setName(teamDto.getName());
        team.setUser(usersRepo.findById(teamDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + teamDto.getUserId())));

        Team updatedTeam = teamsRepo.save(team);
        return convertToDto(updatedTeam);
    }

    public void deleteTeam(UUID id) {
        Team team = teamsRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id " + id));
        teamsRepo.delete(team);
    }

    public Team getTeamById(UUID id) {
        Team team = teamsRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id " + id));
        return team;
    }

    public List<TeamDto> getAllTeams() {
        List<Team> teams = teamsRepo.findAll();
        return teams.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private TeamDto convertToDto(Team team) {
        TeamDto teamDTO = new TeamDto();
        teamDTO.setId(team.getId());
        teamDTO.setName(team.getName());
        teamDTO.setUserId(team.getUser().getId());
        return teamDTO;
    }

    private Team convertToEntity(TeamDto teamDTO) {
        Team team = new Team();
        team.setName(teamDTO.getName());

        User createdBy = usersRepo.findById(teamDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + teamDTO.getUserId()));
        team.setUser(createdBy);

        return team;
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
