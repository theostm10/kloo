package com.licenta.licenta.repo;

import com.licenta.licenta.data.entity.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TeamMemberRepo extends JpaRepository<TeamMember, UUID> {
    List<TeamMember> findByTeamId(UUID teamId);
    List<TeamMember> findByUserId(UUID userId);
    TeamMember findByTeamIdAndUserId(UUID teamId, UUID userId);
    void deleteByTeamId(UUID teamId);
}
