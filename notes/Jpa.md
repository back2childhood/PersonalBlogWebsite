## What is JPA
Java Persistence API, much easier than Mybatis
for different database, the apis are a little bit different

## set up 
#### dependencies
```xml
<!-- jpa -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- spring-boot-starter-jdbc -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>

<!-- https://mvnrepository.com/artifact/com.mysql/mysql-connector-j -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <version>9.2.0</version>
</dependency>
```
#### configuration
```properies
# DataSourceProperties
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/${env.DB_DATABASE}?serverTimezone=America/Denver&useUnicode=true&characterEncoding=utf8&useSSL=true
spring.datasource.username=${env.DB_USER}
spring.datasource.password=${env.DB_PASSWORD}
spring.datasource.type=com.zaxxer.hikari.HikariDataSource
spring.datasource.hikari.maximum-pool-size=15
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.idle-timeout=30000

# jpa configuration
spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
spring.jpa.open-in-view=false
#spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.show_sql=true
spring.jpa.properties.hibernate.format_sql=true
```
## table design
```sql
CREATE TABLE tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);
articles Table:
```
```sql
CREATE TABLE articles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL
    .
    .
    .
);
article_tag Join Table:
```
```sql
CREATE TABLE article_tag (
    articleId INT,
    tagId INT,
    PRIMARY KEY (articleId, tagId),
    FOREIGN KEY (articleId) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (tagId) REFERENCES tags(id) ON DELETE CASCADE
);
```
## entity
an article can belong to many tags and a tag can have many articles.
```java
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "article", schema = "my_blog")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "create_time", nullable = false)
    private Instant createTime;

    @Column(name = "cover", length = 200)
    @ColumnDefault("0")
    private String cover;

    @ColumnDefault("1")
    @Column(name = "draft")
    private Integer draft;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "comment_count")
    private Integer commentCount;

    // @ManyToMany(fetch = FetchType.EAGER)
    @ManyToMany
    @JoinTable(
            name = "articles_tags",
            joinColumns = @JoinColumn(name = "article_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();
}
```
```java
@Data
@Entity
@Table(name = "tag", schema = "my_blog")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tag {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @ManyToMany(mappedBy = "tags")
    private Set<Article> articles = new HashSet<>();
}
```
## repository
```java
package com.personalblog.backend.dao;

import com.personalblog.backend.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {

    @Query("SELECT a FROM Article a JOIN FETCH a.tags WHERE a.id = :id")
    Optional<Article> findById(@Param("id") Integer id);

    // Find all articles for a channel
    @Query("SELECT a FROM Article a JOIN FETCH a.tags c WHERE c.id = :tagId ORDER BY a.createTime DESC")
    List<Article> findArticlesByTagId(@Param("tagId") Integer tagId);

    @Query("SELECT a FROM Article a JOIN FETCH a.tags ORDER BY a.createTime DESC")
    Page<Article> findAll(Pageable pageable);
}
```
By default, Hibernate uses lazy loading for collections (e.g., @OneToMany, @ManyToMany) to improve performance. 
The collection is only loaded when it is accessed for the first time, and this must happen within an active Hibernate session.
If the session is closed before the collection is accessed, you get a LazyInitializationException.
Here are several ways to fix this issue:
* Use Eager Fetching
* Use a @Query with Join Fetch (i chose this)