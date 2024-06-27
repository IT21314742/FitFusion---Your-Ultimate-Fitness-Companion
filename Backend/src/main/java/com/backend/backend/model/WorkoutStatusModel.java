package com.backend.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class WorkoutStatusModel {
    @Id
    @GeneratedValue
    private Long id;
    private String run;
    private String pushups;
    private String lifted;
    private String description;
    private String date;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRun() {
        return run;
    }

    public void setRun(String run) {
        this.run = run;
    }

    public String getPushups() {
        return pushups;
    }

    public void setPushups(String pushups) {
        this.pushups = pushups;
    }

    public String getLifted() {
        return lifted;
    }

    public void setLifted(String lifted) {
        this.lifted = lifted;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
