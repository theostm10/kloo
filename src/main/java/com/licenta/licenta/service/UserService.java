package com.licenta.licenta.service;

import com.licenta.licenta.data.dto.RegisterUserDto;
import com.licenta.licenta.data.dto.UserDto;
import com.licenta.licenta.data.entity.Team;
import com.licenta.licenta.data.entity.User;
import com.licenta.licenta.data.enums.RoleEnum;
import com.licenta.licenta.exception.ResourceNotFoundException;
import com.licenta.licenta.exception.RestApiException;
import com.licenta.licenta.exception.UserNotFoundException;
import com.licenta.licenta.repo.RolesRepo;
import com.licenta.licenta.repo.TokensRepo;
import com.licenta.licenta.repo.UsersRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UsersRepo usersRepo;
    private final PasswordEncoder passwordEncoder;
    private final TokensRepo tokensRepo;
    private final RolesRepo rolesRepo;

    public UserService(UsersRepo usersRepo, PasswordEncoder passwordEncoder, TokensRepo tokensRepo, RolesRepo rolesRepo) {
        this.usersRepo = usersRepo;
        this.passwordEncoder = passwordEncoder;
        this.tokensRepo = tokensRepo;
        this.rolesRepo = rolesRepo;
    }

    public Optional<User> getUserByEmail(String email) {
        return usersRepo.findByEmail(email);
    }

    public User getUserById(UUID user) {
        return usersRepo.getUserById(user);
    }

    public List<UserDto> getAllUsers() {
        List<User> users = usersRepo.findAll();

        return users.stream()
                .map(user -> new UserDto(
                        user.getId(),
                        user.getEmail(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getRole().getCode().name()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteUser(UUID id) {
        if (!usersRepo.existsById(id)) {
            throw new UserNotFoundException("User with id " + id + " does not exist");
        }

        tokensRepo.deleteByUserId(id);

        usersRepo.deleteById(id);
    }

    public User createUser(final RegisterUserDto dto) {
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setRole(rolesRepo.findByCode(RoleEnum.valueOf(dto.getRole())).orElseThrow(() -> new RestApiException("Unable to identify role!")));
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        usersRepo.save(user);
        return user;
    }

    public UserDto updateUser(UUID id, UserDto userDto) {
        User user = usersRepo.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with id " + id + " not found"));

        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setRole(rolesRepo.findByCode(RoleEnum.valueOf(userDto.getRole()))
                .orElseThrow(() -> new RestApiException("Unable to identify role!")));

        usersRepo.save(user);

        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole().getCode().name()
        );
    }

}

