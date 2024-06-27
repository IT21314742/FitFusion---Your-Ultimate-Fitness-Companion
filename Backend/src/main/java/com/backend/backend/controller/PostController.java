package com.backend.backend.controller;

import com.backend.backend.exception.PostNotFoundException;
import com.backend.backend.model.PostModel;
import com.backend.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PostController implements WebMvcConfigurer {

    @Autowired
    private PostRepository postRepository;
    @Configuration
    public class WebConfig implements WebMvcConfigurer {
        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
            registry.addResourceHandler("/uploads/**")
//                    .addResourceLocations("/uploads");
                    .addResourceLocations("file:backend/src/main/resources/uploads/");
        }
    }
    @PostMapping("/post")
    public ResponseEntity<String> createPost(@RequestParam("description") String description,
                                             @RequestParam("gmail") String gmail,
                                             @RequestParam("name") String name,
                                             @RequestParam("title") String title,
                                             @RequestParam("photos") List<MultipartFile> photos,
                                             @RequestParam("video") MultipartFile video) {
        try {
            // Save photo and video files
            List<String> photoFileNames = new ArrayList<>();
            String videoFileName = null;

            for (MultipartFile photo : photos) {
                String photoFileName = saveFile(photo);
                photoFileNames.add(photoFileName);
            }

            if (video != null && !video.isEmpty()) {
                videoFileName = saveFile(video);
            }

            // Create PostModel instance
            PostModel postModel = new PostModel();
            postModel.setDescription(description);
            postModel.setGmail(gmail);
            postModel.setName(name);
            postModel.setTitle(title);
            postModel.setPhotos(photoFileNames);
            postModel.setVideo(videoFileName);

            // Save PostModel to repository
            postRepository.save(postModel);

            return ResponseEntity.status(HttpStatus.CREATED).body("Post created successfully");
        } catch (IOException e) {
            // Log the exception
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating post: " + e.getMessage());
        } catch (Exception e) {
            // Catch any other unexpected exceptions
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error creating post");
        }
    }

    private String saveFile(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
        String directoryPath = "backend/src/main/resources/uploads/";
        Path directory = Paths.get(directoryPath);
        if (!Files.exists(directory)) {
            Files.createDirectories(directory);
        }

        String filePath = directoryPath + fileName;
        Path path = Paths.get(filePath);
        Files.write(path, file.getBytes());
        return fileName;
    }

    @GetMapping("/post")
    public List<PostModel> getAllPosts() {
        return postRepository.findAll();
    }

    @GetMapping("/post/{id}")
    public ResponseEntity<PostModel> getPostById(@PathVariable Long id) {
        PostModel postModel = postRepository.findById(id).orElse(null);
        if (postModel != null) {
            return ResponseEntity.ok(postModel);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

//    @PutMapping("/post/{id}")
//    public ResponseEntity<String> updatePost(@PathVariable Long id, @RequestBody PostModel updatedPost) {
//        if (postRepository.existsById(id)) {
//            updatedPost.setId(id);
//            postRepository.save(updatedPost);
//            return ResponseEntity.ok("Post updated successfully");
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @PutMapping("/post/{id}")
    public ResponseEntity<String> updatePost(@PathVariable Long id,
                                             @RequestParam(value = "description", required = false) String description,
                                             @RequestParam(value = "gmail", required = false) String gmail,
                                             @RequestParam(value = "name", required = false) String name,
                                             @RequestParam(value = "title", required = false) String title,
                                             @RequestParam(value = "photos", required = false) List<MultipartFile> photos,
                                             @RequestParam(value = "video", required = false) MultipartFile video) {
        try {
            // Retrieve the existing post
            PostModel existingPost = postRepository.findById(id)
                    .orElseThrow(() -> new PostNotFoundException("Post not found with id: " + id));

            // Update fields if provided in the request
            if (description != null) {
                existingPost.setDescription(description);
            }
            if (gmail != null) {
                existingPost.setGmail(gmail);
            }
            if (name != null) {
                existingPost.setName(name);
            }
            if (title != null) {
                existingPost.setTitle(title);
            }
            // Update photos if provided
            if (photos != null && !photos.isEmpty()) {
                List<String> photoFileNames = new ArrayList<>();
                for (MultipartFile photo : photos) {
                    String photoFileName = saveFile(photo);
                    photoFileNames.add(photoFileName);
                }
                existingPost.setPhotos(photoFileNames);
            }
            // Update video if provided
            if (video != null && !video.isEmpty()) {
                String videoFileName = saveFile(video);
                existingPost.setVideo(videoFileName);
            }

            // Save the updated post
            postRepository.save(existingPost);

            return ResponseEntity.ok("Post updated successfully");
        } catch (IOException e) {
            // Log the exception
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating post: " + e.getMessage());
        } catch (PostNotFoundException e) {
            // Log the exception
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            // Catch any other unexpected exceptions
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error updating post");
        }
    }


    @DeleteMapping("/post/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        if (postRepository.existsById(id)) {
            postRepository.deleteById(id);
            return ResponseEntity.ok("Post deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

