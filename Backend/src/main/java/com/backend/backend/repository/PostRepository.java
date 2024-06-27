package com.backend.backend.repository;

import com.backend.backend.model.PostModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<PostModel,Long> {
}
