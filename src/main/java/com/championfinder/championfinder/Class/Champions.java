package com.championfinder.championfinder.Class;


import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Champions")
public class Champions {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false)
        private String name;

        @Column(nullable = false)
        private String pictureUrl;

        @Column(nullable = false, length = 1000)
        private String description;

        @ElementCollection
        @CollectionTable(name = "champion_tags", joinColumns = @JoinColumn(name = "champion_id"))
        @Column(name = "tag")
        private List<String> tags;

        public Champions() {
        }

        public Champions(String name, String pictureUrl, String description, List<String> tags) {
            this.name = name;
            this.pictureUrl = pictureUrl;
            this.description = description;
            this.tags = tags;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getPictureUrl() {
            return pictureUrl;
        }

        public void setPictureUrl(String pictureUrl) {
            this.pictureUrl = pictureUrl;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public List<String> getTags() {
            return tags;
        }

        public void setTags(List<String> tags) {
            this.tags = tags;
        }

        @Override
        public String toString() {
            return "Champions{" +
                    "id=" + id +
                    ", name='" + name + '\'' +
                    ", pictureUrl='" + pictureUrl + '\'' +
                    ", description='" + description + '\'' +
                    ", tags=" + tags +
                    '}';
        }
}
