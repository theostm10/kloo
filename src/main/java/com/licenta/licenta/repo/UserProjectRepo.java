package com.licenta.licenta.repo;

import com.licenta.licenta.data.dto.UserProjectDto;
import com.licenta.licenta.data.entity.UserProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserProjectRepo extends JpaRepository<UserProject, UUID> {
    // methods
    @Query("select new com.licenta.licenta.data.dto.UserProjectDto(tp.id, tp.user.id, tp.project.id) from UserProject tp")
    List<UserProjectDto> findAllUserProjects();

    @Query("select new com.licenta.licenta.data.dto.UserProjectDto(tp.id, tp.user.id, tp.project.id) from UserProject tp where tp.id = :id")
    Optional<UserProjectDto> findUserProjectById(@Param("id") UUID id);

    List<UserProject> findByProjectId( UUID projectId);

    boolean existsByUserIdAndProjectId(UUID userId, UUID projectId);
}
