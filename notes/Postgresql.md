# Postgresql
Since Postgresql has many fansy features that MySQL doesn't have, and more popular in the world, so I changed MySQL to Postgresql. Here are some specific features of Postgresql.
#### JSON Querying (MySQL can’t do this)
PostgreSQL supports native JSONB storage & queries:
```sql
SELECT data->'title' FROM posts WHERE data->>'author' = 'John Doe';
```
#### HECK Constraints for Data Validation
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    age INT CHECK (age >= 18) -- Prevents invalid data!
);
```
PostgreSQL prevents inserting invalid data, while MySQL often ignores constraints.
#### EXCLUDE Constraints (Unique in PostgreSQL)
```sql
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    room_id INT,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    EXCLUDE USING gist (room_id WITH =, tstzrange(start_time, end_time) WITH &&)
);
```
Prevents overlapping bookings—MySQL can’t do this easily!
## full-text search
The feature of Postgresql I am most interested in is `full-text search`. I am going to introduce how to use it and discuss pros and cons compare with ES.
#### Create a Full-text Search Index
First, add a column to the Article table:
```sql
ALTER TABLE article ADD COLUMN search_vector tsvector
GENERATED ALWAYS AS (
    to_tsvector('english'::regconfig, (COALESCE(title, ''::character varying))::text) || to_tsvector('english'::regconfig, COALESCE(content, ''::text)))
STORED;
```
Then create an index:
```sql
CREATE INDEX idx_article_search ON article USING GIN(search_vector);
```
#### Custom SQL statement
```java
@Query(value = """
    SELECT * FROM article 
    WHERE search_vector @@ websearch_to_tsquery('english', :keyword)
    """,
        nativeQuery = true)
Page<Article> searchArticles(@Param("keyword") String keyword, Pageable pageable);

@Query(value = "SELECT * FROM article WHERE metadata->>'user_id' = :author", nativeQuery = true)
List<Article> findByAuthor(@Param("author") String author);
```
## A Question During My Test
#### Description
While I tested this function, I realized I could get proper result with keyword "mysql/java/spring" but couldn't with "of/is/the". Then I checked the search_vector, it has most of words but some not, include "of/is/as/the".

#### Reason
PostgreSQL's full-text search automatically:
- Removes "stop words": Common short words (articles, prepositions, conjunctions) that don't add search value (`the`, `of`, `is`, etc.)
- Stems words: Reduces words to their root form (`running` → `run`, `better` → `good`)

This is controlled by text search configuration (such as `'english'` in this case).
The default behavior:
- **Improves search quality**: Stop words add noise, not signal
- **Reduces index size**: By ~30-50%
- **Speeds up queries**: Fewer terms to compare
## Pros and Cons
#### Pros

* Searching articles, blog posts, comments (like your project)

* Simple keyword-based searches

* Lower-cost alternatives to Elasticsearch (since AWS OpenSearch is expensive)

#### Cons

* Scalability for massive datasets

* Fuzzy matching & typo tolerance

* Advanced analytics & aggregations (e.g., machine learning-based recommendations)

